<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateColaboracaoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbColaboracao', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idUsuario');

            $table->string('titulo');
            $table->string('descricao');
            $table->dateTime('dataRegistro');
            $table->float('latitude');
            $table->float('longitude');
            $table->string('rua');
            $table->string('numero');
            $table->string('bairro');
            $table->string('complemento')->nullable();
            $table->string('cidade');
            $table->integer('flagSituacao');

            $table->foreign('idUsuario')->references('id')->on('tbUsuario');
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
        Schema::dropIfExists('tbColaboracao');
    }
}
