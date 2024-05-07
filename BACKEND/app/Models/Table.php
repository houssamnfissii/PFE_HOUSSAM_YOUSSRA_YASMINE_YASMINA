<?php

namespace App\Models;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Table extends Model
{
    protected $fillable = ['type','restaurant_id'];
    use HasFactory;
    public function restaurant(){
        return $this->belongsTo(Restaurant::class);
    }
    public function reservations(){
        return $this->hasMany(Reservation::class);
    }

}
