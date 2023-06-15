<?php

    require '../../model/modelo_categoria.php';
    $MC = new Modelo_Categoria();

    $categoria = htmlspecialchars($_POST['categoria'],ENT_QUOTES,'UTF-8');
    $consulta = $MC->Registrar_Categoria($categoria);
    echo $consulta;
    
?>