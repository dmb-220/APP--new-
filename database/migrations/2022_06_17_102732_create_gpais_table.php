<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGpaisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gpais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id');
            $table->date('date');
            $table->text('code');
            $table->integer('quantity');
            $table->text('activity');
            $table->text('receive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gpais');
    }
}
