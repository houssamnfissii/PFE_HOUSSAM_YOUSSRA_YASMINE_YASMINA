<?php

namespace App\Http\Controllers;

use App\Models\Cbrand;
use Illuminate\Http\Request;

class CbrandController extends Controller
{
    public function index(){
        $brands = Cbrand::pluck('name');
        return response()->json(['brands'=>$brands]);
    }
}
