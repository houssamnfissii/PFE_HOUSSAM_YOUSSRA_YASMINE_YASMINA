<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transporation extends Model
{
    use HasFactory;

    protected $fillable=['registration_number','type','nbr_places','tour_id'];

    public function tour(){
        return $this->belongsTo(Tour::class);
    }
}
