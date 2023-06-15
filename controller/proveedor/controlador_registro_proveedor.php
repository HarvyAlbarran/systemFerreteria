<?php

    require '../../model/modelo_proveedor.php';
    $MP = new Modelo_Proveedor();

    $error="";
    $contador=0;
    $nombre = htmlspecialchars(strtoupper($_POST['nombre']),ENT_QUOTES,'UTF-8');
    $apepat = htmlspecialchars(strtoupper($_POST['apepat']),ENT_QUOTES,'UTF-8');
    $apemat = htmlspecialchars(strtoupper($_POST['apemat']),ENT_QUOTES,'UTF-8');
    $ndocumento = htmlspecialchars(strtoupper($_POST['ndocumento']),ENT_QUOTES,'UTF-8');
    $tdocumento = htmlspecialchars(strtoupper($_POST['tdocumento']),ENT_QUOTES,'UTF-8');
    $sexo = htmlspecialchars(strtoupper($_POST['sexo']),ENT_QUOTES,'UTF-8');
    $telefono = htmlspecialchars(strtoupper($_POST['telefono']),ENT_QUOTES,'UTF-8');
    $razonsocial = htmlspecialchars(strtoupper($_POST['razonsocial']),ENT_QUOTES,'UTF-8');
    $nomcontacto = htmlspecialchars(strtoupper($_POST['nomcontacto']),ENT_QUOTES,'UTF-8');
    $numcontacto = htmlspecialchars(strtoupper($_POST['numcontacto']),ENT_QUOTES,'UTF-8');
    
    if(!preg_match("/^(?!-+)[a-zA-Z-ñáéíóú\s]*$/",$nombre)){
        $contador++;
        $error.= "El nombre debe contener solo letras.<br>";
    }

    if(!preg_match("/^(?!-+)[a-zA-Z-ñáéíóú\s]*$/",$apepat)){
        $contador++;
        $error.= "El apellido paterno debe contener solo letras.<br>";
    }

    if(!preg_match("/^(?!-+)[a-zA-Z-ñáéíóú\s]*$/",$apemat)){
        $contador++;
        $error.= "El apellido materno debe contener solo letras.<br>";
    }

    if (!preg_match("/^[[:digit:]\s]*$/",$ndocumento)) {
        $contador++;
        $error.= "El número del documento debe contener solo números.<br>";
    }

    if (!preg_match("/^[[:digit:]\s]*$/",$telefono)) {
        $contador++;
        $error.= "El número de teléfono debe contener solo números.<br>";
    }

    if(!preg_match("/^(?!-+)[a-zA-Z-ñáéíóú\s]*$/",$nomcontacto)){
        $contador++;
        $error.= "El nombre de contacto debe contener solo letras.<br>";
    }

    if (!preg_match("/^[[:digit:]\s]*$/",$numcontacto)) {
        $contador++;
        $error.= "El número de contacto debe contener solo números.<br>";
    }

    if($contador>0){
        echo $error;
    }else{
       $consulta = $MP->Registrar_Proveedor($nombre,$apepat,$apemat,$ndocumento,$tdocumento,$sexo,$telefono, $razonsocial, $nomcontacto, $numcontacto);
        echo $consulta;
    }

?>