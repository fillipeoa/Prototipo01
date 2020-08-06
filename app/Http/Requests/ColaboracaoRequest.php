<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ColaboracaoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
        'titulo' => 'required',
        'descricao' => 'required',
        'dataRegistro' => 'required',
        'latitude' => 'required',
        'longitude' => 'required',
        'rua' => 'required',
        'numero' => 'required',
        'bairro' => 'required',
        'cidade' => 'required',
        'flagSituacao' => 'required'
        ];
    }
}
