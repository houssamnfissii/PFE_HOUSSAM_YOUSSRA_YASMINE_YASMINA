<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Offer;
use App\Models\Tour;
use Illuminate\Http\Request;

class TourController extends Controller
{
    public function index(){
        // $offers = Offer::whereNotNull('tour_id')->with('images','reviews')->get();
        // $tours = [];
    
        // foreach ($offers as $offer) {
        //     $tour = Tour::find($offer->tour_id);
        //     if ($tour) {
        //         $nf=$offer->tourN = $tour->name;
        //         $des=$offer->des = $tour->description;

        //         $tours[] = [ 
        //             'offer' => $offer,
        //              'name_tour' => $nf,
        //              'des'=>$des
        //             ];
                
        //     }
        // }
        // return response()->json(['data' =>  $tours])->header('Content-Type', 'application/json');
    }
    public function getTours(){
        $offers = Offer::whereNotNull('tour_id')->with('images','reviews.client','host')->get();
        $tours = [];
    
        foreach ($offers as $offer) {
            $tour = Tour::find($offer->tour_id);
            if ($tour) {
                $cities = $tour->cities()->pluck('name')->toArray(); 
                $activities = $tour->activities()->get(); 
                $transports = $tour->transportations()->get(); 
                $staffs = $tour->staffs()->get(); 
                $tours[] = [ 
                    'id'=>$tour->id,
                    'offer' => $offer,
                    'cities' => $cities,
                    'activities' => $activities,
                    'transports' => $transports,
                    'staffs' => $staffs,
                    'tour_title' => $tour->name,
                    'desc'=>$tour->description,
                    'start_date'=>$tour->start_date,
                    'end_date'=>$tour->end_date,
                    'nbr_people'=>$tour->nbr_people,
                    'price_per_person'=>$tour->price_per_person,
                    'create_at'=>$tour->created_at,
                    ];

            }
        }
        return response()->json(['data' =>  $tours])->header('Content-Type', 'application/json');
    }

    public function DetailsTour($id) {
        $tour = Tour::find($id);
        if (!$tour) {
            return response()->json(['error' => 'Tour not found'], 404);
        }
        $offer = Offer::where('tour_id', $tour->id)->with('images', 'reviews.client', 'host')->first();
    
        if (!$offer) {
            return response()->json(['error' => 'Offer not found for this tour'], 404);
        }
        $cities = $tour->cities()->pluck('name','step')->toArray(); 
        $activities = $tour->activities()->get(); 
        $transports = $tour->transportations()->get(); 
        $staffs = $tour->staffs()->get(); 
        $offerDetails = [
            'id' => $tour->id,
            'offer' => $offer,
            'cities' => $cities,
            'activities' => $activities,
            'transports' => $transports,
            'staffs' => $staffs,
            'tour_title' => $tour->name,
            'desc' => $tour->description,
            'start_date' => $tour->start_date,
            'end_date' => $tour->end_date,
            'nbr_people' => $tour->nbr_people,
            'price_per_person' => $tour->price_per_person,
            'create_at' => $tour->created_at,
        ];
        return response()->json(['data' =>  $offerDetails]);
    }
    
}
