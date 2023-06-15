<?php 
    session_start();

    if (isset($_SESSION['S_IDUSUARIO'])) {
        header('Location: index.php');
    }
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width initial-scale=1.0">
    <title>SIS JHAYLI</title>
    <!-- GLOBAL MAINLY STYLES-->
    <link href="plantilla/assets/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="plantilla/assets/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="plantilla/assets/vendors/themify-icons/css/themify-icons.css" rel="stylesheet" />
    <!-- THEME STYLES-->
    <link href="plantilla/assets/css/main.css" rel="stylesheet" />
    <!-- PAGE LEVEL STYLES-->
    <link href="plantilla/assets/css/pages/auth-light.css" rel="stylesheet" />
</head>

<body style="background: #323B44;">
    <div class="content"> 
    <center><a href="https://ferreteriajhayli.com/"><br><img src="plantilla/assets/img/login.png" ></a></center>
        <form id="login-form" action="javascript:;" method="post" class="mt-5" style="background-color: #FFF;">
            <h2 class="login-title" style="font-family:Fantasy;color:#323b44" >BIENVENIDO</h2>
            <div class="form-group">
                <div class="input-group-icon right">
                    <div class="input-icon"><i class="fa fa-users"></i></div>
                    <input class="form-control " type="text" name="email" placeholder="Ingresar usuario" autocomplete="off" id="usuario">
                </div>
            </div>
            <div class="form-group">
                <div class="input-group-icon right">
                    <div class="input-icon"><i class="fa fa-lock font-16"></i></div>
                    <input class="form-control" type="password" name="password" placeholder="Ingresar contraseña" id="password">
                </div>
            </div>
            
            <div class="form-group">
                <button class="btn btn-block" style="background-color: #323b44;"  onclick="verificar_Usuario()"><a style="font-family:Fantasy;color:white">INICIAR SESIÓN</a></button>
            </div>

        </form>
    </div>
    <!-- BEGIN PAGA BACKDROPS-->
    <div class="sidenav-backdrop backdrop"></div>
    <div class="preloader-backdrop">
        <div class="page-preloader">Cargando</div>
    </div>
    <!-- END PAGA BACKDROPS-->
    <!-- CORE PLUGINS -->
    <script src="plantilla/assets/vendors/jquery/dist/jquery.min.js" type="text/javascript"></script>
    <script src="plantilla/assets/vendors/popper.js/dist/umd/popper.min.js" type="text/javascript"></script>
    <script src="plantilla/assets/vendors/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
    <!-- PAGE LEVEL PLUGINS -->
    <script src="plantilla/assets/vendors/jquery-validation/dist/jquery.validate.min.js" type="text/javascript"></script>
    <!-- CORE SCRIPTS-->
    <script src="plantilla/assets/js/app.js" type="text/javascript"></script>
    <script src="../js/console_usuario.js" type="text/javascript"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- PAGE LEVEL SCRIPTS-->
    <script type="text/javascript">
    </script>
</body>

</html>