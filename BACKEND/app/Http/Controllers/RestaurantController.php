<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Model;

use App\Models\Offer;
use App\Models\Table;
use App\Models\Cbrand;
use App\Models\Cmodel;
use App\Models\Cuisine;
use App\Models\Roomtype;
use App\Models\Restaurant;



use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::all();
        return response()->json($restaurants);
    }
    public function getRoomTyp(){
        $roomType=Roomtype::pluck("name");
        return response()->json(["roomType"=>$roomType]);

    }
       
public function getRoomTypp(){
    $roomTypes = Roomtype::all(); 
    return response()->json(['roomTypes' => $roomTypes]);
}
    public function restaurant_offers()
    {
        $offers = Offer::whereNotNull('restaurant_id')->with('images','host','reviews.client')->get();
        $restaurantsOf = [];
    
        foreach ($offers as $offer) {
            $restaurant = Restaurant::find($offer->restaurant_id);
            if ($restaurant) {
                $restaurant->cuisine_name = $restaurant->cuisine->name;
                $restaurant->city_name = $restaurant->city->name;
                $restaurantsOf[] = ['restaurant' => $restaurant, 'offer' => $offer];
            }
        }
    
        return response()->json(['data' => $restaurantsOf]);
    }
    
    public function show($id){
        $restaurant = Restaurant::with('city', 'cuisine')->findOrFail($id);
        $offer = Offer::where('restaurant_id', $id)->with('images','host','reviews.client')->get();
        $tables = Table::where('restaurant_id', $id)->distinct()->pluck('type');
        return response()->json(['restaurant' => $restaurant, 'offer' => $offer, 'tables' => $tables]);
    }
    
    

   
    public function getTableTypes($id)
    {
        $tableTypes = Table::where('restaurant_id', $id)->pluck('type');
        
        return response()->json(['tableTypes' => $tableTypes]);
    }
    public function getCities(){
        $cities = City::pluck('name');
    
        return response()->json(['cities' => $cities]);
    }
    public function getModels(){
        $model= Cmodel::all();
        return response()->json(['model' => $model]);
    }
    public function getBrands(){
        $brand= Cbrand::all();
        return response()->json(['brand' => $brand]);
    }
     public function getModelsOfBrand($brand){
        $models= Cmodel::where("cbrand_id",$brand)->get();
        return response()->json(['models' => $models]);
    }
    public function getCitiesCities(){
        $cities = City::all();
    
        return response()->json(['cities' => $cities]);
    }
    public function getCuisine(){
        $cuisine= Cuisine::pluck('name');
        return response()->json(['cuisine' => $cuisine]);
    }
    
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
      */
    // public function store(Request $request)
    // {
    //     $Data = $request->validate([
    //         'table_id' => 'required|exists:tables,id',
    //         'reservation_date' => 'required|date',
    //     ]);
    //     $isReserved = Reservation::where('table_id', $Data['table_id'])
    //         ->where('reservation_date_restaurant', $Data['reservation_date'])
    //         ->exists();

    //     if ($isReserved) {
    //         return response()->json(['message' => 'La table sélectionnée est déjà réservée pour cette date.'], 422);
    //     }

    //     $reservation = Reservation::create($validatedData);
    //     return response()->json(['message' => 'Réservation ajoutée avec succès.', 'reservation' => $reservation], 201);
    // }


    /**
     * Display the specified resource.
     */
  

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}