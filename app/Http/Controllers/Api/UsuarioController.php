<?php

namespace App\Http\Controllers\Api;

use App\Colaboracao;
use App\Http\Requests\ColaboracaoRequest;
use App\Repository\ColaboracaoRepository;
use App\Usuario;
use App\Api\ApiMessages;
use App\Http\Controllers\Controller;
use App\Http\Requests\UsuarioRequest;

use Faker\Provider\File;
use GuzzleHttp\Psr7\UploadedFile;
use Illuminate\Http\Request;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UsuarioController extends Controller
{

    private $usuario;

    //cria um objeto de usuario
    private $colaboracao;

    public function __construct(Usuario $usuario, Colaboracao $colaboracao)
    {
        $this->usuario = $usuario;
        $this->colaboracao = $colaboracao;
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
        $foto = $request->file('foto');


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
    public function colaboracoes($id, Request $request)
    {
        try {
            $colaboracao = $this->colaboracao; //isso traz os campos fillable

            $colaboracaoRepository = new ColaboracaoRepository($colaboracao); //isso cria o repository passando os campos trazidos ali em cima

            $colaboracaoRepository->selectIdUsuario($id);

            //esses ifs verificam se os campos de condicoes e filtros têm algum pedido e se tiver pega eles
            if($request->has('conditions')){
                $colaboracaoRepository->selectConditions($request->get('conditions'), $id);
            }

            if ($request->has('fields')){
                $colaboracaoRepository->selectFilters($request->get('fields'));
            }

            //aqui ele traz os resultados dos pedidos dos campos
            $colaboracaoRepository = $colaboracaoRepository->getResult()->paginate(5);

            //aqui ele retorna esses resultados
            return response()->json($colaboracaoRepository);
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
