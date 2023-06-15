<div class="row">
    <div class="col-md-12">
        <div class="ibox ibox-default">
            <div class="ibox-head">
                <div class="ibox-title">MANTENIMIENTO ROL</div>
                <div class="ibox-tools">
                    <button class="btn" style="background-color: #FF914D;" onclick="AbrirModal()">Nuevo Rol</button>
                </div>
            </div>
            <div class="ibox-body">
                <table id="tabla_rol" class="display table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Rol</th>
                            <th>Fecha Registro</th>
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
            <h5 class="modal-title" id="exampleModalLabel">Registro de rol</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <label for="">Rol</label>
            <input type="text" class="form-control" id="txt_rol">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn" style="background-color: #FF914D;" onclick="Registrar_rol()">Guardar</button>
        </div>
        </div>
    </div>
</div>


<div class="modal fade" id="modal_editar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar rol</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="col-lg-12">
                <input type="text" id= "txtidrol" hidden>
                <label for="">Rol</label>
                <input type="text" id="txt_rol_actual_editar" hidden>
                <input type="text" class="form-control" id="txt_rol_nuevo_editar">
            </div>
            <div class="col-lg-12">
                <label for="">Estatus</label>
                <select class="js-example-basic-single" id="cbm_estatus" style="width:100%">
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="INACTIVO">INACTIVO</option>
                </select>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn" style="background-color: #FF914D;" onclick="Editar_Rol()">Actualizar</button>
        </div>
        </div>
    </div>
</div>
<script src="../js/console_rol.js"></script>
<script>
$(document).ready(function() {  
    Listar_Rol();
});

$('#modal_registro').on('shown.bs.modal', function() {
    $('#txt_rol').trigger('focus');
});
</script>