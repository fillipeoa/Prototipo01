<?php

namespace App\Http\Controllers\Api;

use App\Usuario;
use App\Api\ApiMessages;
use App\Http\Controllers\Controller;
use App\Http\Requests\UsuarioRequest;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{

    private $usuario;

    public function __construct(Usuario $usuario)
    {
        $this->usuario = $usuario;
    }

    public function store(UsuarioRequest $request)
    {
        $data = $request->all();

        if(!$request->has('password') || !$request->get('password')){
            $message = new ApiMessages('É necessário informar uma senha');
            return response()->json($message->getMessage(), 401);
        }

        try {

            $data['password'] = bcrypt($data['password']);

            $this->usuario->create($data);


            return response()->json([
                'data' => [
                    'message' => 'Usuário cadastrado com sucesso!'
                ]
            ], 200);

        } catch (\Exception $e) {
            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }
    }
}
