<?php

namespace App\Http\Controllers;
use App\Models\Car;
use App\Models\Offer;
use App\Models\Room;
use App\Models\Transporation;
use App\Models\Staff;
use App\Models\Cuisine;
use App\Models\City;
use App\Models\Table;
use App\Models\Activity;

use App\Models\Restaurant;









use Illuminate\Http\Request;

class OfferUpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
   
    public function show($id)
    {

                $offers = Offer::with([
                                'tour',
                                'tour.staffs',
                                'tour.transportations',
                                'tour.activities',
                                'tour.cities'
                                
                                
                                ]) 
                                ->findOrFail($id);    
                return response()->json($offers);
       
    }
    public function showRestau($id)
    {

                $offers = Offer::with([
                                'restaurant',
                                'restaurant.city',
                                'restaurant.cuisine',
                                'restaurant.tables'
                                
                                
                                ]) 
                                ->findOrFail($id);    
                return response()->json($offers);
       
    }
    public function showCar($offerId)
    {
        $offers = Offer::with([
                        'car',
                        'car.city',
                        'car.cmodel.cbrand',
                    ]) 
                    ->findOrFail($offerId);    
        return response()->json($offers);
    }
    

    public function showHotel($id){



                                $offers = Offer::with([
                                    'hotel',
                                    'hotel.rooms.roomtype','hotel.city',
                                    ]) 
                                    ->findOrFail($id);    
                    return response()->json($offers);
           
    }


    
    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $offer = Offer::find($id);
        
        if (!$offer) {
            return response()->json(['error' => 'Offer not found'], 404);
        }
    
        $car = $offer->car;
    
        if (!$car) {
            return response()->json(['error' => 'Car not found for the offer'], 404);
        }
    
        // Update specific fields
        $car->update([
            'cmodel_id' => $request->input('model_id'),
            'cbrand_id' => $request->input('brand_id'),

            'price_per_day' => $request->input('price_per_day'),
            'production_date' => $request->input('production_date'),
            'fuel' => $request->input('fuel'),
            'nbr_places' => $request->input('nbr_places'),
            'description' => $request->input('description'),
            'city_id' => $request->input('city_id')
        ]);
    
        return response()->json($car);
    }
    
    public function getCarOffer($id)
    {
        // Query to retrieve the car offer details with the given ID from the database
        $carOffer = Offer::with('images','car.cmodel.cbrand', 'car.city')->find($id);
    
        if (!$carOffer) {
            return response()->json(['error' => 'Car offer not found'], 404);
        }
    
        if (!$carOffer->car) {
            return response()->json(['error' => 'No car associated with the offer'], 404);
        }
    
        return response()->json(['car' => $carOffer->car]);
    }
    


    public function getHotelOffer($id)
    {
        // Query to retrieve the hotel offer details with the given ID from the database
        $hotelOffer = Offer::with('hotel','hotel.rooms.roomtype', 'hotel.city') 
                            ->find($id);
    
        if (!$hotelOffer || !$hotelOffer->hotel) {
            return response()->json(['error' => 'Hotel offer not found or no hotel associated with the offer'], 404);
        }
    
        return response()->json($hotelOffer);
    }
  /* public function updateHotel(Request $request, $id)
{
    $offer = Offer::find($id);

    if (!$offer) {
        return response()->json(['error' => 'Offer not found'], 404);
    }

    // Update hotel attributes
    $offer->hotel->update($request->input('hotel', []));

    // Update offer attributes
    $offer->update($request->input('offer', []));

    // Update or create rooms
    foreach ($request->input('rooms', []) as $roomData) {
        // Find the room by room ID if provided
        $roomId = isset($roomData['id']) ? $roomData['id'] : null;
        $room = Room::find($roomId);

        if ($room) {
            // Update existing room
            $room->update($roomData);
        } else {
            // Create a new room
            $newRoom = new Room($roomData);
            $newRoom->hotel_id = $offer->hotel->id;
            $newRoom->save();
        }
    }

    return response()->json($offer->fresh('hotel'));
}

*/
public function updateHotel(Request $request, $id)
{
    try {
        $offer = Offer::find($id);
        
        if (!$offer) {
            return response()->json(['error' => 'Offer not found'], 404);
        }

        $hotel = $offer->hotel;
        
        if (!$hotel) {
            return response()->json(['error' => 'Hotel not found for the offer'], 404);
        }

        $hotel->update([
            'name' => $request->input('hotel.name'),
            'address' => $request->input('hotel.address'),
            'nbr_stars' => $request->input('hotel.nbr_stars'),
            'city_id' => $request->input('hotel.city_id'),
            'description' => $request->input('hotel.description')
        ]);
        
        // Update each room associated with the hotel
        foreach ($request->input('hotel.rooms') as $roomData) {
            $quantity = $roomData['quantity'] ?? 1; // Default quantity is 1 if not provided
            for ($i = 0; $i < $quantity; $i++) {
                if (isset($roomData['id'])) {
                    // If room ID exists, update the existing room
                    $room = $hotel->rooms()->findOrFail($roomData['id']);
                    $room->update([
                        'nbr_beds' => $roomData['nbr_beds'],
                        'price_per_night' => $roomData['price_per_night'],
                        'description' => $roomData['description'],
                        'roomtype_id' => $roomData['roomtype_id'] ?? null, // Assign room type if provided
                    ]);
                } else {
                    // If room ID does not exist, create a new room
                    $roomCreateData = [
                        'nbr_beds' => $roomData['nbr_beds'],
                        'price_per_night' => $roomData['price_per_night'],
                        'description' => $roomData['description'],
                        'roomtype_id' => $roomData['roomtype_id'] ?? null, // Assign room type if provided
                    ];
                    $hotel->rooms()->create($roomCreateData);
                }
            }
        }

        $hotel->save();

        return response()->json(['message' => 'Hotel details updated successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'An error occurred while updating the hotel details', 'message' => $e->getMessage()], 500);
    }
}



public function getTourOffer($id)
{
    $tourOffer = Offer::with('tour.staffs', 'tour.cities','tour.transportations','tour.activities') 
                        ->find($id);

    if (!$tourOffer || !$tourOffer->tour) {
        return response()->json(['error' => 'tour offer not found or no tour associated with the offer'], 404);
    }

    return response()->json($tourOffer);
}
public function updateTourOffer(Request $request, $id)
{
    // Find the offer by its ID
    $offer = Offer::findOrFail($id);

    // Check if the offer has a tour associated with it
    if (!$offer->tour) {
        return response()->json(['error' => 'No tour associated with the offer'], 404);
    }

    // Update the tour associated with the offer
    $offer->tour->update([
        'name' => $request->name,
        'description' => $request->description,
        'start_date' => $request->start_date,
        'end_date' => $request->end_date,
        'nbr_people' => $request->nbr_people,
        'price_per_person' => $request->price_per_person,
        // Add other tour fields here
    ]);
    $offer->tour->cities()->sync($request->selectedCities);


    // Update transportations if needed
    if ($request->has('transportations')) {
        foreach ($request->transportations as $transportationData) {
            if (isset($transportationData['id'])) {
                $transportation = Transporation::findOrFail($transportationData['id']);
                $transportation->update([
                    'registration_number' => $transportationData['registration_number'],
                    'type' => $transportationData['type'],
                    'nbr_places' => $transportationData['nbr_places'],
                    // Ajouter d'autres champs de transport si nécessaire
                ]);
            } else {
                $transportation = new Transporation([
                    'registration_number' => $transportationData['registration_number'],
                    'type' => $transportationData['type'],
                    'nbr_places' => $transportationData['nbr_places'],
                    // Ajouter d'autres champs de transport si nécessaire
                ]);
                $offer->tour->transportations()->save($transportation);
            }
        }
    }

    // Update staffs if needed
    if ($request->has('staffs')) {
        foreach ($request->staffs as $staffData) {
            if (isset($staffData['id'])) {
                $staff = Staff::findOrFail($staffData['id']);
                $staff->update([
                    'first_name' => $staffData['first_name'],
                    'last_name' => $staffData['last_name'],
                    'role' => $staffData['role'],
                    'telephone' => $staffData['telephone'],
                    // Ajouter d'autres champs de personnel si nécessaire
                ]);
            } else {
                $staff = new Staff([
                    'first_name' => $staffData['first_name'],
                    'last_name' => $staffData['last_name'],
                    'role' => $staffData['role'],
                    'telephone' => $staffData['telephone'],
                    // Ajouter d'autres champs de personnel si nécessaire
                ]);
                $offer->tour->staffs()->save($staff);
            }
        }
    }
    // Update activities if needed
    if ($request->has('activities')) {
        foreach ($request->activities as $activityData) {
            if (isset($activityData['id'])) {
                $activity = Activity::findOrFail($activityData['id']);
                $activity->update([
                    'name' => $activityData['name'],
                    'description' => $activityData['description'],
                    // Ajouter d'autres champs d'activité si nécessaire
                ]);
            } else {
                $activity = new Activity([
                    'name' => $activityData['name'],
                    'description' => $activityData['description'],
                    // Ajouter d'autres champs d'activité si nécessaire
                ]);
                $offer->tour->activities()->save($activity);
            }
        }
    }

    // Return a response indicating success
    return response()->json(['message' => 'Tour associated with the offer updated successfully', 'tour' => $offer->tour], 200);
}








public function getRestauOffer($restaurantId)
{
    $restauOffer = Offer::with('restaurant.cuisine', 'restaurant.city', 'restaurant.tables')
                        ->find($restaurantId);

    if (!$restauOffer || !$restauOffer->restaurant) {
        return response()->json(['error' => 'Restaurant offer not found or no tour associated with the offer'], 404);
    }

    $restaurant = $restauOffer->restaurant;

    // Retrieve tables associated with the restaurant
    $tables = $restaurant->tables()->get();

    // Append tables to the restaurant object
    $restaurant->setAttribute('tables', $tables);

    return response()->json($restauOffer);
}
public function updateRestau(Request $request, $restaurantId)
{
    $offer = Offer::find($restaurantId);
    
    if (!$offer) {
        return response()->json(['error' => 'Offer not found'], 404);
    }

    $restaurant = $offer->restaurant;

    if (!$restaurant) {
        return response()->json(['error' => 'Restaurant not found for the offer'], 404);
    }

    $restaurant->update([
        'name' => $request->input('name'),
        'address' => $request->input('address'),
        'cuisine' => $request->input('cuisine'),
        'city' => $request->input('city'),
        'description' => $request->input('description')
    ]);

    $nbr_tables= $restaurant->tables()->count(); 

    if ($request->has('tables')) {
        foreach ($request->input('tables') as $table) {
            $tableType = $table['type'];
            $tableQuantity = isset($table['quantity']) ? $table['quantity'] : 0;
        
            for ($i = 0; $i < $tableQuantity; $i++) {
                $restaurant->tables()->create([
                    'type' => $tableType,
                ]);
                $nbr_tables++; 
            }
        }
    }

    $restaurant->nbr_tables = $nbr_tables;
    $restaurant->save();

    return response()->json($restaurant);
}





    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $table = Table::find($id);

        if (!$table) {
            return response()->json(['error' => 'Table not found'], 404);
        }

        $table->delete();

        return response()->json(['message' => 'Table deleted successfully']);
    }
    public function destroyStaff($deletedStaffId)
    {
        $staff = Staff::find($deletedStaffId);

        if (!$staff) {
            return response()->json(['error' => 'staff not found'], 404);
        }

        $staff->delete();

        return response()->json(['message' => 'staff deleted successfully']);
    }

    public function destroyActivities($deletedActivityId)
    {
        $activity = Activity::find($deletedActivityId);
    
        if (!$activity) {
            return response()->json(['error' => 'Activity not found'], 404);
        }
    
        $activity->delete();
    
        return response()->json(['message' => 'Activity deleted successfully']);
    }
    
    public function destroyTransporations($deletedTransId)
    {
        $transportation = Transporation::find($deletedTransId);

        if (!$transportation) {
            return response()->json(['error' => 'transportation not found'], 404);
        }

        $transportation->delete();

        return response()->json(['message' => 'transportation deleted successfully']);
    }

    public function destroyRooms($deletedRoomId)
    {
        $rooms = Room::find($deletedRoomId);

        if (!$rooms) {
            return response()->json(['error' => 'rooms not found'], 404);
        }

        $rooms->delete();

        return response()->json(['message' => 'rooms deleted successfully']);
    }
}
