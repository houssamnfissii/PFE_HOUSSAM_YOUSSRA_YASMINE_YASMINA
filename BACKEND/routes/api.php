<?php

use App\Models\Cmodel;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\OfferUpdateController;
use App\Http\Controllers\NewController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\CbrandController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CmodelController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\RoomtypeController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TourController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/hotels/{id}', [OfferUpdateController::class,"getHotelOffer"]);

    Route::post('/hotels/hotels/store', [OfferController::class,"storeHotel"]);

    Route::post('/cars/store', [OfferController::class,"storeCar"]);
    Route::get('/offers', [OfferController::class,"index"]);
    Route::post('/logout', [AuthController::class, "logout"]);
    Route::post('/offers/store', [OfferController::class,"storeRestu"]);
    Route::post('/tours/store', [OfferController::class,"storeTour"]);
    Route::put('/cars/{id}', [OfferUpdateController::class,"update"]);
    Route::put('/hotels/{id}', [OfferUpdateController::class,"updateHotel"]);
    Route::put('/tours/{id}', [OfferUpdateController::class,"updateTourOffer"]);
    Route::delete('/tables/{id}', [OfferUpdateController::class, 'destroy']);
    Route::delete('/staffs/{deletedStaffId}', [OfferUpdateController::class, 'destroyStaff']);
    Route::delete('/activities/{deletedActivityId}', [OfferUpdateController::class, 'destroyActivities']);
    Route::delete('/transporations/{deletedTransId}', [OfferUpdateController::class, 'destroyTransporations']);
    Route::delete('/rooms/{deletedRoomId}', [OfferUpdateController::class, 'destroyRooms']);
    Route::delete('/tables/{deletedTableId}', [OfferUpdateController::class, 'destroyTables']);
    // Route::get('/offers_',[OfferController::class,'AllOffers']);
        // Route::get('/hotels', [HotelController::class, 'index']);



    Route::get('/restaurants/restaurant_offers', [RestaurantController::class, "restaurant_offers"]);
    Route::get('/cities', [RestaurantController::class, "getCities"]);
    Route::get('/restaurants/{id}', [RestaurantController::class, "show"]);
    Route::get('cars/car_offers', [CarController::class, 'car_offers']);
    // Route::get('cars/{id}', [CarController::class, 'show']);
    
    Route::put('/restaurants/{restaurantId}', [OfferUpdateController::class,"updateRestau"]);
    Route::get('/host/details', [AuthController::class, 'getHostDetails']);
    Route::get('/rooms/rooms/typee', [RestaurantController::class,"getRoomTypp"]);

    Route::get('/carss/{offerId}', [OfferUpdateController::class,'showCar']);
    Route::post('reviews', [ReviewController::class, 'addReview']);
   
    Route::get('/hotels/hotels/{id}', [OfferUpdateController::class,'showHotel']);
    Route::get('/tours/tours/{id}', [OfferUpdateController::class,'show']);
Route::get('/restaurants/restaurants/{id}', [OfferUpdateController::class,'showRestau']);

});

Route::get('/restaurants/{restaurantId}', [OfferUpdateController::class,"getRestauOffer"]);
Route::get('/tour/{id}', [OfferUpdateController::class,"getTourOffer"]);


Route::get('/cars/{id}', [OfferUpdateController::class,"getCarOffer"]);
Route::get('/car/brands/brands', [RestaurantController::class,"getBrands"]);

Route::get('/car/models', [RestaurantController::class,"getModels"]);
Route::get('/cities/cities', [RestaurantController::class,"getCitiesCities"]);
Route::get('/car/models/{selectedBrand}', [RestaurantController::class,"getModelsOfBrand"]);
Route::post("/host/registerH",[\App\Http\Controllers\AuthHostController::class,"store"]);

Route::get('/restaurants/{restaurantId}', [OfferUpdateController::class,"getRestauOffer"]);
Route::get('/tour/{id}', [OfferUpdateController::class,"getTourOffer"]);


Route::get('/hotels/{id}', [OfferUpdateController::class,"getHotelOffer"]);
Route::get('/cars/{id}', [OfferUpdateController::class,"getCarOffer"]);

