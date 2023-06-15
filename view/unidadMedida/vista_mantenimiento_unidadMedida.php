<div class="row">
    <div class="col-md-12">
        <div class="ibox ibox-default">
            <div class="ibox-head">
                <div class="ibox-title">MANTENIMIENTO UNIDAD DE MEDIDA</div>
                <div class="ibox-tools">
                    <button class="btn" style="background-color: #FF914D;" onclick="AbrirModal()">Nueva Unidad de Medida</button>
                </div>
            </div>
            <div class="ibox-body">
                <table id="tabla_unidadMedida" class="display table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Unidad de Medida</th>
                            <th style="text-align:center">Abreviatura</th>
                            <th style="text-align:center">Fecha Registro</th>
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

<div class="modal fade" id="modal_registro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Registro de Unidad de Medida</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <label for="">Unidad de Medida</label>
            <input type="text" class="form-control" id="txt_unidad"><br>
            <label for="">Abreviatura</label>
            <input type="text" class="form-control" id="txt_abreviatura">
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn" style="background-color: #FF914D;" onclick="Registrar_unidadMedida()">Guardar</button>
        </div>
        </div>
    </div>
</div>


<div class="modal fade" id="modal_editar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar Unidad de Medida</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="col-lg-12">
                <label for="">Unidad de Medida</label>
                <input type="text" id="txt_unidad_actual_editar" hidden>
                <input type="text" class="form-control" id="txt_unidad_nuevo_editar">
                <input type="text" id="txtidunidad" hidden>
            </div>
            <div class="col-lg-12">
                <label for="">Abreviatura</label>
                <input type="text" class="form-control" id="txt_abreviatura_editar">
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
            <button type="button" class="btn" style="background-color: #FF914D;" onclick="Editar_Unidad()">Actualizar</button>
        </div>
        </div>
    </div>
</div>
<script src="../js/console_unidadMedida.js?rev=<?php echo time();?>"></script>
<script>
$(document).ready(function() { 
    $('.js-example-basic-single').select2();
    listar_unidadMedida();
});

$('#modal_registro').on('shown.bs.modal', function() {
    $('#txt_unidad').trigger('focus');
});
</script>