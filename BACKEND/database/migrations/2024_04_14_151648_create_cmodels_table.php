<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cmodels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('cbrand_id');
            $table->foreign('cbrand_id')->references('id')->on('Cbrands');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cmodels');
    }
};
