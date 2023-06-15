var t_proveedor;

function listar_proveedor(){

    t_proveedor = $("#tabla_proveedor").DataTable({
		"ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
    	"autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controller/proveedor/controlador_proveedor_listar.php",
        },
        "columns":[
            {"defaultContent":""},
            {'data':"persona"},
            {'data':"proveedor_contacto"},
            {'data':"proveedor_numcontacto"},
            {'data':"persona_nrodocumento"},
            {'data':"persona_tipodocumento"},
            {'data':"proveedor_estatus", 
                render: function(data,type,row){
                    
                    if (data === "ACTIVO") {
                        return "<span class='badge badge-success badge-pill m-r-5 m-b-5'>"+data+"</span>";
                    }else{
                        return "<span class='badge badge-danger badge-pill m-r-5 m-b-5'>"+data+"</span>";
                    }
                }
            },
            {'data':"proveedor_estatus", 
                render: function(data,type,row){
                    
                    if (data === "ACTIVO") {
                        return "<button class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;<button class=' btn btn-warning' disabled><i class='fa fa-check'></i></button>&nbsp;<button class='desactivar btn btn-danger'><i class='fa fa-times-circle'></i></button>";
                    }else{
                        return "<button class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;<button class='activar btn btn-warning'><i class='fa fa-check'></i></button>&nbsp;<button class='btn btn-danger' disabled><i class='fa fa-times-circle'></i></button>";
                    }
                }
            }
        ],
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            $($(nRow).find("td")[3]).css('text-align', 'center' );
            $($(nRow).find("td")[4]).css('text-align', 'center' );
            $($(nRow).find("td")[5]).css('text-align', 'center' );
        },
        "language":idioma_espanol,
        select: true
	});
	t_proveedor.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_proveedor').DataTable().page.info();
        t_proveedor.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        } );
    } );
}

$('#tabla_proveedor').on('click', '.activar', function(){
    var data = t_proveedor.row($(this).parents('tr')).data();
    if(t_proveedor.row(this).child.isShown()){
        var data = t_proveedor.row(this).data();
    }

    Swal.fire({
        title: '¿Desea activar al proveedor?',
        text: "Está seguro de activar al proveedor!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        Modificar_Estatus_Proveedor(data.proveedor_id, 'ACTIVO');
    })
})

$('#tabla_proveedor').on('click', '.desactivar', function(){
    var data = t_proveedor.row($(this).parents('tr')).data();
    if(t_proveedor.row(this).child.isShown()){
        var data = t_proveedor.row(this).data();
    }

    Swal.fire({
        title: '¿Desea desactivar al proveedor?',
        text: "Está seguro de desactivar al proveedor!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        Modificar_Estatus_Proveedor(data.proveedor_id, 'INACTIVO');
    })
})

