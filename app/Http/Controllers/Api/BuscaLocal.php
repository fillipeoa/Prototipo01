<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class BuscaLocal extends Controller {

    public function get($enderecoUrl)
    {
        $dados = file_get_contents("https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q={$enderecoUrl}&limit=1&email=fillipeoa@gmail.com");
        $dados = json_decode($dados);

        $endereco = urldecode($enderecoUrl);
        return response()->json([
            'endereco' => $endereco,
            'latitude' =>  $dados[0]->lat,
            'longitude' => $dados[0]->lon
        ]);
    }
}
?>
