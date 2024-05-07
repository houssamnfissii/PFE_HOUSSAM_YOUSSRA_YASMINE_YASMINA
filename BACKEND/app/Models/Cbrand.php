<?php

namespace App\Models;

use App\Models\Cmodel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cbrand extends Model
{
    use HasFactory;

    protected $fillable=['name'];

    public function cmodels(){
        return $this->hasMany(Cmodel::class);
    }
}
