<?php

    require '../../model/modelo_producto.php';
    $MP = new Modelo_Producto(); 
    $error="";
    $contador=0;
    $producto = htmlspecialchars(strtoupper($_POST['producto']),ENT_QUOTES,'UTF-8');
    $presentacion = htmlspecialchars(strtoupper($_POST['presentacion']),ENT_QUOTES,'UTF-8');
    $categoria = htmlspecialchars(strtoupper($_POST['categoria']),ENT_QUOTES,'UTF-8');
    $unidad = htmlspecialchars(strtoupper($_POST['unidad']),ENT_QUOTES,'UTF-8');
    $precio = htmlspecialchars(strtoupper($_POST['precio']),ENT_QUOTES,'UTF-8');
    $nombrearchivo = htmlspecialchars(strtoupper($_POST['nombrearchivo']),ENT_QUOTES,'UTF-8');
    
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

    if (!preg_match("/^[[:digit:]\s]*$/",$precio)) {
        $contador++;
        $error.= "El precio debe contener solo n&uacute;meros.<br>";
    }

    if($contador>0){
        echo $error;
    }else{
        if (is_array($_FILES) && count($_FILES) > 0) {
            if (move_uploaded_file($_FILES['foto']['tmp_name'], "img/".$nombrearchivo )){
                $ruta ='controller/producto/img/'.$nombrearchivo;
                $consulta = $MP->Registrar_Producto($producto, $presentacion, $categoria, $unidad, $precio, $ruta);
    
                echo $consulta;
    
            }else{
                echo 0;
            }
        }else{
    
            $ruta ='controller/producto/img/producto_default.png';
            $consulta = $MP->Registrar_Producto($producto, $presentacion, $categoria, $unidad, $precio, $ruta);
    
            echo $consulta;
        }
    }

?>