<?php

    require '../../model/modelo_unidadMedida.php';
    $MU = new Modelo_UnidadMedida();

    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $unidadactual = htmlspecialchars($_POST['unidadactual'],ENT_QUOTES,'UTF-8');
    $unidadnueva = htmlspecialchars($_POST['unidadnueva'],ENT_QUOTES,'UTF-8');
    $abreviaturaeditar = htmlspecialchars($_POST['abreviaturaeditar'],ENT_QUOTES,'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
    $consulta = $MU->Modificar_UnidadMedida($id ,$unidadactual,$unidadnueva ,$abreviaturaeditar, $estatus);
    echo $consulta;
    
?>