<?php

namespace App\Http\Controllers\Api\Auth;

use App\Api\ApiMessages;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginJwtController extends Controller
{
    /* public function login(Request $request)
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
        }catch(){

        }
            return response()->json([
                'token' => $token
            ]);
        }
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Logout successfully'], 200);
    }
 */
}
