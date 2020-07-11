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
}
