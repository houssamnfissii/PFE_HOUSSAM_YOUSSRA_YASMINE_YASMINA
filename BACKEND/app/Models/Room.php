<?php

namespace App\Models;

use App\Models\Hotel;
use App\Models\Roomtype;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory;

    protected $fillable=['nbr_beds','price_per_night','description','roomtype_id','hotel_id'];
    public function hotel(){
        return $this->belongsTo(Hotel::class);
    }
    
    public function roomtype(){
        return $this->belongsTo(Roomtype::class);
    }
    
    public function reservations(){
        return $this->hasMany(Reservation::class);
    }
    
}
