<script src="../js/console_ingreso.js?rev=<?php echo time();?>"></script>
<div class="row">
    <div class="col-md-12">
        <div class="ibox ibox-default">
            <div class="ibox-head">
                <div class="ibox-title">REGISTRO DE INGRESOS</div>
                <div class="ibox-tools">
                </div>
            </div>
            <div class="ibox-body">
                <div class="row">
                    <div class="col-8">
                        <label for="">Proveedor</label>
                        <select class="js-example-basic-single" id="cbm_proveedor" style="width:100%">
                        </select>
                    </div>
                    <div class="col-4">
                        <label for="">Impuesto (18% - 0.18) (*):</label>
                        <input type="text" class="form-control" id="txt_impuesto" disabled>
                    </div>
                    <div class="col-4">
                        <label for="">Tipo de comprobante</label>
                        <select class="js-example-basic-single" id="cbm_tipo" style="width:100%">
                            <option value="BOLETA">BOLETA</option>
                            <option value="FACTURA">FACTURA</option>
                            <option value="TICKET">TICKET</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <label for="">Serie de comprobante</label>
                        <input type="text" class="form-control" id="txt_serie">
                    </div>
                    <div class="col-4">
                        <label for="">N&uacute;mero de comprobante</label>
                        <input type="text" class="form-control" id="txt_numero">
                    </div>
                    <div class="col-4">
                        <label for="">Producto</label>
                        <select class="js-example-basic-single" id="cbm_producto" style="width:100%">
                        </select>
                    </div>
                    <div class="col-3">
                        <label for="">Precio</label>
                        <input type="number" onkeypress="return filterFloat(event, this);" min="1" class="form-control" id="txt_precio">
                    </div>
                    <div class="col-3">
                        <label for="">Cantidad</label>
                        <input type="number" onkeypress="return event.charCode >= 48" min="1" class="form-control" id="txt_cantidad">
                    </div>
                    <div class="col-2">
                        <label for="">&nbsp;</label><br>
                        <button class="btn btn-success" onclick="Agregar_Producto_Detalle_Ingreso()"><i class="fa fa-plus"></i>&nbsp;Agregar</button>
                    </div>
                    <div class="col-12" style="text-align:center"><br>
                        <h5 for=""><b>DETALLE DE INGRESO</b></h5>
                    </div>
                    <div class="col-12 table-responsive"><br>
                        <table id="detalle_ingreso" class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>PRODUCTO</th>
                                    <th>PRECIO</th>
                                    <th>CANTIDAD</th>
                                    <th>SUB TOTAL</th>
                                    <th>ACCI&Oacute;N</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_detalle_ingreso">
                            </tbody>
                        </table>
                    </div>
                    <div class="col-12" style="text-align:right">
                        <h6 for="" id="lbl_subtotal"></h6>
                    </div>
                    <div class="col-12" style="text-align:right">
                        <h6 for="" id="lbl_impuesto"></h6>
                    </div>
                    <div class="col-12" style="text-align:right">
                        <h6 for="" id="lbl_totalneto"></h6>
                    </div>
                    <div class="col-12" style="text-align:center">
                        <button class="btn btn-primary btn-lg" onclick="Registrar_Ingreso()">Registrar Ingreso</button>
                    </div>
                </div><br>    
            </div>
        </div>
    </div>
</div>

<script>
$(document).ready(function() { 
    $('.js-example-basic-single').select2();
    proveedor_combo();
    producto_combo();
});

$('#cbm_tipo').on('select2:select', function(e){
    var tipo = document.getElementById('cbm_tipo').value;
    if(tipo=="FACTURA"){
        document.getElementById('txt_impuesto').disabled=false;
    }else{
        document.getElementById('txt_impuesto').disabled=true;
    }
});
</script>