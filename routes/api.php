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
    return $request->usuario();
});

Route::prefix('prototipo01')->namespace('Api')->group(function(){

    Route::post('/login', 'Auth\\LoginJwtController@login')->name('login');
    Route::get('/logout', 'Auth\\LoginJwtController@logout')->name('logout');

    Route::prefix('usuarios')->group(function(){
        Route::post('/', 'UsuarioController@store')->name('store');
    });

    Route::prefix('buscaLocal')->group(function(){
        Route::get('/{endereco}', 'BuscaLocal@get')->name('get');
    });

    Route::prefix('colaboracoes')->group(function(){
        Route::get('/', 'ColaboracaoController@index')->name('index');
        Route::get('/{idColaboracao}', 'ColaboracaoController@show')->name('show');
    });

    Route::group(['middleware' => ['jwt.auth', 'jwt.refresh']], function(){

        Route::prefix('colaboracoes')->group(function(){
            Route::post('/', 'ColaboracaoController@store')->name('store');
            Route::put('/{idColaboracao}', 'ColaboracaoController@update')->name('update');
            Route::patch('/{idColaboracao}', 'ColaboracaoController@patch')->name('patch');
            Route::delete('/{idColaboracao}', 'ColaboracaoController@delete')->name('delete');
        });

        Route::prefix('usuarios')->group(function(){
            Route::get('/', 'UsuarioController@index')->name('index');
            Route::get('/{idUsuario}', 'UsuarioController@show')->name('show');
            Route::put('/{idUsuario}', 'UsuarioController@update')->name('update');
            Route::patch('/{idUsuario}', 'UsuarioController@patch')->name('patch');
            Route::delete('/{idUsuario}', 'UsuarioController@delete')->name('delete');
        });
    });

});
