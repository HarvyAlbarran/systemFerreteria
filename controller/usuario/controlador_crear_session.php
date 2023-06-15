<?php
    $IDUSUARIO = $_POST['idusuario'];
    $USUARIO = $_POST['usuario'];
    $ROL = $_POST['rol'];
    
    session_start();
    $_SESSION['S_IDUSUARIO'] = $IDUSUARIO;
    $_SESSION['S_USUARIO'] = $USUARIO;
    $_SESSION['S_ROL'] = $ROL;

?>