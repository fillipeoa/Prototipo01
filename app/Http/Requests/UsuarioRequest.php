<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsuarioRequest extends FormRequest
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
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:tbUsuario'],
<<<<<<< HEAD
            'password' => ['string', 'min:8', 'confirmed'],
=======
            'password' => ['string', 'min:8'/*, 'confirmed'*/],
>>>>>>> 3236e85d59565b0c6ca20acf7c2a54b6f3bae11a
            'foto' => ['required', 'string']
        ];
    }
}
