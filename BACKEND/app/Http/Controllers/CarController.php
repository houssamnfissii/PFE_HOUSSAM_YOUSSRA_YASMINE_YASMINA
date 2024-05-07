<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Cbrand;
use App\Models\City;
use App\Models\Cmodel;
use App\Models\Offer;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::all();
        // return CarResource::collection($cars);
        return response()->json(['data'=>$cars]);
    }

    public function car_offers()
    {
        $offers = Offer::whereNotNull('car_id')->with('images','host','reviews.client',)->get();
        $cars = [];
        foreach ($offers as $offer) {
            $car = Car::find($offer->car_id);
            if($car){
                $car->model_name = $car->cmodel->name;
                $car->brand_name = Cbrand::find($car->cmodel->cbrand_id)->name;
                $car->city_name = $car->city->name;
                $cars[] = ['car' => $car ,'offer' => $offer];
            }
            // $model = Cmodel::find($car->cmodel_id);
            // $brand = Cbrand::find($model->cbrand_id);
            
        }
        return response()->json(['data' =>  $cars])->header('Content-Type', 'application/json');
    }

    public function show($id){
        $car = Car::findOrFail($id);
        $model = Cmodel::find($car->cmodel_id);
        $brand = Cbrand::find($model->cbrand_id);
        $city = City::find($car->city_id);
        $offer = Offer::where('car_id',$id)->with('images','reviews.client','host')->get();
        return response()->json(['car'=>$car,'city'=>$city,'model'=> $model,'brand'=>$brand ,'offer'=>$offer]);
    }
}
