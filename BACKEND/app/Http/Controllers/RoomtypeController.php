<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Roomtype;

class RoomtypeController extends Controller
{
    public function index()
    {
        $roomTypes = Roomtype::pluck('name');

        return response()->json($roomTypes);
    }


//     public function getRoomTypes(Request $request)
// {
//     $roomTypes = Roomtype::query()->select('name');

//     $filteredRoomTypes = $roomTypes->get();

//     return response()->json($filteredRoomTypes);
// }
}