<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

    Route::prefix('prototipo01')->group(function () {

        Route::prefix('usuarios')->group(function () {
            Route::get('/', 'UserController@index');
            Route::get('/{id}', 'UserController@show');
            Route::post('/', 'UserController@store');
            Route::put('/', 'UserController@update');
            Route::patch('/', 'UserController@update');
            Route::delete('/{id}', 'UserController@delete');
        });

            Route::prefix('colaboracoes')->group(function () {
                Route::get('/', 'ColaboracaoController@index');
                Route::get('/{id}', 'ColaboracaoController@show');
                Route::post('/', 'ColaboracaoController@store');
                Route::put('/', 'ColaboracaoController@update');
                Route::patch('/', 'ColaboracaoController@update');
                Route::delete('/{id}', 'ColaboracaoController@delete');
            });

    });
