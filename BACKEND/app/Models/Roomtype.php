<?php

namespace App\Models;

use App\Models\Room;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Roomtype extends Model
{
    use HasFactory;

    protected $fillable=['name'];

    public function rooms(){
        return $this->hasMany(Room::class);
    }
}
