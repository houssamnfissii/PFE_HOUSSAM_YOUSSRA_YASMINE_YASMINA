<?php

namespace App\Models;

use App\Models\Car;
use App\Models\Tour;
use App\Models\Hotel;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class City extends Model
{
    use HasFactory;

    protected $fillable=['name'];

    public function tours(){
        return $this->belongsToMany(Tour::class);
    }
    
    public function hotels(){
        return $this->hasMany(Hotel::class);
    }

    public function retaurants(){
        return $this->hasMany(Restaurant::class);
    }

    public function cars(){
        return $this->hasMany(Car::class);
    }
}
