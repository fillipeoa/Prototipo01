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

        // ADICIONEI ISSO AQUI PQ TAVA DANDO ERRO NO POSTMAN DE VARIAVEL INDEFINIDA
        $caminho = '';

        str_replace('//','/',$data['foto']);
        $partes = explode('/', $data['foto']);

        if(count($partes)>0){
            if(count($partes)>1){
                $caminho = $partes[0];
                for($i=1;$i<count($partes)-1;$i++){
                    $caminho .= '/' . $partes[$i];
                }
            }
            $nomeOriginal = $partes[count($partes)-1];
            $tipo = explode('.', $nomeOriginal);

            $foto = new \Illuminate\Http\UploadedFile(
                $caminho.$nomeOriginal,
                $nomeOriginal,
                'image/'.$tipo[1],
                1234,
                TRUE
            );
        }


        if(!$request->has('password') || !$request->get('password')){
            $message = new ApiMessages('É necessário informar uma senha');
            return response()->json($message->getMessage(), 401);
        }

        try {
            $data['password'] = bcrypt($data['password']);
            $usuario = $this->usuario->create($data);
            $token = JWTAuth::fromUser($usuario);

            if($foto){
                $data['foto'] = $foto->store('images', 'public');
            }

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

    public function colaboracoes($id)
    {
        dd("colaboracoes");

        try {
            $usuario = $this->usuario->findOrFail($id);

            return response()->json([
                'data' => $usuario->colaboracoes
            ]);
        } catch (\Exception $e) {
            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);
        }
    }

    public function login(Request $request)
    {
        dd("loginControler");

        $token = '';
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
        dd("getAuthenticadedUser");
        $usuario = $this->usuario;

        try{
            if(! $usuario == JWTAuth::parseToken()->authenticate()){
                return response()->json(['user_not_found'], 404);
            }
        }catch(\Exception $e){
            $message = new ApiMessages('Unauthorized');
            return response()->json(['error' => $message->getMessage()], 401);
        }

        return response()->json(compact('usuario'));
    }

}
