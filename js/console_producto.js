var t_producto;
function listar_producto(){

    t_producto = $("#tabla_producto").DataTable({
		"ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
    	"autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controller/producto/controlador_producto_listar.php",
        },
        "columns":[
            {"defaultContent":""},
            {'data':"producto_nombre"},
            {'data':"producto_presentacion"},
            {'data':"categoria_nombre"},
            {'data':"unidad_nombre"},
            {'data':"producto_stock"},
            {'data':"producto_precioventa"},
            {'data':"producto_foto", 
                render: function(data,type,row){
                    return '<img src="../'+data+'" class="img-circle m-r-10" style="width:28px;">';
                }
            },
            {'data':"producto_estatus", 
                render: function(data,type,row){
                    
                    if (data === "ACTIVO") {
                        return "<span class='badge badge-success badge-pill m-r-5 m-b-5'>"+data+"</span>";
                    }else{
                        return "<span class='badge badge-danger badge-pill m-r-5 m-b-5'>"+data+"</span>";
                    }
                }
            },
            {"defaultContent":"<button class='editar btn btn-primary'><i class='fa fa-edit'></i></button>"}
        ],
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            $($(nRow).find("td")[3]).css('text-align', 'center' );
            $($(nRow).find("td")[4]).css('text-align', 'center' );
            $($(nRow).find("td")[5]).css('text-align', 'center' );
            $($(nRow).find("td")[6]).css('text-align', 'center' );
            $($(nRow).find("td")[7]).css('text-align', 'center' );
            $($(nRow).find("td")[8]).css('text-align', 'center' );
            $($(nRow).find("td")[9]).css('text-align', 'center' );
        },
        "language":idioma_espanol,
        select: true
	});
	t_producto.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_producto').DataTable().page.info();
        t_producto.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        } );
    } );
}

$('#tabla_producto').on('click', '.editar', function(){
    var data = t_producto.row($(this).parents('tr')).data();
    if(t_producto.row(this).child.isShown()){
        var data = t_producto.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    document.getElementById('txt_producto_id').value=data.producto_id;
    document.getElementById('txt_producto_nuevo_editar').value=data.producto_nombre;
    document.getElementById('txt_presentacion_editar').value=data.producto_presentacion;
    document.getElementById('txt_precio_editar').value=data.producto_precioventa;
    $("#cbm_categoria_editar").val(data.categoria_id).trigger('change');
    $("#cbm_unidad_editar").val(data.unidad_id).trigger('change');
    $("#cbm_estatus").val(data.producto_estatus).trigger('change');
    document.getElementById('div_error_editar').style.display="none";
    document.getElementById('div_error_editar').innerHTML="";
})

function categoria_combo() {
    $.ajax({

        url:"../controller/producto/controlador_categoria_combo_listar.php",
        type:'POST'

    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length>0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                
            }

            document.getElementById('cbm_categoria_registro').innerHTML= cadena;
            document.getElementById('cbm_categoria_editar').innerHTML= cadena;

        }else{
            document.getElementById('cbm_categoria_registro').innerHTML= "No se encontraron datos";
            document.getElementById('cbm_categoria_editar').innerHTML= "No se encontraron datos";
        }

    })
}

function unidad_combo() {
    $.ajax({

        url:"../controller/producto/controlador_unidad_combo_listar.php",
        type:'POST'

    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length>0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                
            }

            document.getElementById('cbm_unidad_registro').innerHTML= cadena;
            document.getElementById('cbm_unidad_editar').innerHTML= cadena;

        }else{
            document.getElementById('cbm_unidad_registro').innerHTML= "No se encontraron datos";
            document.getElementById('cbm_unidad_editar').innerHTML= "No se encontraron datos";
        }

    })
}


function Registrar_Producto() {

    var producto = document.getElementById('txt_producto_registro').value;
    var presentacion = document.getElementById('txt_presentacion_registro').value;
    var categoria = document.getElementById('cbm_categoria_registro').value;
    var unidad = document.getElementById('cbm_unidad_registro').value;
    var precio = document.getElementById('txt_precio_registro').value;
    var archivo = document.getElementById('txt_foto_producto').value;

    if (producto.length==0 || presentacion.length==0 || categoria.length==0 ||unidad.length==0 || precio.length==0) {
        mensajeerror(producto, presentacion, categoria, unidad, precio, 'div_error');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacío","warning");
    }

    var f= new Date();

    //me hará conocer la extensión de los archivos que se subirá
    var extension =  archivo.split('.').pop();   

    var nombrearchivo = "PRO"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;

    var formData = new FormData();
    var foto = $("#txt_foto_producto")[0].files[0];  //capturamos el valor del input y lo pasamos en un object

    formData.append('producto', producto);
    formData.append('presentacion', presentacion);
    formData.append('categoria', categoria);
    formData.append('unidad', unidad);
    formData.append('precio', precio);
    formData.append('foto', foto); 
    formData.append('nombrearchivo',nombrearchivo); 
    $.ajax({
        url:'../controller/producto/controlador_producto_registro.php',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta){
            if(isNaN(respuesta)){
                document.getElementById('div_error').style.display="block";
                document.getElementById('div_error').innerHTML="<strong> Revise los siguientes campos: </strong><br>"+respuesta;
            }else{
                if(respuesta==1){
                    t_producto.ajax.reload();
                    $("#modal_registro").modal('hide');
                    Swal.fire("Mensaje de confirmación","Datos guardados","success");   
                }else{
                    Swal.fire("Mensaje de advertencia","El producto ingresado ya se encuentra en la BD","warning");  
                } 
            }
        }
    });

    return false;

}

