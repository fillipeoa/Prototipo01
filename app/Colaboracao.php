<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Colaboracao extends Model
{
    protected $table = "tbColaboracao";
    public $timestamps = false;

    protected $fillable = [
        'titulo', 'descricao', 'dataRegistro', 'latitude', 'longitude',
        'rua', 'numero', 'bairro', 'complemento', 'cidade',
        'flagSituacao', 'idUsuario'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id');
    }
}
