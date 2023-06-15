<?php

    require '../../model/modelo_proveedor.php';
    $MP = new Modelo_Proveedor();
    
    $idproveedor = htmlspecialchars(strtoupper($_POST['idproveedor']),ENT_QUOTES,'UTF-8');
    $razonsocial = htmlspecialchars(strtoupper($_POST['razonsocial']),ENT_QUOTES,'UTF-8');
    $nomcontacto = htmlspecialchars(strtoupper($_POST['nomcontacto']),ENT_QUOTES,'UTF-8');
    $numcontacto = htmlspecialchars(strtoupper($_POST['numcontacto']),ENT_QUOTES,'UTF-8');
    
    $consulta = $MP->Modificar_Proveedor($idproveedor,$razonsocial, $nomcontacto,$numcontacto);

    echo $consulta;

?>