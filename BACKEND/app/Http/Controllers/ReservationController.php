<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Offer;
use Carbon\Carbon;
use App\Models\Room;
use App\Models\Table;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ReservationController extends Controller
{
    public function storeCarReservation(Request $request)
    {
        $id = $request->id;
        $pickuptime = Carbon::parse($request->pickuptime);
        $dropofftime = Carbon::parse($request->dropofftime);
    
        // Check if there are any overlapping reservations
        $overlappingReservations = Reservation::where('car_id', $id)
            ->where(function ($query) use ($pickuptime, $dropofftime) {
                $query->where(function ($q) use ($pickuptime, $dropofftime) {
                    $q->whereBetween('start_date', [$pickuptime, $dropofftime])
                        ->orWhereBetween('end_date', [$pickuptime, $dropofftime]);
                })->orWhere(function ($q) use ($pickuptime, $dropofftime) {
                    $q->where('start_date', '<=', $pickuptime)
                        ->where('end_date', '>=', $dropofftime);
                });
            })
            ->exists();
    
        if ($overlappingReservations) {
            return response()->json(['message' => 'La voiture est déjà réservée pour ces dates'], Response::HTTP_CONFLICT);
        }
    
        // Check if there are any reservations that don't allow service after the finish date
        $futureReservations = Reservation::where('car_id', $id)
            ->where('end_date', '>', $dropofftime)
            ->exists();
    
        if ($futureReservations) {
            return response()->json(['message' => 'La voiture est déjà réservée pour ces dates'], Response::HTTP_CONFLICT);
        }
    
        // If no conflicts, proceed with storing the reservation
        $reservationId = Reservation::insertGetId([
            'start_date' => $pickuptime,
            'end_date' => $dropofftime,
            'car_id' => $id,
            'client_id' =>$request->id_client, //auth()->id()
            'offer_id' => $request->offer_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    
        $reservation = Reservation::find($reservationId);
    
        return response()->json(['message' => 'Réservation ajoutée', 'reservation' => $reservation]);
    }
    

    public function storeTableReservation(Request $request)
    {
        $tables = Table::where('restaurant_id', $request->id)->where('type',$request->type)->get();
        foreach ($tables as $table) {
            $reservation = Reservation::where('table_id', $table->id)->where('reservation_date_restaurant', $request->date)->exists();
            if (!$reservation) {
                Reservation::insert([
                    'table_id' => $table->id,
                    'reservation_date_restaurant' => $request->date,
                    'client_id' =>$request->id_client,
                    'offer_id'=> $request->offre_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                return response()->json(['message' => 'Réservation ajoutée']);
            }
        }
        
        return response()->json(['message' => 'Pas de table disponible']);
    }
    

    public function storeRoomReservation(Request $request)
    {
        $start_date = Carbon::parse($request->start_date);
        $end_date = Carbon::parse($request->end_date);
        $rooms = Room::where('hotel_id', $request->hotel_id)->where('roomtype_id', $request->roomtype_id)->get();
        foreach ($rooms as $room) {
            $reservation = Reservation::where('room_id', $room->id)
            ->where(function ($query) use ($start_date, $end_date) {
                $query->where(function ($q) use ($start_date) {
                    $q->where('start_date', '<=', $start_date)
                        ->where('end_date', '>=', $start_date);
                })->orWhere(function ($q) use ($end_date) {
                    $q->where('start_date', '<=', $end_date)
                        ->where('end_date', '>=', $end_date);
                });
            })
            ->exists();
            $futureReservations = Room::where('hotel_id', $request->hotel_id)->where('roomtype_id', $request->roomtype_id)
            ->where('end_date', '>', $end_date)
            ->exists();
    
            if ($futureReservations) {
                return response()->json(['message' => 'Room est déjà réservée pour ces dates'], Response::HTTP_CONFLICT);
            }

            if (!$reservation) {
                Reservation::insert([
                    'room_id' => $room->id,
                    'offer_id' => $request->offer_id,
                    'start_date' => $start_date,
                    'end_date' => $end_date,
                    'client_id' => auth()->id,
                ]);
                return response()->json(['message' => 'Réservation insérée']);
            }
        }
        return response()->json(['message' => "Pas de chambres de ce type disponible !"]);
    }

    public function storeTourReservation(Request $request)
    {
        // Validate the request data if needed
    
        // Find the tour by its ID
        $tour = Tour::find($request->tour_id);
    
        if ($tour) {
            // Create a new reservation record
            if ($tour->nbr_people === 0) {
                return response()->json(['message' => 'Ce circuit est complet. Veuillez choisir un autre.'], 400);
            }else{
                Reservation::create([
                    'nbr_people' => $request->nbr_guests,
                    'tour_id' => $tour->id,
                    'client_id' => $request->client_id,
                    'offer_id' => $request->offer_id,
                ]);
        
                // Decrement the number of guests from the tour's available slots
                $tour->update([
                    'nbr_people' => max(0, $tour->nbr_people - $request->nbr_guests)
                ]);
            }
          
    
            // If the number of available slots becomes 0, return a response message
            
        } else {
            // If the tour is not found, return an error response
            return response()->json(['error' => 'Le circuit spécifié est introuvable.'], 404);
        }
    
        // Return a success response
        return response()->json(['message' => 'Réservation ajoutée avec succès']);
    }

        /**----------Admin------------- */


        public function index()
        {
            $reservations = Reservation::all();
            foreach ($reservations as $reservation) {
                $client = Client::find($reservation->client_id);
                $offer = Offer::find($reservation->offer_id);
                $reservation->client = $client;
                $reservation->offer = $offer;
            }
            return response()->json(['reservations' => $reservations]);
        }
    
}
