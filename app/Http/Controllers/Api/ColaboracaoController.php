<?php

namespace App\Http\Controllers\Api;

use App\Api\ApiMessages;
use App\Http\Requests\ColaboracaoRequest;
use App\Colaboracao;
use App\Http\Controllers\Controller;
use App\Repository\ColaboracaoRepository;
use Illuminate\Http\Request;

class ColaboracaoController extends Controller
{

    private $colaboracao;

    public function __construct(Colaboracao $colaboracao)
    {
        $this->colaboracao = $colaboracao;
    }
    //-----------------------------------------------------------
    public function index(Request $request)
    {

        $colaboracao = $this->colaboracao; //isso traz os campos fillable

        $colaboracaoRepository = new ColaboracaoRepository($colaboracao); //isso cria o repository passando os campos trazidos ali em cima

        //esses ifs, pelo que entendi, verificam se os campos de condicoes e filtros têm algum pedido e se tiver pega eles
        if($request->has('conditions')){
            $colaboracaoRepository->selectConditions($request->get('conditions'));
        }

        if ($request->has('fields')){
            $colaboracaoRepository->selectFilters($request->get('fields'));
        }

        //aqui ele traz os resultados dos pedidos dos campos
        $colaboracaoRepository = $colaboracaoRepository->getResult()->paginate(5);

        //$colaboracoes = auth('api')->user()->colaboracao;

        //aqui ele retorna esses resultados
        return response()->json($colaboracaoRepository);

    }
    //-----------------------------------------------------------
    public function show($id)
    {
        try {

            $colaboracao = $this->colaboracao->findOrFail($id);

            return response()->json([
                'data' =>  $colaboracao
            ], 200);

        } catch (\Exception $e) {
            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }

    }
    //-----------------------------------------------------------
    public function store(ColaboracaoRequest $request)
    {
        $data = $request->all();

        try {


            $colaboracao = $this->colaboracao->create($data);

            return response()->json([
                'data' => [
                    'message' => 'Colaboração cadastrada com sucesso!'
                ]
            ], 200);

        } catch (\Exception $e) {
            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }

    }
    //-----------------------------------------------------------
    public function update($id, Request $request)
    {
        $data = $request->all();

        try {


            $colaboracao = $this->colaboracao->findOrFail($id);
            $colaboracao->update($data);

            return response()->json([
                'data' => [
                    'message' => 'Colaboração atualizada com sucesso!'
                ]
            ], 200);

        } catch (\Exception $e) {

            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }

    }
    //----------------------------------------------------------
    public function delete($id)
    {
        try {

            $colaboracao = $this->colaboracao->findOrFail($id);
            $colaboracao->delete();

            return response()->json([
                'data' => [
                    'message' => 'Colaboração excluída com sucesso!'
                ]
            ], 200);

        } catch (\Exception $e) {

            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }
    }
}
