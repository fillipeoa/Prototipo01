<?php

namespace App\Http\Controllers\Api;

use App\Usuario;
use App\Api\ApiMessages;
use App\Http\Controllers\Controller;
use App\Http\Requests\UsuarioRequest;

use Illuminate\Http\Request;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UsuarioController extends Controller
{

    private $usuario;

    //cria um objeto de usuario
    public function __construct(Usuario $usuario)
    {
        $this->usuario = $usuario;
    }

    //-----------------------------------------------------------
    public function show($id)
    {
        try {

            $usuario = $this->usuario->findOrFail($id);

            return response()->json($usuario, 200);

        } catch (\Exception $e) {
            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }

    }
    //-----------------------------------------------------------

    //cadastra um usuario
    public function store(UsuarioRequest $request)
    {
        $data = $request->all();

        $partes = explode('\\', $data['foto']);

        if(count($partes)>1){
            $caminho = $partes[0].'\\';
            $nome = $partes[count($partes)-1];
            $tipo = explode('.', $nome);

            $foto = new \Illuminate\Http\UploadedFile(
                $caminho.$nome,
                $nome,
                'image/'.$tipo[1],
                1234,
                TRUE
            );
        }else if(count($partes)==1){
            $partes = explode('/', $data['foto']);

            $caminho = $partes[0].'/';
            $nome = $partes[count($partes)-1];
            $tipo = explode('.', $nome);

            $foto = new \Illuminate\Http\UploadedFile(
                $caminho.$nome,
                $nome,
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


            if($foto){
                $data['foto'] = $foto->store('images', 'public');
            }

            $this->usuario->create($data);


            return response()->json([
                'data' => [
                    'message' => 'Usuario cadastrado com sucesso!'
                ]
            ], 200);

        } catch (\Exception $e) {
            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }
    }

    //lista as colaboracoes de um usuario em especifico
    public function colaboracoes($id)
    {
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

    //loga o usuario
    public function login(Request $request)
    {
        $credentials = $request->all();

        try{
            if (! $token = JWTAuth::attempt($credentials)){
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
