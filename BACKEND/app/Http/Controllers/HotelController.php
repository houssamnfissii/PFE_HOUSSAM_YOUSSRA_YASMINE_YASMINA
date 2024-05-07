<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use App\Models\Hotel;
use App\Models\Offer;

class HotelController extends Controller
{
    public function index()
    {
        $hotels = Hotel::all();
        return response()->json(['data' => $hotels]);
    }

    public function hotel_offers()
    {
        $offers = Offer::whereNotNull('hotel_id')->with('images','reviews.client','host')->get();
        $hotelsWithOffers = [];
        foreach ($offers as $offer) {
            $hotel = Hotel::find($offer->hotel_id);
            if ($hotel) {
                $hotel->city_name = $hotel->city->name;
                $hotel->nbr_stars = $hotel->nbr_stars;
                $hotel->load('rooms.roomtype');

                foreach ($hotel->rooms as $room) {
                    $room->type_name = $room->roomtype->name;
                }
                $hotelsWithOffers[] = ['hotel' => $hotel, 'offer' => $offer];
            }
        }
        return response()->json(['data' =>  $hotelsWithOffers])->header('Content-Type', 'application/json');
    }


    public function show($id)
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->load('rooms.roomtype');
        $offer = Offer::where('hotel_id', $id)->with('images','host','reviews.client')->get();
        $city = City::find($hotel->city_id);
        return response()->json(['hotel' => $hotel, 'offer' => $offer,'city'=>$city]);
    }


    public function getHotelsByStars(Request $request)
    {
        $nbr_stars = $request->query('nbr_stars');

        $hotels = Hotel::where('nbr_stars', $nbr_stars)->get();

        return response()->json($hotels);
    }

    public function getHotels(Request $request)
    {
        $selectedCity = $request->input('city');
        $selectedStars = $request->input('stars');

        $hotels = Hotel::query();

        if ($selectedCity) {
            $hotels->where('city', $selectedCity);
        }

        if ($selectedStars) {
            $hotels->where('stars', $selectedStars);
        }

        $filteredHotels = $hotels->get();

        return response()->json($filteredHotels);
    }
}
