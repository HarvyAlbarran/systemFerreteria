
<div class="row">
    <div class="col-md-12">
        <div class="ibox ibox-default">
            <div class="ibox-head">
                <div class="ibox-title">MANTENIMIENTO DE CLIENTE</div>
                <div class="ibox-tools">
                    <button class="btn" style="background-color: #FF914D;" onclick="AbrirModal()">Nuevo Registro</button>
                </div>
            </div>
            <div class="ibox-body">
                <table id="tabla_cliente" class="display table-bordered " style="width:100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Persona</th>
                            <th>N&deg; Documento</th>
                            <th style="text-align: center">Tipo Documento</th>
                            <th style="text-align: center">Sexo</th>
                            <th>Teléfono</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal_registro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Registro de Cliente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">  
                    <div class="col-lg-12">
                        <label for="">Nombre</label>
                        <input type="text" class="form-control" id="txtnombre" onkeypress="return sololetras(event)">
                    </div>
                    <div class="col-lg-6">
                        <label for="">Apellido Paterno</label>
                        <input type="text" class="form-control" id="txtapepat" onkeypress="return sololetras(event)">
                    </div>
                    <div class="col-lg-6">
                        <label for="">Apellido Materno</label>
                        <input type="text" class="form-control" id="txtapemat" onkeypress="return sololetras(event)">
                    </div>
                    <div class="col-lg-6">
                        <label for="">Nro. de documento</label>
                        <input type="text" class="form-control" id="txtnro" onkeypress="return soloNumeros(event)">
                    </div>
                    <div class="col-lg-6">
                    <label for="">Tipo de documento</label>
                        <select class="js-example-basic-single" id="cbm_tdocumento" style="width:100%">
                            <option value="DNI">DNI</option>
                            <option value="RUC">RUC</option>
                            <option value="PASAPORTE">PASAPORTE</option>
                        </select>
                    </div>
                    <div class="col-lg-6">
                    <label for="">Sexo</label>
                        <select class="js-example-basic-single" id="cbm_sexo" style="width:100%">
                            <option value="MASCULINO">MASCULINO</option>
                            <option value="FEMENINO">FEMENINO</option>
                        </select>
                    </div>
                    <div class="col-lg-6">
                        <label for="">Nro. de telefono</label>
                        <input type="text" class="form-control" id="txttelefono" onkeypress="return soloNumeros(event)">
                    </div>
                    <div class="col-lg-12"><br>
                        <div class="alert alert-danger alert-bordered" id="div_error" style="display:none">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn" style="background-color: #FF914D;" onclick="Registrar_Cliente()">Guardar</button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="modal_editar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Persona</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div class="modal-body">
                    <div class="row">  
                        <div class="col-lg-12">
                            <input type="text" id="txtidpersona" hidden>
                            <label for="">Nombre</label>
                            <input type="text" class="form-control" id="txtnombre_editar" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-lg-6">
                            <label for="">Apellido Paterno</label>
                            <input type="text" class="form-control" id="txtapepat_editar" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-lg-6">
                            <label for="">Apellido Materno</label>
                            <input type="text" class="form-control" id="txtapemat_editar" onkeypress="return sololetras(event)">
                        </div>
                        <div class="col-lg-6">
                            <label for="">Nro. de documento</label>
                            <input type="text" id="txtnro_editar_actual" onkeypress="return soloNumeros(event)" hidden>
                            <input type="text" class="form-control" id="txtnro_editar_nuevo" onkeypress="return soloNumeros(event)">
                        </div>
                        <div class="col-lg-6">
                        <label for="">Tipo de documento</label>
                            <select class="js-example-basic-single" id="cbm_tdocumento_editar" style="width:100%">
                                <option value="DNI">DNI</option>
                                <option value="RUC">RUC</option>
                                <option value="PASAPORTE">PASAPORTE</option>
                            </select>
                        </div>
                        <div class="col-lg-4">
                        <label for="">Sexo</label>
                            <select class="js-example-basic-single" id="cbm_sexo_editar" style="width:100%">
                                <option value="MASCULINO">MASCULINO</option>
                                <option value="FEMENINO">FEMENINO</option>
                            </select>
                        </div>
                        <div class="col-lg-4">
                            <label for="">Nro. de telefono</label>
                            <input type="text" class="form-control" id="txttelefono_editar" onkeypress="return soloNumeros(event)">
                        </div>
                        <div class="col-lg-4">
                        <label for="">Estatus</label>
                            <select class="js-example-basic-single" id="cbm_estatus" style="width:100%">
                                <option value="ACTIVO">ACTIVO</option>
                                <option value="INACTIVO">INACTIVO</option>
                            </select>
                        </div>
                        <div class="col-lg-12"><br>
                            <div class="alert alert-danger alert-bordered" id="div_error_editar" style="display:none">
                            </div>
                        </div>
                    </div>
                    </div>   
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn" style="background-color: #FF914D;" onclick="Editar_Persona()">Actualizar</button>
                </div>   
        </div>
    </div>
</div>
<script src="../js/console_cliente.js"></script>
<script>
$(document).ready(function() {
    $(' .js-example-basic-single').select2();
    listar_cliente();
});

$('#modal_registro').on('shown.bs.modal', function() {
    $('#txt_nombre').trigger('focus');
})
</script>