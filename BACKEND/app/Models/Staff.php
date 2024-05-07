<?php

namespace App\Models;

use App\Models\Tour;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Staff extends Model
{
    use HasFactory;

    protected $fillable=['first_name','last_name','role','telephone','tour_id'];

    public function tour(){
        return $this->belongsTo(Tour::class);
    }
}
