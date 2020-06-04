<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Colaboracao extends Model
{

    protected $table = 'colaboracao';
    protected $fillable =  [
        'user_id', 'titulo', 'descricao', 'dataRegistro','latitude',
        'longitude','rua', 'numero', 'bairro', 'complemento',
        'cidade', 'flagSituacao'
    ];

    public function user()
    {
        return $this->belongsTo(User::class); //user_id
    }
}
