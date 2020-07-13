<?php

namespace App\Http\Controllers\Api;

use App\Usuario;
use App\Api\ApiMessages;
use App\Http\Controllers\Controller;
use App\Http\Requests\UsuarioRequest;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTAuth as JWT;

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
            $usuario = $this->usuario->create($data);
            $token = JWTAuth::fromUser($usuario);

            return response()->json(compact('usuario', 'tooken'), 201);

            //return response()->json([
            //    'data' => [
            //        'message' => 'Usuário cadastrado com sucesso!'
            //    ]
            //], 200);

        } catch (\Exception $e) {
            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }
    }

    public function login(Request $request)
    {
        $credentials = $request->json()->all(['email', 'password']);

        Validator::make($credentials, [
            'email' => 'required|string',
            'password' => 'required|string',
        ])->validate();

        try{
            if (!$token == JWTAuth::attempt($credentials)){
                $message = new ApiMessages('Unauthorized');
                return response()->json(['error' => $message->getMessage()], 401);
            }
        }catch(JWTException $e){
            $message = new ApiMessages('Unauthorized');
            return response()->json(['error' => $message->getMessage()], 401);

        }

        return response()->json([
           compact('token')
        ]);
    }

    public function getAuthenticatedUser()
    {
        try{
            if(!$usuario == JWTAuth::parseToken()->authenticate()){
                return response()->json(['user_not_found'], 404);
            }
        }catch(\Exception $e){
            $message = new ApiMessages('Unauthorized');
            return response()->json(['error' => $message->getMessage()], 401);
        }

        return response()->json(compact('usuario'));
    }

}
