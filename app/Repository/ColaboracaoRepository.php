<?php

namespace App\Repository;

    class ColaboracaoRepository extends AbstractRepository
    {
        public function selectIdUsuario($id)
        {
                $this->model = $this->model->where('idUsuario', '=', $id);
        }
    }

?>
