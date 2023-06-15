<?php

    require '../../model/modelo_venta.php';
    $MV = new Modelo_Venta();

    $idventa = htmlspecialchars($_POST['idventa'],ENT_QUOTES,'UTF-8');
    $consulta = $MV->Anular_Venta($idventa);
    echo $consulta;
    
?>