var t_ingreso;
function listar_ingreso(){
    var finicio = document.getElementById('txt_finicio').value;
    var ffin = document.getElementById('txt_ffin').value;
    t_ingreso = $("#tabla_ingreso").DataTable({
		"ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
    	"autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controller/ingreso/controlador_ingreso_listar.php",
            data:{
                finicio:finicio,
                ffin:ffin
            }
        },
        "columns":[
            {"defaultContent":""},
            {'data':"usuario_nombre"},
            {'data':"proveedor"},
            {'data':"ingreso_tipcomprobante"},
            {'data':"ingreso_seriecomprobante"},
            {'data':"ingreso_numcomprobante"},
            {'data':"ingreso_fecha"},
            {'data':"ingreso_total"},
            {'data':"ingreso_impuesto"},
            {'data':"ingreso_estatus", 
                render: function(data,type,row){
                    
                    if (data === "INGRESADO") {
                        return "<span class='badge badge-success badge-pill m-r-5 m-b-5'>"+data+"</span>";
                    }else{
                        return "<span class='badge badge-danger badge-pill m-r-5 m-b-5'>"+data+"</span>";
                    }
                }
            },
            {"defaultContent":"<button class='anular btn btn-danger'><i class='fa fa-trash'></i></button>"}
        ],
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            $($(nRow).find("td")[4]).css('text-align', 'left' );
        },
        "language":idioma_espanol,
        select: true
	});
	t_ingreso.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_ingreso').DataTable().page.info();
        t_ingreso.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        } );
    } );
}

$('#tabla_ingreso').on('click','.editar',function(){
    var data = t_ingreso.row($(this).parents('tr')).data();//detecta a que fila hago click
    //y me captura los datos en la variable data.
    if(t_ingreso.row(this).child.isShown()){
        var data = t_ingreso.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    document.getElementById('txtidcategoria').value=data.categoria_id;
    document.getElementById('txt_categoria_actual_editar').value=data.categoria_nombre;
    document.getElementById('txt_categoria_nuevo_editar').value=data.categoria_nombre;
    $("#cbm_estatus").val(data.categoria_estatus).trigger("change");
})

$('#tabla_ingreso').on('click','.anular',function(){
    var data = t_ingreso.row($(this).parents('tr')).data();//detecta a que fila hago click
    //y me captura los datos en la variable data.
    if(t_ingreso.row(this).child.isShown()){
        var data = t_ingreso.row(this).data();
    }
    
    Swal.fire({
        title: 'Desea anular el ingreso',
        text: "Una vez anulado, no se podrá revertir el proceso",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Anular Ingreso'
    }).then((result) => {
        if(result.value){
            $.ajax({
                url:'../controller/ingreso/controlador_anular_ingreso.php',
                type:'POST',
                data:{
                    idingreso:data.ingreso_id
                }
            }).done(function(resp){
                if (resp>0){
                    swal.fire("Mensaje de confirmación","El ingreso fue anulado exitosamente","success");
                    t_ingreso.ajax.reload();
                }else{
                    swal.fire("Mensaje de error","La anulación no se pudo completar","error");
                }
            })
        }
    })
})

function AbrirModal() {
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}

function proveedor_combo() {
    $.ajax({

        url:"../controller/ingreso/controlador_proveedor_combo_listar.php",
        type:'POST'

    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length>0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                
            }

            document.getElementById('cbm_proveedor').innerHTML= cadena;

        }else{
            document.getElementById('cbm_proveedor').innerHTML= "No se encontraron datos";
        }

    })
}

function producto_combo() {
    $.ajax({

        url:"../controller/ingreso/controlador_producto_combo_listar.php",
        type:'POST'

    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length>0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                
            }

            document.getElementById('cbm_producto').innerHTML= cadena;

        }else{
            document.getElementById('cbm_producto').innerHTML= "No se encontraron datos";
        }

    })
}

function Agregar_Producto_Detalle_Ingreso(){
    var idproducto = document.getElementById('cbm_producto').value;
    var producto = $("#cbm_producto option:selected").text();
    var cantidad = document.getElementById('txt_cantidad').value;
    var precio = document.getElementById('txt_precio').value;
    var subtotal = precio*cantidad;
    var impuesto = document.getElementById('txt_impuesto').value;
    var tipo = document.getElementById('cbm_tipo').value;

    if(tipo=="FACTURA"){
        if(impuesto.length==0){
            return Swal.fire("Mensaje de Advertencia","Llene el campo de impuesto","warning");
        }
        if(impuesto>1.00){
            return Swal.fire("Mensaje de Advertencia","No puede asignarle ese impuesto","warning");
        }
    }

    if(cantidad.length==0 || precio.length==0){
        return Swal.fire("Mensaje de Advertencia","Llene el campo de la cantidad y el precio","warning");
    }

    if(parseInt(cantidad)<1){
        return Swal.fire("Mensaje de Advertencia","La cantidad debe ser mayor a 0","warning");
    }

    if(parseFloat(precio)<0.1){
        return Swal.fire("Mensaje de Advertencia","El precio debe ser mayor a 0","warning");
    }

    if(verificarid(idproducto)){
        return Swal.fire("Mensaje de Advertencia","El producto ya fue registrado","warning");
    }

    var datos_agregar = "<tr>";
    datos_agregar+="<td for='id'>"+idproducto+"</td>"; 
    datos_agregar+="<td>"+producto+"</td>"; 
    datos_agregar+="<td>"+precio+"</td>";
    datos_agregar+="<td>"+cantidad+"</td>"; 
    datos_agregar+="<td>"+subtotal+"</td>"; 
    datos_agregar+="<td><button class='btn btn-danger' onclick='remove(this)'><i class='fa fa-trash'></i></button></td>"; 
    datos_agregar+="</tr>";
    $("#tbody_detalle_ingreso").append(datos_agregar);
    SumarTotalneto();
    
}

