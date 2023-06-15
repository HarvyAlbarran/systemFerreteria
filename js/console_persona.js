var t_persona;
function Listar_Persona(){

    t_persona = $("#tabla_persona").DataTable({
		"ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
    	"autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controller/persona/controlador_persona_listar.php",
        },
        "columns":[
            {"defaultContent":""},
            {'data':"persona"},
            {'data':"persona_nrodocumento"},
            {'data':"persona_tipodocumento"},
            {'data':"persona_sexo",
                render: function(data,type,row){
                        
                    if (data === "MASCULINO") {
                        return "<i class='fa fa-male'></i>";
                    }else{
                        return "<i class='fa fa-female'></i>";
                    }
                }
            },
            {'data':"persona_telefono"},
            {'data':"persona_estatus", 
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
        },
        "language":idioma_espanol,
        select: true
	});
	t_persona.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_persona').DataTable().page.info();
        t_persona.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        } );
    } );
}

$('#tabla_persona').on('click', '.editar', function(){
    var data = t_persona.row($(this).parents('tr')).data();
    if(t_persona.row(this).child.isShown()){
        var data = t_persona.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    document.getElementById('txtidpersona').value=data.persona_id;
    document.getElementById('txtnombre_editar').value=data.persona_nombre;
    document.getElementById('txtapepat_editar').value=data.persona_apepat;
    document.getElementById('txtapemat_editar').value=data.persona_apemat;
    document.getElementById('txtnro_editar_actual').value=data.persona_nrodocumento;
    document.getElementById('txtnro_editar_nuevo').value=data.persona_nrodocumento;
    document.getElementById('txttelefono_editar').value=data.persona_telefono;
    $("#cbm_tdocumento_editar").val(data.persona_tipodocumento).trigger('change');
    $("#cbm_sexo_editar").val(data.persona_sexo).trigger('change');
    $("#cbm_estatus").val(data.persona_estatus).trigger('change');
    document.getElementById('div_error_editar').style.display="none";
    document.getElementById('div_error_editar').innerHTML="";
})

function AbrirModal(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
    document.getElementById('div_error').style.display="none";
    limpiarmodal();
}

function Registrar_Persona(){
    var nombre = document.getElementById('txtnombre').value;
    var apepat = document.getElementById('txtapepat').value;
    var apemat = document.getElementById('txtapemat').value;
    var ndocumento = document.getElementById('txtnro').value;
    var tdocumento = document.getElementById('cbm_tdocumento').value;
    var sexo = document.getElementById('cbm_sexo').value;
    var telefono = document.getElementById('txttelefono').value;
    
    if(nombre.length==0 || apepat.length==0 || apemat.length==0 || ndocumento.length==0 || tdocumento.length==0 || sexo.length==0 || telefono.length==0 ){
        
        mensajeerror(nombre, apepat, apemat, ndocumento, tdocumento, sexo, telefono, 'div_error');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacío","warning");

    }

    $.ajax({
        url:'../controller/persona/controlador_registro_persona.php',
        type:'POST',
        data:{
            nombre:nombre,
            apepat:apepat,
            apemat:apemat,
            ndocumento:ndocumento,
            tdocumento:tdocumento,
            sexo:sexo,
            telefono:telefono
        }
    }).done(function(resp){
        if(isNaN(resp)){
            document.getElementById('div_error').style.display="block";
            document.getElementById('div_error').innerHTML="<strong> Revise los siguientes campos: </strong><br>"+resp;
        }else{
            if (resp>0){
                document.getElementById('div_error').style.display="none";
                document.getElementById('div_error').innerHTML="";
                if(resp==1){
                    t_persona.ajax.reload();
                    limpiarmodal();
                    $("#modal_registro").modal('hide');
                    Swal.fire("Mensaje de confirmación","Datos guardados","success");   
                }else{
                    Swal.fire("Mensaje de advertencia","El Numero de documento ingresado ya se encuentra en la BD","warning");  
                } 
            }else{
                Swal.fire("Mensaje de error","El registro no se pudo completar","error");
            }
        }

    })
}

function Editar_Persona(){
    var id = document.getElementById('txtidpersona').value;
    var nombre = document.getElementById('txtnombre_editar').value;
    var apepat = document.getElementById('txtapepat_editar').value;
    var apemat = document.getElementById('txtapemat_editar').value;
    var ndocumentoactual = document.getElementById('txtnro_editar_actual').value;
    var ndocumentonuevo = document.getElementById('txtnro_editar_nuevo').value;
    var tdocumento = document.getElementById('cbm_tdocumento_editar').value;
    var sexo = document.getElementById('cbm_sexo_editar').value;
    var telefono = document.getElementById('txttelefono_editar').value;
    var estatus = document.getElementById('cbm_estatus').value;
    if(id.length==0 || nombre.length==0 || apepat.length==0 || apemat.length==0 || ndocumentoactual.length==0 || ndocumentonuevo.length==0 || tdocumento.length==0 || sexo.length==0 || telefono.length==0 ){
        
        mensajeerror(nombre, apepat, apemat,ndocumentonuevo, tdocumento, sexo, telefono,'div_error_editar');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacío","warning");

    }

    $.ajax({
        url:'../controller/persona/controlador_editar_persona.php',
        type:'POST',
        data:{
            id:id,
            nombre:nombre,
            apepat:apepat,
            apemat:apemat,
            ndocumentoactual:ndocumentoactual,
            ndocumentonuevo:ndocumentonuevo,
            tdocumento:tdocumento,
            sexo:sexo,
            telefono:telefono,
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
                    t_persona.ajax.reload();
                    $("#modal_editar").modal('hide');
                    Swal.fire("Mensaje de confirmación","Datos Actualizados","success");   
                }else{
                    Swal.fire("Mensaje de advertencia","El Numero de documento ingresado ya se encuentra en la BD","warning");  
                } 
            }else{
                Swal.fire("Mensaje de error","La actualizacion no se pudo completar","error");
            }
        }

    })
}


function mensajeerror(nombre, apepat, apemat, ndocumento, tdocumento, sexo, telefono, id) {
    
    var cadena="";

    if (nombre.length==0) {
        cadena+="El campo nombre no debe estar vacío.<br>"
    }

    if (apepat.length==0) {
        cadena+="El campo apellido paterno no debe estar vacío.<br>"
    }

    if (apemat.length==0) {
        cadena+="El campo apellido materno no debe estar vacío.<br>"
    }

    if (ndocumento.length==0) {
        cadena+="El campo número de documento no debe estar vacío.<br>"
    }

    if (tdocumento.length==0) {
        cadena+="El campo tipo de documento no debe estar vacío.<br>"
    }

    if (sexo.length==0) {
        cadena+="El campo sexo no debe estar vacío.<br>"
    }

    if (telefono.length==0) {
        cadena+="El campo teléfono no debe estar vacío.<br>"
    }
    
    document.getElementById(id).style.display="block";
    document.getElementById(id).innerHTML="<strong> Revise los siguientes campos: </strong><br>"+cadena;

}

function limpiarmodal(){
    document.getElementById('txtnombre').value="";
    document.getElementById('txtapepat').value="";
    document.getElementById('txtapemat').value="";
    document.getElementById('txtnro').value="";
    document.getElementById('txttelefono').value="";
}