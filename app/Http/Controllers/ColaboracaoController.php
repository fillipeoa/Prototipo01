<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Api\ApiMessages;
use App\Colaboracao;
use App\User;
use App\Http\Controllers\Controller;

class ColaboracaoController extends Controller
{
    private $colaboracao;

    public function __construct(Colaboracao $colaboracao)
    {
        $this->colaboracao = $colaboracao;
    }

    public function index()
    {
        $colaboracoes = auth('api')->user()->colaboracao();

        return response()->json($colaboracoes->paginate(10), 200);
    }
    //--------------------------------------------------------------------
    public function show($id)
    {
        try{

            $colaboracao = auth('api')->user()->colaboracao()->findOrFail($id);

            return response()->json([
                    'data' => $colaboracao
            ], 200);

        }catch(\Exception $e){
            $message = new ApiMessages($e->getMessage());
            return response()->json(['error' => $message->getMessage()], 401);

        }
    }
    //--------------------------------------------------------------------
    public function store(Request $request)
    {
        $data = $request->all();

        try{

            $data['user_id'] = auth('api')->user->id;
            $colaboracao = $this->colaboracao->create($data);

            return response()->json([
                'data' => [
                    'message' => 'Colaboração cadastrada com sucesso!'
                ]
            ], 200);

        }catch(\Exception $e){

            $message = new ApiMessages($e->getMessage());
            return response()->json(['error' => $message->getMessage()], 401);

        }
    }
    //--------------------------------------------------------------------
    public function update($id, Request $request)
    {
        $data = $request->all();

        try{

            $colaboracao = auth('api')->user()->colaboracao()->findOrFail($id);

            $colaboracao->update($data);

            return response()->json([
                'data' => [
                    'message' => 'Colaboração atualizada com sucesso!'
                ]
            ], 200);

        }catch(\Exception $e){

            $message = new ApiMessages($e->getMessage());
            return response()->json(['error' => $message->getMessage()], 401);

        }
    }
    //--------------------------------------------------------------------
    public function destroy($id)
    {
        try{

            $colaboracao = auth('api')->user()->colaboracao()->findOrFail($id);
            $colaboracao->delete();

            return response()->json([
                'data' => [
                    'message' => 'Colaboração removida com sucesso!'
                ]
            ], 200);

        }catch(\Exception $e){

            $message = new ApiMessages($e->getMessage());
            return response()->json(['error' => $message->getMessage()], 401);

        }
    }

}
