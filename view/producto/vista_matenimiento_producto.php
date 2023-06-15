<div class="row">
    <div class="col-md-12">
        <div class="ibox ibox-default">
            <div class="ibox-head">
                <div class="ibox-title">MANTENIMIENTO DE PRODUCTOS</div>
                <div class="ibox-tools">
                    <button class="btn" style="background-color: #FF914D;" onclick="AbrirModal()">Nuevo Producto</button>
                </div>
            </div>
            <div class="ibox-body">
                <table id="tabla_producto" class="display table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Producto</th>
                            <th>Presentación</th>
                            <th style="text-align:center">Categoría</th>
                            <th style="text-align:center">U. Medida</th>
                            <th style="text-align:center">Stock</th>
                            <th style="text-align:center">Precio</th>
                            <th style="text-align:center">Foto</th>
                            <th style="text-align:center">Estado</th>
                            <th style="text-align:center">Acciones</th>
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
            <h5 class="modal-title" id="exampleModalLabel">Registro de Producto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form method="POST" action="#" enctype="multipart/form-data" onsubmit="return false">
                <div class="row">
                    <div class="col-lg-6">
                        <label for="">Producto</label>
                        <input type="text" class="form-control" id="txt_producto_registro"><br>
                    </div>
                    <div class="col-lg-6">
                        <label for="">Presentación</label>
                        <input type="text" class="form-control" id="txt_presentacion_registro"><br>
                    </div> 
                    <div class="col-lg-4">
                        <label for="">Categoría</label>
                        <select class="js-example-basic-single" id="cbm_categoria_registro" style="width:100%">
                        </select><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Unidad de Medida</label>
                        <select class="js-example-basic-single" id="cbm_unidad_registro" style="width:100%">
                        </select><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Precio Venta</label>
                        <input type="text" class="form-control" id="txt_precio_registro"><br>
                    </div> 
                    <div class="col-lg-12">
                        <label for="">Foto del Producto</label>
                        <input type="file" class="form-control" id="txt_foto_producto" accept="image/*"><br>
                    </div> 
                    <div class="col-lg-12"><br>
                        <div class="alert alert-danger alert-bordered" style="display:none" id="div_error"></div>
                    </div>
                </div>
            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn" style="background-color: #FF914D;" onclick="Registrar_Producto()">Guardar</button>
        </div>
        </div>
    </div>
</div>


<div class="modal fade" id="modal_editar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Producto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form method="POST" action="#" enctype="multipart/form-data" onsubmit="return false"> 
                    <div class="row">
                        <div class="col-lg-6">
                            <label for="">Producto</label>
                            <input type="text" id="txt_producto_id" hidden>
                            <input type="text" class="form-control" id="txt_producto_nuevo_editar"><br>
                        </div>
                        <div class="col-lg-6">
                            <label for="">Presentación</label>
                            <input type="text" class="form-control" id="txt_presentacion_editar"><br>
                        </div> 
                        <div class="col-lg-6">
                            <label for="">Categoría</label>
                            <select class="js-example-basic-single" id="cbm_categoria_editar" style="width:100%">
                            </select><br>
                        </div>
                        <div class="col-lg-6">
                            <label for="">Unidad de Medida</label>
                            <select class="js-example-basic-single" id="cbm_unidad_editar" style="width:100%">
                            </select><br>
                        </div>
                        <div class="col-lg-6">
                            <label for="">Precio Venta</label>
                            <input type="text" class="form-control" id="txt_precio_editar"><br>
                        </div>
                        <div class="col-lg-6">
                            <label for="">Estatus</label>
                                <select class="js-example-basic-single" id="cbm_estatus" style="width:100%">
                                    <option value="ACTIVO">ACTIVO</option>
                                    <option value="INACTIVO">INACTIVO</option>
                                </select>
                        </div>  
                        <div class="col-lg-9">
                            <label for="">Subir</label>
                            <input type="file" class="form-control" id="txt_foto_producto_editar" accept="image/*"><br>
                        </div> 
                        <div class="col-lg-3" style="text-align: center;">
                            <label for="">&nbsp;</label><br>
                            <button class="btn btn-success" onclick="Editar_Foto_Producto()">Actualizar</button>
                        </div>
                        <div class="col-lg-12"><br>
                            <div class="alert alert-danger alert-bordered" style="display:none" id="div_error_editar"></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn" style="background-color: #FF914D;" onclick="Editar_Producto()">Guardar</button>
            </div>
        </div>    
    </div>
</div>
<script src="../js/console_producto.js?rev=<?php echo time();?>"></script>
<script>
$(document).ready(function() { 
    $('.js-example-basic-single').select2();
    listar_producto();
    categoria_combo();
    unidad_combo();
});

$('#modal_registro').on('shown.bs.modal', function() {
    $('#txt_producto_registro').trigger('focus');
});

document.getElementById("txt_foto_producto").addEventListener("change", () => {
    var fileName = document.getElementById("txt_foto_producto").value; 
    var idxDot = fileName.lastIndexOf(".") + 1; 
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase(); 
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){ 
      //TO DO 
    }else{ 
        Swal.fire("Mensaje de advertencia", "SOLO SE ACEPTAN IMÁGENES - USTED SUBIÓ UN ARCHIVO CON EXTENSIÓN "+extFile, "warning"); 
        document.getElementById("txt_foto_producto").value="";
    } 
});

</script>