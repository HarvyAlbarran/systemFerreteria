<div class="row">
    <div class="col-lg-3 col-md-4">
        <div class="ibox">
            <div class="ibox-body text-center">
                <form method="POST" action="#" enctype="multipart/form-data" onsubmit="return false">
                    <div class="m-t-20">
                        <img class="img-circle" id="txt_imagen_profile" width="140px" height="140px"/>
                    </div>
                    <h5 class="font-strong m-b-10 m-t-10" id="txt_persona_profile"></h5>
                    <div class="m-b-20 text-muted" id="txt_rol_profile" class="form-control"></div>
                    <div class="profile-social m-b-20">
                        <input type="file" name="" id="imagen_profile" accept="image/*" class="form-control-file">
                    </div>
                    <div>
                        <button class="btn btn-info btn-rounded m-b-10" onclick="Editar_Foto_Profile()"><i class="fa fa-refresh"></i>Actualizar</button>
                    </div>
                </form>    
            </div>
        </div>
    </div>
    <div class="col-lg-9 col-md-8">
        <div class="ibox">
            <div class="ibox-body">
                <ul class="nav nav-tabs tabs-line">
                    <li class="nav-item">
                        <a class="nav-link active" href="#tab-2" data-toggle="tab"><i class="ti-settings"></i>Datos Personales</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#tab-3" data-toggle="tab"><i class="ti-announcement"></i> Contrase&ntilde;a</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="tab-2">
                        <div class="row">
                            <div class="col-lg-12">
                                <label for="">Nombres</label>
                                <input type="text" id="txt_nombre_profile" class="form-control">
                            </div>
                            <div class="col-lg-6">
                                <label for="">Apellido Paterno</label>
                                <input type="text" id="txt_apepat_profile" class="form-control">
                            </div>
                            <div class="col-lg-6">
                                <label for="">Apellido Materno</label>
                                <input type="text" id="txt_apemat_profile" class="form-control">
                            </div>
                            <div class="col-lg-6">
                                <label for="">N&uacute;mero de Documento</label>
                                <input type="text" id="txt_nrodocumento_profile" class="form-control">
                            </div>
                            <div class="col-lg-6">
                                <label for="">Tipo de documento</label>
                                <select class="js-example-basic-single" id="cbm_tdocumento_profile" style="width:100%">
                                    <option value="DNI">DNI</option>
                                    <option value="RUC">RUC</option>
                                    <option value="PASAPORTE">PASAPORTE</option>
                                </select>
                            </div>
                            <div class="col-lg-6">
                                <label for="">Sexo</label>
                                <select class="js-example-basic-single" id="cbm_sexo_profile" style="width:100%">
                                    <option value="MASCULINO">MASCULINO</option>
                                    <option value="FEMENINO">FEMENINO</option>
                                </select>
                            </div>
                            <div class="col-lg-6">
                                <label for="">Nro. de telefono</label>
                                <input type="text" class="form-control" id="txt_telefono_profile" onkeypress="return soloNumeros(event)">
                            </div>
                            <div class="col-lg-12"><br>
                                <div class="alert alert-danger alert-bordered" id="div_error_profile" style="display:none"></div>
                            </div>
                            <div class="col-lg-12" style="text-align:center;"><br>
                                <button class="btn btn-success" onclick="Datos_Actualizar()">Actualizar datos</button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab-3">
                        <div class="row">
                            <div class="col-lg-12">
                                <label for="">Contrase&ntilde;a actual</label>
                                    <input type="password" id="txt_conactualescrita_profile" class="form-control" >
                                    <input type="text" id="txt_conactual_profile" hidden>
                            </div>
                            <div class="col-lg-6">
                                <label for="">Nueva Contrase&ntilde;a</label>
                                <input type="password" id="txt_connueva_profile" class="form-control" >
                            </div>
                            <div class="col-lg-6">
                                <label for="">Repetir Nueva Contrase&ntilde;a </label>
                                    <input type="password" id="txt_conrepetir_profile" class="form-control" >
                            </div>
                            <div class="col-lg-12" style="text-align:center;"><br>
                                <button class="btn btn-success" onclick="Actualizar_Contra()">Actualizar Contrase&ntilde;a</button>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    </div>
</div>

<script src="../js/console_usuario.js?rev=<?php echo time();?>"></script>

<script>
    TraerDatosPerfil();
    $(document).ready(function() {
        $(' .js-example-basic-single').select2();
    });

    document.getElementById("imagen_profile").addEventListener("change", () => {
    var fileName = document.getElementById("imagen_profile").value; 
    var idxDot = fileName.lastIndexOf(".") + 1; 
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase(); 
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){ 
      //TO DO 
    }else{ 
        Swal.fire("Mensaje de advertencia", "SOLO SE ACEPTAN IMÁGENES - USTED SUBIÓ UN ARCHIVO CON EXTENSIÓN "+extFile, "warning"); 
        document.getElementById("imagen_profile").value="";
    } 
});
</script>

