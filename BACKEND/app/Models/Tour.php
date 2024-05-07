<?php

namespace App\Models;

use App\Models\City;
use App\Models\Offer;
use App\Models\Staff;
use App\Models\Activity;
use App\Models\Transporation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tour extends Model
{
    use HasFactory;

    protected $fillable=['name','description','start_date','end_date','nbr_people','price_per_person'];

    public function offer(){
        return $this->hasOne(Offer::class);
    }
    
    public function staffs(){
        return $this->hasMany(Staff::class);
    }

    public function transportations(){
        return $this->hasMany(Transporation::class);
    }

    public function activities(){
        return $this->hasMany(Activity::class);
    }

    public function cities(){
        return $this->belongsToMany(City::class);
    }

    public function reservations(){
        return $this->hasMany(Reservation::class);
    }

}
