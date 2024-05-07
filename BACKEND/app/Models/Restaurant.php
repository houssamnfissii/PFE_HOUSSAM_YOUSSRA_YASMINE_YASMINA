<?php

namespace App\Models;

use App\Models\City;
use App\Models\Table;

use App\Models\Cuisine;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable=['name','description','cuisine_id','city_id','address','nbr_places'];

    public function city(){
        return $this->belongsTo(City::class);
    }

    public function cuisine(){
        return $this->belongsTo(Cuisine::class);
    }
    public function tables()
{
    return $this->hasMany(Table::class);
}


    public function offer(){
        return $this->hasOne(Offer::class);
    }
}