function Editar_Producto() {

    var id = document.getElementById('txt_producto_id').value;
    var producto = document.getElementById('txt_producto_nuevo_editar').value;
    var presentacion = document.getElementById('txt_presentacion_editar').value;
    var categoria = document.getElementById('cbm_categoria_editar').value;
    var unidad = document.getElementById('cbm_unidad_editar').value;
    var precio = document.getElementById('txt_precio_editar').value;
    var estatus = document.getElementById('cbm_estatus').value;

    if (id.length==0 || producto.length==0 || presentacion.length==0 || categoria.length==0 ||unidad.length==0 || precio.length==0 || estatus.length==0) {
        mensajeerror(producto, presentacion, categoria, unidad, precio, 'div_error_editar');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacío","warning");
    }

    $.ajax({
        url:'../controller/producto/controlador_editar_producto.php',
        type:'POST',
        data:{
            id:id,
            producto:producto,
            presentacion:presentacion,
            categoria:categoria,
            unidad:unidad,
            precio:precio,
            estatus:estatus
        }
    }).done(function(resp){
        if(isNaN(resp)){
            document.getElementById('div_error_editar').style.display="block";
            document.getElementById('div_error_editar').innerHTML="<strong> Revise los siguientes campos: </strong><br>"+resp;
        }else{
            if (resp>0){
                document.getElementById('div_error_editar').style.display="none";
                document.getElementById('div_error_editar').innerHTML="";
                if(resp==1){
                    t_producto.ajax.reload();
                    $("#modal_editar").modal('hide');
                    Swal.fire("Mensaje de confirmación","Datos Actualizados","success");   
                }else{
                    Swal.fire("Mensaje de advertencia","El producto ingresado ya se encuentra en la BD","warning");  
                } 
            }else{
                Swal.fire("Mensaje de error","La actualizacion no se pudo completar","error");
            }
        }

    })

}

function Editar_Foto_Producto() {

    var id = document.getElementById('txt_producto_id').value;
    var archivo = document.getElementById('txt_foto_producto_editar').value;

    var f= new Date();

    //me hará conocer la extensión de los archivos que se subirá
    var extension =  archivo.split('.').pop();   

    var nombrearchivo = "PRO"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;

    var formData = new FormData();
    var foto = $("#txt_foto_producto_editar")[0].files[0];  //capturamos el valor del input y lo pasamos en un object

    if (archivo.length == 0) {
        return Swal.fire("Mensaje de advertencia", "Debe seleccionar un archivo", "warning");
    }

    formData.append('id', id);
    formData.append('foto', foto); 
    formData.append('nombrearchivo',nombrearchivo); 
    $.ajax({
        url:'../controller/producto/controlador_producto_editar_imagen.php',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta){
            if (respuesta !=0) {
                if(respuesta==1){
                    t_producto.ajax.reload();
                    $("#modal_editar").modal('hide');
                    swal.fire("Mensaje de confirmación","Foto actualizada","success");   
                }
            }
        }
    });

    return false;

}

//mensaje de error cuando los campos estan vacios o no coincide el tipo de dato
function  mensajeerror(producto, presentacion, categoria, unidad, precio, id){
    
    var cadena="";

    if (producto.length==0) {
        cadena+="El campo producto no debe estar vacío.<br>"
    }

    if (presentacion.length==0) {
        cadena+="El campo presentacion no debe estar vacío.<br>"
    }

    if (categoria.length==0) {
        cadena+="El campo categoría materno no debe estar vacío.<br>"
    }

    if (unidad.length==0) {
        cadena+="El campo unidad de medida no debe estar vacío.<br>"
    }

    if (precio.length==0) {
        cadena+="El campo precio no debe estar vacío.<br>"
    }
    
    document.getElementById(id).style.display="block";
    document.getElementById(id).innerHTML="<strong> Revise los siguientes campos: </strong><br>"+cadena;

}

function AbrirModal(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
    document.getElementById('div_error').style.display="none";
}