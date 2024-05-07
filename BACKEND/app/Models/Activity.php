<?php

namespace App\Models;

use App\Models\Tour;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Activity extends Model
{
    use HasFactory;

    protected $fillable=['name','description','tour_id'];

    public function tours(){
        return $this->belongsTo(Tour::class);
    }
}