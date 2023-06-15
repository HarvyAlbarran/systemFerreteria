var t_unidadMedida;
function listar_unidadMedida(){

    t_unidadMedida = $("#tabla_unidadMedida").DataTable({
		"ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
    	"autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controller/unidadMedida/controlador_unidadMedida_listar.php",
        },
        "columns":[
            {"defaultContent":""},
            {'data':"unidad_nombre"},
            {'data':"unidad_abreviatura"},
            {'data':"unidad_fregistro"},
            {'data':"unidad_estatus", 
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
            $($(nRow).find("td")[2]).css('text-align', 'center' );
            $($(nRow).find("td")[3]).css('text-align', 'center' );
        },
        "language":idioma_espanol,
        select: true
	});
	t_unidadMedida.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_unidadMedida').DataTable().page.info();
        t_unidadMedida.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        } );
    } );
}

$('#tabla_unidadMedida').on('click','.editar',function(){
    var data = t_unidadMedida.row($(this).parents('tr')).data();//detecta a que fila hago click
    //y me captura los datos en la variable data.
    if(t_unidadMedida.row(this).child.isShown()){
        var data = t_unidadMedida.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    document.getElementById('txtidunidad').value=data.unidad_id;
    document.getElementById('txt_unidad_actual_editar').value=data.unidad_nombre;
    document.getElementById('txt_unidad_nuevo_editar').value=data.unidad_nombre;
    document.getElementById('txt_abreviatura_editar').value=data.unidad_abreviatura;
    $("#cbm_estatus").val(data.unidad_estatus).trigger("change");
})

function AbrirModal() {
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}

function Registrar_unidadMedida(){
    var unidad = document.getElementById('txt_unidad').value;
    var abreviatura = document.getElementById('txt_abreviatura').value;
    if(unidad.length==0){
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacío de la unidad de medida","warning");
    }

    if(abreviatura.length==0){
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacío de la abreviatura de la unidad de medida","warning");
    }

    $.ajax({
        url:'../controller/unidadMedida/controlador_registro_unidadMedida.php',
        type:'POST',
        data:{
            unidad:unidad,
            abreviatura:abreviatura
        }
    }).done(function(resp){
        if (resp>0){
            if(resp==1){
                t_unidadMedida.ajax.reload();
                $("#modal_registro").modal('hide');
                swal.fire("Mensaje de confirmación","Datos guardados","success");
                document.getElementById('txt_abreviatura').value="";
                document.getElementById('txt_unidad').value="";   
            }else{
                swal.fire("Mensaje de advertencia","La unidad de medida ingresada ya se encuentra en la BD","warning");  
            } 
        }else{
            swal.fire("Mensaje de error","El registro no se pudo completar","error");
        }
    });
}

function Editar_Unidad(){
    var id = document.getElementById('txtidunidad').value;
    var unidadactual = document.getElementById('txt_unidad_actual_editar').value;
    var unidadnueva = document.getElementById('txt_unidad_nuevo_editar').value;
    var abreviaturaeditar = document.getElementById('txt_abreviatura_editar').value;
    var estatus = document.getElementById('cbm_estatus').value;
    if(unidadactual.length==0 || unidadnueva.length==0){
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacío de la unidad de medida","warning");
    }

    if(abreviaturaeditar.length==0){
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacío de la abreviatura de la unidad de medida","warning");
    }

    if(estatus.length==0){
        return Swal.fire("Mensaje de advertencia","Debe seleccionar un estatus","warning");
    }

    if(id.length==0){
        return Swal.fire("Mensaje de advertencia","El campo id no existe","warning");
    }

    $.ajax({
        url:'../controller/unidadMedida/controlador_editar_unidadMedida.php',
        type:'POST',
        data:{
            id:id,
            unidadactual:unidadactual,
            unidadnueva:unidadnueva,
            abreviaturaeditar:abreviaturaeditar,
            estatus:estatus
        }
    }).done(function(resp){
        if (resp>0){
            if(resp==1){
                t_unidadMedida.ajax.reload();
                $("#modal_editar").modal('hide');
                swal.fire("Mensaje de confirmación","Datos actualizados correctamente","success");
            }else{
                swal.fire("Mensaje de advertencia","La unidad de medida ingresada ya se encuentra en la BD","warning");  
            } 
        }else{
            swal.fire("Mensaje de error","el registro no se pudo completar","error");
        }
    });
}

