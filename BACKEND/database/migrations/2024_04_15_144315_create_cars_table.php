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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->decimal('price_per_day');
            $table->date('production_date');
            $table->string('fuel');
            $table->integer('nbr_places');
            $table->string('description');
            $table->timestamps();

            $table->unsignedBigInteger('cmodel_id');
            $table->foreign('cmodel_id')->references('id')->on('cmodels');
            $table->unsignedBigInteger('city_id');
            $table->foreign('city_id')->references('id')->on('cities');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
