<script src="../js/console_venta.js?rev=<?php echo time();?>"></script>
<div class="row">
    <div class="col-md-12">
        <div class="ibox ibox-default">
            <div class="ibox-head">
                <div class="ibox-title">MANTENIMIENTO VENTA</div>
                <div class="ibox-tools">
                    <button class="btn" style="background-color: #FF914D;" onclick="cargar_contenido('contenido_principal','venta/vista_venta_registro.php')">Registrar</button>
                </div>
            </div>
            <div class="ibox-body">
                <div class="row">
                    <div class="col-5">
                        <label for=""><b>Fecha Inicio</b></label>
                        <input type="date" id="txt_finicio" class="form-control">
                    </div>  
                    <div class="col-5">
                        <label for=""><b>Fecha Fin</b></label>
                        <input type="date" id="txt_ffin" class="form-control">
                    </div> 
                    <div class="col-2">
                        <label for="">&nbsp;</label><br>
                        <button class="btn btn-success" style="width:100%" onclick="listar_venta()"><i class="fa fa-search"></i>Buscar</button>
                    </div>
                </div><br>
                <table id="tabla_ventas" class="display table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Usuario</th>
                            <th>Cliente</th>
                            <th>Tipo Comprobante</th>
                            <th>Serie Comprobante</th>
                            <th>Nro Comprobante</th>
                            <th>Fecha de registro</th>
                            <th>Total</th>
                            <th>Impuesto</th>
                            <th>Estado</th>
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

<div class="modal fade" id="modal_editar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar categoría</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="col-lg-12">
                <input type="text" id= "txtidcategoria" hidden>
                <label for="">Categoría</label>
                <input type="text" id="txt_categoria_actual_editar" hidden>
                <input type="text" class="form-control" id="txt_categoria_nuevo_editar">
            </div>
            <div class="col-lg-12">
                <label for="">Estado</label>
                <select class="js-example-basic-single" id="cbm_estatus" style="width:100%">
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="INACTIVO">INACTIVO</option>
                </select>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn" style="background-color: #FF914D;" onclick="Editar_Categoria()">Actualizar</button>
        </div>
        </div>
    </div>
</div>

<script>
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
    document.getElementById('txt_finicio').value=anio+"-"+mes+"-"+d;
    document.getElementById('txt_ffin').value=anio+"-"+mes+"-"+d;
    listar_venta();
});

$('#modal_registro').on('shown.bs.modal', function() {
    $('#txt_categoria').trigger('focus');
});
</script>