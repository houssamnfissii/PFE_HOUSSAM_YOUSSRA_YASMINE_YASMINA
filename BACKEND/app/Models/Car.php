<?php

namespace App\Models;

use App\Models\City;
use App\Models\Offer;
use App\Models\Cmodel;
use App\Models\Reservation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Car extends Model
{
    use HasFactory;

    protected $fillable = ['price_per_day','production_date','fuel','nbr_places','description','cmodel_id','city_id'];

    public function cmodel() {
        return $this->belongsTo(Cmodel::class);
    }

    public function offer(){
        return $this->hasOne(Offer::class);
    }
    
    public function reservations(){
        return $this->hasMany(Reservation::class);
    }

    public function city(){
        return $this->belongsTo(City::class);
    }
    
}
