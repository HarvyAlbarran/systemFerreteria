<?php 
    session_start();

    if (!isset($_SESSION['S_IDUSUARIO'])) {
        header('Location: login.php');
    }
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width initial-scale=1.0">
    <title>Ferretería JHAYLI</title>
    <!-- GLOBAL MAINLY STYLES-->
    <link href="plantilla/assets/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="plantilla/assets/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="plantilla/assets/vendors/themify-icons/css/themify-icons.css" rel="stylesheet" />
    <!-- PLUGINS STYLES-->
    <link href="plantilla/assets/vendors/jvectormap/jquery-jvectormap-2.0.3.css" rel="stylesheet" />
    <!-- THEME STYLES-->
    <link href="plantilla/assets/css/main.min.css" rel="stylesheet" />

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.11.3/b-2.0.1/b-html5-2.0.1/r-2.2.9/sl-1.3.3/datatables.min.css"/>

    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

    <link href="plantilla/assets/css/estilo.css" rel="stylesheet" />

    <!-- PAGE LEVEL STYLES-->
</head>

<body class="fixed-navbar">
    <div class="page-wrapper">
        <!-- START HEADER-->
        <header class="header">
            <div class="page-brand" style="background: #323b44";>
                <a class="link" href="index.php">
                    <center><img src="plantilla/assets/img/logo.png" / width="70%"></center>
                    
                </a>
            </div>
            <div class="flexbox flex-1" style="background: linear-gradient(70deg, white , #323b44);">
                <!-- START TOP-LEFT TOOLBAR-->
                <ul class="nav navbar-toolbar">
                    <li>
                        <a class="nav-link sidebar-toggler js-sidebar-toggler"><i class="ti-menu"></i></a>
                    </li>
                
                </ul>
                <!-- END TOP-LEFT TOOLBAR-->
                <!-- START TOP-RIGHT TOOLBAR-->
                <ul class="nav navbar-toolbar">
                    <li class="dropdown dropdown-user">
                        <a class="nav-link dropdown-toggle link" style="color: white;" data-toggle="dropdown">
                            <br><img src="plantilla/assets/img/admin.png" width="100px"/></br>
                            <span></span><div class="font-strong"><label for="" id="usu_sidebar"></div><i class="fa fa-angle-down m-l-5"></i></a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" onclick="cargar_contenido('contenido_principal','usuario/vista_profile.php')"><i class="fa fa-user"></i>Perfil</a>
                            <li class="dropdown-divider"></li>
                            <a class="dropdown-item" href="../controller/usuario/controlador_cerrar_session.php"><i class="fa fa-power-off"></i>Salir</a>
                        </ul>
                    </li>
                </ul>
                <!-- END TOP-RIGHT TOOLBAR-->
            </div>
        </header>
        <!-- END HEADER-->
        <!-- START SIDEBAR-->
        <nav class="page-sidebar" id="sidebar" style="background: #323b44;">
            <div id="sidebar-collapse" >
                <div class="admin-block d-flex">
                    <div>
                        <img src="plantilla/assets/img/admin.png" width="60px" />
                    </div>
                    <div class="admin-info">
                        <div class="font-strong"><br></div><label id="rol_sidebar"></small></div>
                </div>
                <ul class="side-menu metismenu" >
                    <li>
                        <a class="link" href="index.php"><i class="sidebar-item-icon fa fa-th-large"></i>
                            <span class="nav-label">Inicio</span>
                        </a>
                    </li>
                    <?php if ($_SESSION['S_ROL']=='1'){ ?>
                    <li class="heading">MENÚ ADMINISTRADOR</li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','rol/vista_mantenimiento_rol.php')"><i class="sidebar-item-icon ti-comment-alt"></i>
                            <span class="nav-label">Rol</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','persona/vista_mantenimiento_persona.php')"><i class="sidebar-item-icon ti-id-badge"></i>
                            <span class="nav-label">Persona</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','cliente/vista_mantenimiento_cliente.php')"><i class="sidebar-item-icon ti-id-badge"></i>
                            <span class="nav-label">Cliente</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','proveedor/vista_mantenimiento_proveedor.php')"><i class="sidebar-item-icon ti-id-badge"></i>
                            <span class="nav-label">Proveedor</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','usuario/vista_mantenimiento_usuario.php')"><i class="sidebar-item-icon fa fa-users"></i>
                            <span class="nav-label">Usuario</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','categoria/vista_mantenimiento_categoria.php')"><i class="sidebar-item-icon fa fa-cubes"></i>
                            <span class="nav-label">Categoría</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','unidadMedida/vista_mantenimiento_unidadMedida.php')"><i class="sidebar-item-icon fa fa-list-ol"></i>
                            <span class="nav-label">Unidad de Medida</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','producto/vista_matenimiento_producto.php')"><i class="sidebar-item-icon fa fa-dropbox"></i>
                            <span class="nav-label">Productos</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','ingreso/vista_matenimiento_ingreso.php')"><i class="sidebar-item-icon fa fa-dropbox"></i>
                            <span class="nav-label">Ingresos</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','venta/vista_matenimiento_venta.php')"><i class="sidebar-item-icon fa fa-dropbox"></i>
                            <span class="nav-label">Ventas</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <?php } ?>
                    <?php if ($_SESSION['S_ROL']=='4'){ ?>
                    <li class="heading">MENÚ JEFE ALMACÉN</li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','proveedor/vista_mantenimiento_proveedor.php')"><i class="sidebar-item-icon ti-id-badge"></i>
                            <span class="nav-label">Proveedor</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','categoria/vista_mantenimiento_categoria.php')"><i class="sidebar-item-icon fa fa-cubes"></i>
                            <span class="nav-label">Categoría</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','unidadMedida/vista_mantenimiento_unidadMedida.php')"><i class="sidebar-item-icon fa fa-list-ol"></i>
                            <span class="nav-label">Unidad de Medida</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','producto/vista_matenimiento_producto.php')"><i class="sidebar-item-icon fa fa-dropbox"></i>
                            <span class="nav-label">Productos</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','ingreso/vista_matenimiento_ingreso.php')"><i class="sidebar-item-icon fa fa-dropbox"></i>
                            <span class="nav-label">Ingresos</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <?php } ?>
                    <?php if ($_SESSION['S_ROL']=='5'){ ?>
                    <li class="heading">MENÚ VENDEDOR</li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','cliente/vista_mantenimiento_cliente.php')"><i class="sidebar-item-icon ti-id-badge"></i>
                            <span class="nav-label">Cliente</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>
                    <li>
                        <a href="javascript:cargar_contenido('contenido_principal','venta/vista_matenimiento_venta.php')"><i class="sidebar-item-icon fa fa-dropbox"></i>
                            <span class="nav-label">Ventas</span><i class="fa fa-angle-left arrow"></i></a>
                    </li>   
                    <?php } ?>
                </ul>
            </div>
        </nav>
        <!-- END SIDEBAR-->
        <div class="content-wrapper">
            <input type="text" value="<?php echo $_SESSION['S_IDUSUARIO'];?>" id="txt_codigo_principal" hidden>
            <!-- START PAGE CONTENT-->
            <div class="page-content fade-in-up">
                <div id="contenido_principal">
                    <div class="row">
                        <div class="col-5">
                            <label for=""><b>Fecha Inicio</b></label>
                            <input type="date" id="txt_finicio_d" class="form-control"><br>
                        </div>  
                        <div class="col-5">
                            <label for=""><b>Fecha Fin</b></label>
                            <input type="date" id="txt_ffin_d" class="form-control"><br>
                        </div> 
                        <div class="col-2">
                            <label for="">&nbsp;</label><br>
                            <button class="btn btn-success" style="width:100%" onclick="TraerWidgets()"><i class="fa fa-search"></i>Buscar</button><br>
                        </div>
                    </div>
                    <div class="row" id="div_widget"></div>    
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="ibox">
                                <canvas id="myChartVentaTop5"></canvas>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="ibox">
                                <canvas id="myChartIngresoTop5"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END PAGE CONTENT-->
            <footer class="page-footer">
                <div class="font-13">2021 © <b>Grupo 6</b> - Todos los derechos reservados</div>
            </footer>
        </div>
    </div>
    
    <!-- BEGIN PAGA BACKDROPS-->
    <div class="sidenav-backdrop backdrop"></div>
    <div class="preloader-backdrop">
        <div class="page-preloader">Cargando</div>
    </div>
    <!-- END PAGA BACKDROPS-->
    <!-- CORE PLUGINS-->
    <script src="plantilla/assets/vendors/jquery/dist/jquery.min.js" type="text/javascript"></script>
    <script src="plantilla/assets/vendors/popper.js/dist/umd/popper.min.js" type="text/javascript"></script>
    <script src="plantilla/assets/vendors/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="plantilla/assets/vendors/metisMenu/dist/metisMenu.min.js" type="text/javascript"></script>
    <script src="plantilla/assets/vendors/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
    <!-- PAGE LEVEL PLUGINS-->
    <script src="plantilla/assets/vendors/chart.js/dist/Chart.min.js" type="text/javascript"></script>
    <script src="plantilla/assets/vendors/jvectormap/jquery-jvectormap-2.0.3.min.js" type="text/javascript"></script>
    <script src="plantilla/assets/vendors/jvectormap/jquery-jvectormap-world-mill-en.js" type="text/javascript"></script>
    <script src="plantilla/assets/vendors/jvectormap/jquery-jvectormap-us-aea-en.js" type="text/javascript"></script>
    <!-- CORE SCRIPTS-->
    <script src="plantilla/assets/js/app.min.js" type="text/javascript"></script>

    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.11.3/b-2.0.1/b-html5-2.0.1/r-2.2.9/sl-1.3.3/datatables.min.js"></script>

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    
    <script src="../js/console_usuario.js"></script>
    <script src="../js/console_usuario.js?rev=<?php echo time();?>"></script>
    <!-- PAGE LEVEL SCRIPTS-->
    <script>
        TraerDatosUsuario();
        function cargar_contenido(contenedor, contenido){
            $("#"+contenedor).load(contenido);
        }

        var idioma_espanol = {
			select: {
			rows: "%d fila seleccionada"
			},
			"sProcessing":     "Procesando...",
			"sLengthMenu":     "Mostrar _MENU_ registros",
			"sZeroRecords":    "No se encontraron resultados",
			"sEmptyTable":     "Ning&uacute;n dato disponible en esta tabla",
			"sInfo":           "Registros del (_START_ al _END_) total de _TOTAL_ registros",
			"sInfoEmpty":      "Registros del (0 al 0) total de 0 registros",
			"sInfoFiltered":   "(filtrado de un total de MAX registros)",
			"sInfoPostFix":    "",
			"sSearch":         "Buscar:",
			"sUrl":            "",
			"sInfoThousands":  ",",
			"sLoadingRecords": "<b>No se encontraron datos</b>",
			"oPaginate": {
					"sFirst":    "Primero",
					"sLast":     "Último",
					"sNext":     "Siguiente",
					"sPrevious": "Anterior"
			},
			"oAria": {
					"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
					"sSortDescending": ": Activar para ordenar la columna de manera descendente"
			}
        }

        function sololetras(e) {
                key=e.keyCode || e.which;
        
                teclado=String.fromCharCode(key).toLowerCase();
        
                letras="qwertyuiopasdfghjklñzxcvbnm ";
        
                especiales="8-37-38-46-164";
        
                teclado_especial=false;
        
                for(var i in especiales){
                    if(key==especiales[i]){
                        teclado_especial=true;
                        break;
                    }
                }
        
                if(letras.indexOf(teclado)==-1 && !teclado_especial){
                    return false;
                }
        }


        function soloNumeros(e){
            tecla = (document.all) ? e.keyCode : e.which;
            if (tecla==8){
                return true;
            }
            // Patron de entrada, en este caso solo acepta numeros
            patron =/[0-9]/;
            tecla_final = String.fromCharCode(tecla);
            return patron.test(tecla_final);
        }

        function filterFloat(evt,input){
            var key = window.Event ? evt.which : evt.keyCode;
            var chark = String.fromCharCode(key);
            var tempValue = input.value+chark;
            if(key >= 48 && key <=57){
                if(filter(tempValue) === false){
                    return false;
                }else{
                    return true;
                }
            }else{
                if(key == 8 || key == 13 || key == 0){
                    return true;
                }else if(key == 46){
                    if(filter(tempValue) === false){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }
            }
        }

        function filter(__val__){
            var preg = /^([0-9]+\.?[0-9]{0,2})$/;
            if(preg.test(__val__) === true){
                return true;
            }else{
                return false;
            }
        }
        $(document).ready(function() { 
            $('.js-example-basic-single').select2();
            var f = new Date();
            var anio = f.getFullYear();
            var mes = f.getMonth()+1;
            var d = f.getDate();
            if(d<10){
                d='0'+d;
            }
            if(mes<10){
                mes='0'+mes;
            }
            document.getElementById('txt_finicio_d').value=anio+"-"+mes+"-"+d;
            document.getElementById('txt_ffin_d').value=anio+"-"+mes+"-"+d;
            TraerWidgets();
        });
        
    </script>
</body>

</html>