$('#tabla_proveedor').on('click', '.editar', function(){
    var data = t_proveedor.row($(this).parents('tr')).data();
    if(t_proveedor.row(this).child.isShown()){
        var data = t_proveedor.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');

    document.getElementById('txt_idproveedor').value=data.proveedor_id;
    document.getElementById('txt_razonsocial_editar').value=data.proveedor_razonsocial;
    document.getElementById('txt_nomcontacto_editar').value=data.proveedor_contacto;
    document.getElementById('txt_numcontacto_editar').value=data.proveedor_numcontacto;
})

function Modificar_Estatus_Proveedor(idproveedor, estatus) {
    $.ajax({
        url:'../controller/proveedor/controlador_actualizar_estatus_proveedor.php',
        type:'POST',
        data:{
            idproveedor:idproveedor,
            estatus:estatus
        }
    }).done(function(resp){
        if (resp>0) {
            if (estatus==='ACTIVO') {
                Swal.fire("Mensaje de confirmación","Proveedor activado correctamente","success"); 
            }else{
                Swal.fire("Mensaje de confirmación","Proveedor desactivado correctamente","success"); 
            } 
            t_proveedor.ajax.reload();
        }else{
            Swal.fire("Mensaje de error","No se pudo actualizar los datos","error"); 
        }


    })
}

function AbrirModal(){
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
    document.getElementById('div_error').style.display="none";
    limpiarmodal();
}

function Registrar_Proveedor(){
    var nombre = document.getElementById('txtnombre').value;
    var razonsocial = document.getElementById('txt_razonsocial').value;
    var nomcontacto = document.getElementById('txt_nomcontacto').value;
    var numcontacto = document.getElementById('txt_numcontacto').value;
    var apepat = document.getElementById('txtapepat').value;
    var apemat = document.getElementById('txtapemat').value;
    var ndocumento = document.getElementById('txtnro').value;
    var tdocumento = document.getElementById('cbm_tdocumento').value;
    var sexo = document.getElementById('cbm_sexo').value;
    var telefono = document.getElementById('txttelefono').value;
    
    if(nombre.length==0 || apepat.length==0 || apemat.length==0 || ndocumento.length==0 || tdocumento.length==0 || sexo.length==0 || telefono.length==0   || razonsocial.length==0 || nomcontacto.length==0 || numcontacto.length==0 ){
        
        mensajeerror(nombre, apepat, apemat, ndocumento, tdocumento, sexo, telefono, razonsocial, nomcontacto, numcontacto,  'div_error');
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacío","warning");

    }

    $.ajax({
        url:'../controller/proveedor/controlador_registro_proveedor.php',
        type:'POST',
        data:{
            nombre:nombre,
            apepat:apepat,
            apemat:apemat,
            ndocumento:ndocumento,
            tdocumento:tdocumento,
            sexo:sexo,
            telefono:telefono,
            razonsocial: razonsocial,
            nomcontacto: nomcontacto,
            numcontacto: numcontacto
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
                    t_proveedor.ajax.reload();
                    limpiarmodal();
                    $("#modal_registro").modal('hide');
                    Swal.fire("Mensaje de confirmación","Datos guardados","success");   
                }else{
                    Swal.fire("Mensaje de advertencia","El Numero de RUC ingresado ya se encuentra en la BD","warning");  
                } 
            }else{
                Swal.fire("Mensaje de error","El registro no se pudo completar","error");
            }
        }
    })
}

function mensajeerror(nombre, apepat, apemat, ndocumento, tdocumento, sexo, telefono,  razonsocial, nomcontacto, numcontacto,id) {
    
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

    if (razonsocial.length==0) {
        cadena+="El campo razón social no debe estar vacío.<br>"
    }

    if (nomcontacto.length==0) {
        cadena+="El campo nombre del contacto no debe estar vacío.<br>"
    }

    if (numcontacto.length==0) {
        cadena+="El campo número del contacto no debe estar vacío.<br>"
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

function Modificar_Proveedor() {
    
    var idproveedor = document.getElementById('txt_idproveedor').value;
    var razonsocial = document.getElementById('txt_razonsocial_editar').value;
    var nomcontacto = document.getElementById('txt_nomcontacto_editar').value;
    var numcontacto = document.getElementById('txt_numcontacto_editar').value;

    if (idproveedor.length==0 ||razonsocial.length==0 ||nomcontacto.length==0 ||numcontacto.length==0) {
        return Swal.fire("Mensaje de advertencia","Llene los campos vacíos","warning");
    }

    $.ajax({
        url:'../controller/proveedor/controlador_editar_proveedor.php',
        type:'POST',
        data:{
            idproveedor:idproveedor,
            razonsocial: razonsocial,
            nomcontacto: nomcontacto,
            numcontacto: numcontacto
        }
    }).done(function(resp){
        if (resp>0) {
            $("#modal_editar").modal('hide');
            t_proveedor.ajax.reload();

            Swal.fire("Mensaje de confirmación","Datos actualizados","success"); 

        }else{
            Swal.fire("Mensaje de error","No se pudo actualizar los datos","error"); 
        }


    })
}