Route::get('/offers/{id}', [OfferController::class,"index"]);
Route::get('/car/models', [RestaurantController::class,"getModels"]);
Route::get('/cities', [RestaurantController::class,"getCities"]);
Route::get('/cities/cities', [RestaurantController::class,"getCitiesCities"]);
Route::get('/car/models/{selectedBrand}', [RestaurantController::class,"getModelsOfBrand"]);
Route::get('/rooms/rooms/type', [RestaurantController::class,"getRoomTyp"]);
Route::get('roomtypes/name', [RoomtypeController::class,"index"]);


// Route::get('/car/brands/brands', [RestaurantController::class,"getBrands"]);

Route::get('brands', [CbrandController::class,"index"]);
Route::get('models', [CmodelController::class,"index"]);
Route::get('models/{id}', [CmodelController::class,"findBrand"]);

Route::delete('/offers/{offerId}', [OfferController::class,"destroy"]);
Route::get('/cuisines/cuisines/cuisines', [RestaurantController::class,"getCuisine"]);
Route::get('hotelss/hotel_offers',[HotelController::class,'hotel_offers']);
Route::get('hotels/{id}',[HotelController::class,'show']);



Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);


Route::get('bills', [BillController::class, 'event']);

Route::get('cars/car_offers', [CarController::class, 'car_offers']);
Route::get('cars/{id}', [CarController::class, 'show']);
Route::get('cbrands', [CbrandController::class, 'index']);
Route::get('cmodels', [CmodelController::class, 'index']);
Route::get('cmodels/findBrand/{id}', [CmodelController::class, 'findBrand']);
// Route::get('cities', [CityController::class, 'index']);
Route::post('reservations/store_car', [ReservationController::class, "storeCarReservation"]);


Route::get('/restaurants/{id}/table-types', [RestaurantController::class, 'getTableTypes']);
Route::get('/cuisines/cuisines/cuisines', [RestaurantController::class, "getCuisine"]);
Route::get('/restaurants/restaurant_offers', [RestaurantController::class, "restaurant_offers"]);
Route::get('/cities/cities', [RestaurantController::class, "getCitiesCities"]);
Route::get('/cities', [RestaurantController::class, "getCities"]);

Route::get('/restaurants/{id}', [RestaurantController::class, "show"]);
Route::post('/reservations/store_table', [ReservationController::class, 'storeTableReservation']);

Route::get('/rooms/rooms/type', [RestaurantController::class, 'getRoomTyp']);
//Route::get('/roomtypes/get', [RoomtypeController::class, 'getRoomTypes']);
Route::get('/hotels', [HotelController::class, 'getHotelsByStars']);
Route::post('/reservations/store_hotel', [ReservationController::class, 'storeRoomReservation']);







Route::get('tours', [TourController::class,"getTours"]);
Route::get('tours/{id}', [TourController::class,"DetailsTour"]);
// Route::get('test', [TourController::class,"index"]);

Route::get('getReviewsTopRat', [ReviewController::class, 'getReviewsTopRat']);
Route::post('/reservations/store_tour', [ReservationController::class, 'storeTourReservation']);



Route::post("/host/registerH",[\App\Http\Controllers\AuthHostController::class,"store"]);

Route::post("/register",[\App\Http\Controllers\AuthController::class,"register"]);
Route::post("/login",[\App\Http\Controllers\AuthController::class,"login"]);
Route::post('/logout', [AuthController::class, "logout"]);


Route::post('/emails', [EmailController::class, 'store']);



// /------------ADMIN ROUTES-------------/

Route::get('/offers_',[OfferController::class,'AllOffers']);
Route::delete('delete_offers',[OfferController::class,'deleteOffers']);

Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/clients/{id}',[ClientController::class,'show']);

Route::get('users', [UserController::class, 'index']);
Route::put('/users/{id}', [UserController::class, 'updateStatus']);
Route::delete('/users', [UserController::class, 'deleteUsers']);
Route::post('/users', [UserController::class, 'storeAdmin']);
Route::put('/admin',[UserController::class,"updateAdmin"]);