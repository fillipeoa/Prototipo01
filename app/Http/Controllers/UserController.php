<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Api\ApiMessages;
use App\User;

class UserController extends Controller
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
    //--------------------------------------------------------------------
    public function index()
    {
        $users = $this->user->paginate('10');

        return response()->json($users, 200);
    }
    //--------------------------------------------------------------------
    public function store(Request $request){

        $data = $request->all();

        if(!$request->has('password') || !$request->get('password')){
            $message = new ApiMessages(
                'É necessário informar uma senha para o usuário.'
            );

            return response()->json($message->getMessage(), 401);
        }

        try{

            $data['password'] = bcrypt($data['password']);

            $user = $this->user->create($data);

            return response()->json([
                'data' => [
                    'message' => 'Usuário cadastrado com sucesso!'
                ]
            ], 200);

        }catch(\Exception $e){

            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }
    }

    //--------------------------------------------------------------------
    public function show($id)
    {
        try{
            $user = $this->user->findOrFail($id);

            return response()->json([
                    'data' => $user
            ], 200);

        }catch(\Exception $e){
            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }
    }
    //--------------------------------------------------------------------
    public function update(Request $request, $id)
    {
        $data = $request->all();

        if($request->has('password') && $request->get('password')){
            $data['password'] = bcrypt($data['password']);
        }else{
            unset ($data['password']);
        }

        try{


            $user = $this->user->findOrFail($id);
            $user->update($data);

            return response()->json([
                'data' => [
                    'message' => 'Usuário atualizado com sucesso!'
                ]
            ], 200);

        }catch(\Exception $e){

            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }
    }
    //-----------------------------------------------------------------------
    public function dedelete($id)
    {
        try{

            $user = $this->user->findOrFail($id);
            $user->delete();

            return response()->json([
                'data' => [
                    'message' => 'Usuário removido com sucesso!'
                ]
            ], 200);

        }catch(\Exception $e){

            $message = new ApiMessages($e->getMessage());
            return response()->json($message->getMessage(), 401);

        }
    }
}
