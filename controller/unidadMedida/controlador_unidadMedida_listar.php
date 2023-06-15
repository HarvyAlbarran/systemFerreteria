<?php

    require '../../model/modelo_unidadMedida.php';
    $MU = new Modelo_UnidadMedida();

    $consulta = $MU->Listar_unidadMedida();

    if ($consulta) {
        echo json_encode($consulta);
    }else{
        echo '{
            "sEcho": 1,
            "iTotalRecords": "0",
            "iTotalDisplayRecords": "0",
            "aaData":[]
        }';
    }
?>