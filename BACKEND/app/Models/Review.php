<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['client_id', 'tour_id', 'body', 'rating'];

    public function client() {
        return $this->belongsTo(Client::class);
    }
    public function offer(){
        return $this->belongsTo(Offer::class);
    }

}
