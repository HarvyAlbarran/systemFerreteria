<?php

    require '../../model/modelo_producto.php';
    $MP = new Modelo_Producto(); 
    $error="";
    $contador=0;
    $id = htmlspecialchars(strtoupper($_POST['id']),ENT_QUOTES,'UTF-8');
    $producto = htmlspecialchars(strtoupper($_POST['producto']),ENT_QUOTES,'UTF-8');
    $presentacion = htmlspecialchars(strtoupper($_POST['presentacion']),ENT_QUOTES,'UTF-8');
    $categoria = htmlspecialchars(strtoupper($_POST['categoria']),ENT_QUOTES,'UTF-8');
    $unidad = htmlspecialchars(strtoupper($_POST['unidad']),ENT_QUOTES,'UTF-8');
    $precio = htmlspecialchars(strtoupper($_POST['precio']),ENT_QUOTES,'UTF-8');
    $estatus = htmlspecialchars(strtoupper($_POST['estatus']),ENT_QUOTES,'UTF-8');
    
    
    if(!preg_match("/^(?!-+)[a-zA-Z-ñáéíóú\s]*$/",$producto)){
        $contador++;
        $error.= "El producto debe contener solo letras.<br>";
    }

    if(!preg_match("/^[[:digit:]\s]*$/",$categoria)){
        $contador++;
        $error.= "El id de la categoría debe contener solo números.<br>";
    }

    if(!preg_match("/^[[:digit:]\s]*$/",$unidad)){
        $contador++;
        $error.= "El id de la unidad de medida debe contener solo números.<br>";
    }

    if (!preg_match("/^[0-9]*(\.?)[0-9]+$/",$precio)) {
        $contador++;
        $error.= "El precio debe contener solo n&uacute;meros.<br>";
    }

    if($contador>0){
        echo $error;
    }else{
        
        $consulta = $MP->Editar_Producto($id, $producto, $presentacion,$categoria, $unidad, $precio, $estatus);
    
        echo $consulta;
    }

?>