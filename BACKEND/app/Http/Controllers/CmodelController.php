<?php

namespace App\Http\Controllers;

use App\Models\Cmodel;
use Illuminate\Http\Request;

class CmodelController extends Controller
{
    public function index()
    {
        $models = Cmodel::pluck('name');
        return response()->json(['models' => $models]);
    }
    public function findBrand($id)
    {
        $model = Cmodel::find($id);
        $brand = $model->cbrand()->first();
        return response()->json(['brand' => $brand]);
    }
}
