<?php

namespace App\Models;

use App\Models\Host;
use App\Models\Reservation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bill extends Model
{
    use HasFactory;
    protected $fillable = ['total','host_id'];

    public function host()
    {
        return $this->belongsTo(Host::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
