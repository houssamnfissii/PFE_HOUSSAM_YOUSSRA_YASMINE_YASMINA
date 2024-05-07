<?php

namespace App\Models;

use App\Models\Room;
use App\Models\Offer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable=['name','address','description','nbr_stars','city_id',];

    public function offer(){
        return $this->hasOne(Offer::class);
    }

    public function rooms(){
        return $this->hasMany(Room::class);
    }

    public function city(){
        return $this->belongsTo(City::class);
    }
}