function verificarid(id){
    var idverificar = document.querySelectorAll('#detalle_ingreso td[for="id"]');
    return [].filter.call(idverificar, td=> td.textContent === id).length===1;
}

function remove(t){
    var td =t.parentNode;
    var tr = td.parentNode;
    var table = tr.parentNode;
    table.removeChild(tr);
    SumarTotalneto();
}

function SumarTotalneto(){
    var arreglo_total = new Array();
    var count = 0;
    var total = 0;
    var impuesto_total = 0;
    var impuesto = document.getElementById('txt_impuesto').value;
    var Subtotal = 0;
    $("#detalle_ingreso tbody#tbody_detalle_ingreso tr").each(function (){
        arreglo_total.push($(this).find('td').eq(4).text());
        count++;
    })

    for(var i = 0; i < count; i++){
        var suma = arreglo_total[i];
        Subtotal = (parseFloat(total) + parseFloat(suma)).toFixed(2);
        impuesto_total = parseFloat(Subtotal*impuesto).toFixed(2);
        total=(parseFloat(Subtotal)+parseFloat(impuesto_total));
    };

    var tipo = document.getElementById('cbm_tipo').value;
    if(tipo=="FACTURA"){
        $("#lbl_subtotal").html("<b>Sub total: </b> S/."+Subtotal);
        $("#lbl_impuesto").html("<b>IGV "+impuesto*100+"%: </b> S/."+impuesto_total);
        $("#lbl_totalneto").html("<b>Total: </b> S/."+total.toFixed(2));
    }else{
        $("#lbl_totalneto").html("<b>Total: </b> S/."+total.toFixed(2));
    }
}

function Registrar_Ingreso(){
    var count = 0;
    $("#detalle_ingreso tbody#tbody_detalle_ingreso tr").each(function (){
        count++;
    })

    if(count==0){
        return Swal.fire("Mensaje de Advertencia","El detalle del ingreso debe tener un producto registrado como mínimo","warning");
    }
    var idproveedor = document.getElementById('cbm_proveedor').value;
    var idusuario = document.getElementById('txt_codigo_principal').value;
    var tipo= document.getElementById('cbm_tipo').value;
    var serie = document.getElementById('txt_serie').value;
    var ncomprobante = document.getElementById('txt_numero').value;
    var total= document.getElementById('lbl_totalneto').innerHTML.substr(18);
    var impuesto = 0;
    var porcentaje = 0;

    if(tipo=="FACTURA"){
        impuesto = document.getElementById('lbl_impuesto').innerHTML.substr(20);
        porcentaje = document.getElementById('txt_impuesto').value;
    }else{
        impuesto = 0;
        porcentaje = 0;
    }

    if(serie.length==0 || ncomprobante.length==0){
        return Swal.fire("Mensaje de Advertencia","Debe llenar los campos vacíos","warning");
    }

    $.ajax({
        url:'../controller/ingreso/controlador_registro_ingreso.php',
        type:'POST',
        data:{
            idproveedor:idproveedor,
            idusuario:idusuario,
            tipo:tipo,
            serie:serie,
            ncomprobante:ncomprobante,
            total:total,
            impuesto:impuesto,
            porcentaje:porcentaje
        }
    }).done(function(resp){
        if (resp>0){
            Registrar_Detalle_Ingreso(parseInt(resp));
        }else{
            swal.fire("Mensaje de error","El registro no se pudo completar","error");
        }
    })
}

function Registrar_Detalle_Ingreso(id){
    let count=0;
    let arreglo_producto = new Array();
    let arreglo_cantidad = new Array();
    let arreglo_precio = new Array();

    $("#detalle_ingreso tbody#tbody_detalle_ingreso tr").each(function (){
        arreglo_producto.push($(this).find('td').eq(0).text());
        arreglo_cantidad.push($(this).find('td').eq(3).text());
        arreglo_precio.push($(this).find('td').eq(2).text());
        count++;
    })

    if(count==0){
        return Swal.fire("Mensaje de Advertencia","El detalle del ingreso un producto registrado como mínimo","warning");
    }

    let producto = arreglo_producto.toString();
    let cantidad = arreglo_cantidad.toString();
    let precio = arreglo_precio.toString();

    $.ajax({
        url:'../controller/ingreso/controlador_registro_ingreso_detalle.php',
        type:'POST',
        data:{
            id:id,
            producto:producto,
            cantidad:cantidad,
            precio:precio
        }
    }).done(function(resp){
        if (resp>0){
            Swal.fire("Mensaje de confirmación","Datos guardados","success");   
        }else{
            swal.fire("Mensaje de error","El registro no se pudo completar","error");
        }
    })
}

function cargarPDF(parametro) {
    myRef=window.open('');
    myRef.location='ingreso/ejemploPDF.php?parametro='+parametro;
    myRef.reload;
    
}