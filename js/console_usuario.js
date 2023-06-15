function verificar_Usuario() {
    var user = document.getElementById('usuario').value;  //id del input
    var pass = document.getElementById('password').value;

    if (user.length==0 || pass.length==0) {
        return Swal.fire("Mensaje de advertencia", "Llenar los campos vacíos", "warning");
    }

    $.ajax({

        url: '../controller/usuario/controlador_verificar_usuario.php',
        type:'POST',
        data:{
            u:user,
            p:pass
        }

    }).done(function(resp){

        var data = JSON.parse(resp);
        if (resp==0) {
            Swal.fire("Mensaje de advertencia", "Usuario y/o contraseña incorrecta", "warning");
        }else{
            if (data[0][5] === 'ACTIVO') {
                $.ajax({
                    url: '../controller/usuario/controlador_crear_session.php',
                    type: 'POST' ,
                    data: {
                        idusuario:data[0][0],
                        usuario: data[0][1],
                        rol:data[0][6]
                    }
                }).done(function(resp){
                    let timerInterval
                    Swal.fire({
                    title: 'Bienvenido al sistema',
                    html: 'Será redireccionado en <b></b> milliseconds.',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                    }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        location.reload();
                    }
                    })
                })
            }else{
                Swal.fire("Mensaje de advertencia", "El usuario se encuentra inactivo, comuníquese con el administrador", "warning");
            }
        }

    })
}

var t_usuario;
function Listar_Usuarios(){

    t_usuario = $("#tabla_usuario").DataTable({
		"ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
    	"autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controller/usuario/controlador_usuario_listar.php",
        },
        "columns":[
            {"defaultContent":""},
            {'data':"usuario_nombre"},
            {'data':"persona"},
            {'data':"rol_nombre"},
            {'data':"usuario_email"},
            {'data':"usuario_imagen", 
                render: function(data,type,row){
                    return '<img src="../'+data+'" class="img-circle m-r-10" style="width:28px;">';
                }
            },
            {'data':"usuario_estatus", 
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
            $($(nRow).find("td")[4]).css('text-align', 'left' );
            $($(nRow).find("td")[5]).css('text-align', 'center' );
        },
        "language":idioma_espanol,
        select: true
	});
	t_usuario.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_usuario').DataTable().page.info();
        t_usuario.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        } );
    } );
}

function AbrirModal() {
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}

function listar_persona_combo() {
    $.ajax({

        url:"../controller/usuario/controlador_persona_combo_listar.php",
        type:'POST'

    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length>0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                
            }

            document.getElementById('cbm_persona').innerHTML= cadena;
            document.getElementById('cbm_persona_editar').innerHTML= cadena;

        }else{
            document.getElementById('cbm_persona').innerHTML= "No se encontraron datos";
            document.getElementById('cbm_persona_editar').innerHTML= "No se encontraron datos";
        }

    })
}

function listar_rol_combo() {
    $.ajax({

        url:"../controller/usuario/controlador_rol_combo_listar.php",
        type:'POST'

    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length>0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                
            }

            document.getElementById('cbm_rol').innerHTML= cadena;
            document.getElementById('cbm_rol_editar').innerHTML= cadena;

        }else{
            document.getElementById('cbm_rol').innerHTML= "No se encontraron datos";
            document.getElementById('cbm_rol_editar').innerHTML= "No se encontraron datos";
        }

    })
}

function Registrar_Usuario() {

    var usuario = document.getElementById('txt_usu').value;
    var pass = document.getElementById('txt_password').value;
    var idpersona = document.getElementById('cbm_persona').value;
    var email = document.getElementById('txt_email').value;
    var idrol = document.getElementById('cbm_rol').value;
    var archivo = document.getElementById('imagen').value;

    var f= new Date();

    //me hará conocer la extensión de los archivos que se subirá
    var extension =  archivo.split('.').pop();   

    var nombrearchivo = "IMG"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;

    var formData = new FormData();
    var foto = $("#imagen")[0].files[0];  //capturamos el valor del input y lo pasamos en un object

    if (validar_email(email)) {
        
    }else{
        return Swal.fire("Mensaje de advertencia", "El formato de email es incorrecto", "warning");
    }

    formData.append('usuario', usuario);
    formData.append('pass', pass);
    formData.append('idpersona', idpersona);
    formData.append('email', email);
    formData.append('idrol', idrol);
    formData.append('foto', foto); 
    formData.append('nombrearchivo',nombrearchivo); 
    $.ajax({
        url:'../controller/usuario/controlador_usuario_registro.php',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta){
            if (respuesta !=0) {
                if(respuesta==1){
                    LimpiarCampos() ;
                    t_usuario.ajax.reload();
                    $("#modal_registro").modal('hide');
                    swal.fire("Mensaje de confirmación","Datos guardados","success");   
                }else{
                    swal.fire("Mensaje de advertencia","El usuario o email ingresado ya se encuentra en la BD","warning");  
                } 
            }
        }
    });

    return false;

}

function LimpiarCampos() {
    document.getElementById('txt_usu').value="";
    document.getElementById('txt_email').value="";
    document.getElementById('txt_password').value="";
    document.getElementById('imagen').value="";
}

function validar_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

$('#tabla_usuario').on('click', '.editar', function(){
    var data = t_usuario.row($(this).parents('tr')).data();
    if(t_usuario.row(this).child.isShown()){
        var data = t_usuario.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    document.getElementById('txt_usu_id').value=data.usuario_id;
    document.getElementById('txt_usu_editar_actual').value=data.usuario_nombre;
    document.getElementById('txt_email_editar_nuevo').value=data.usuario_email;
    $("#cbm_persona_editar").val(data.persona_id).trigger('change');
    $("#cbm_rol_editar").val(data.rol_id).trigger('change');
    $("#cbm_estatus").val(data.usuario_estatus).trigger('change');
})

function Editar_Usuario() {

    var id = document.getElementById('txt_usu_id').value;
    var idpersona = document.getElementById('cbm_persona_editar').value;     
    var emailnuevo = document.getElementById('txt_email_editar_nuevo').value;
    var idrol = document.getElementById('cbm_rol_editar').value;
    var estatus = document.getElementById('cbm_estatus').value;
    if (validar_email(emailnuevo)) {
        
    }else{
        return Swal.fire("Mensaje de advertencia", "El formato de email es incorrecto", "warning");
    }

    $.ajax({
        url:'../controller/usuario/controlador_usuario_editar.php',
        type:'POST',
        data:{
            id:id,
            idpersona:idpersona,
            emailnuevo:emailnuevo,
            idrol:idrol,
            estatus:estatus
        }
    }).done(function(resp){
        if (resp>0){
            if(resp==1){
                t_usuario.ajax.reload();
                $("#modal_registro").modal('hide');
                swal.fire("Mensaje de confirmación","Datos actualizados","success");   
            }else{
                swal.fire("Mensaje de advertencia","El email ingresado ya se encuentra en la BD","warning");  
            } 
        }else{
            swal.fire("Mensaje de error","La actualizacion no se pudo completar","error");
        }
    })
}

function Editar_Foto() {

    var id = document.getElementById('txt_usu_id').value;
    var archivo = document.getElementById('imagen_editar').value;

    var f= new Date();

    //me hará conocer la extensión de los archivos que se subirá
    var extension =  archivo.split('.').pop();   

    var nombrearchivo = "IMG"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;

    var formData = new FormData();
    var foto = $("#imagen_editar")[0].files[0];  //capturamos el valor del input y lo pasamos en un object

    if (archivo.length == 0) {
        return Swal.fire("Mensaje de advertencia", "Debe seleccionar un archivo", "warning");
    }

    formData.append('id', id);
    formData.append('foto', foto); 
    formData.append('nombrearchivo',nombrearchivo); 
    $.ajax({
        url:'../controller/usuario/controlador_usuario_editar_imagen.php',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta){
            if (respuesta !=0) {
                if(respuesta==1){
                    t_usuario.ajax.reload();
                    $("#modal_editar").modal('hide');
                    swal.fire("Mensaje de confirmación","Foto actualizada","success");   
                }
            }
        }
    });

    return false;

}

function TraerDatosUsuario(){
    var id = document.getElementById('txt_codigo_principal').value;
    $.ajax({
        url:'../controller/usuario/controlador_traerdatos_usuario.php',
        type:'POST',
        data:{
            id:id
        }
    }).done(function(resp){
        var data = JSON.parse(resp);
        if (data.length>0){
            document.getElementById('usu_sidebar').innerHTML=data[0][1];
            document.getElementById('rol_sidebar').innerHTML=data[0][7];
        }
    })
}

function TraerWidgets(){
    var inicio = document.getElementById('txt_finicio_d').value;
    var fin = document.getElementById('txt_ffin_d').value;
    if(inicio>fin){
        return Swal.fire("Mensaje de advertencia", "La fecha de inicio debe ser menor a la fecha fin", "warning");
    }
    TraerGraficoVentas();
    TraerGraficoIngreso();
    $.ajax({
        url:'../controller/usuario/controlador_traerdatos_widget.php',
        type:'POST',
        data:{
            inicio:inicio,
            fin:fin
        }
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena='';
        if (data.length>0){
            cadena+='<div class="col-lg-3 col-md-6">'+
                '<div class="ibox bg-success color-white widget-stat">'+
                    '<div class="ibox-body">'+
                        '<h2 class="m-b-5 font-strong">'+data[0][0]+'</h2>'+
                        '<div class="m-b-5">TOTAL DE VENTAS</div><i class="ti-shopping-cart widget-stat-icon"></i>'+
                        '<div></div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="col-lg-3 col-md-6">'+
                '<div class="ibox bg-info color-white widget-stat">'+
                    '<div class="ibox-body">'+
                        '<h2 class="m-b-5 font-strong">'+data[0][1]+'</h2>'+
                        '<div class="m-b-5">TOTAL INGRESO</div><i class="ti-bar-chart widget-stat-icon"></i>'+
                        '<div></div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="col-lg-3 col-md-6">'+
                '<div class="ibox bg-warning color-white widget-stat">'+
                    '<div class="ibox-body">'+
                        '<h2 class="m-b-5 font-strong">'+data[0][2]+'</h2>'+
                        '<div class="m-b-5">VENTAS REALIZADAS</div><i class="ti-bar-chart widget-stat-icon"></i>'+
                        '<div></div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="col-lg-3 col-md-6">'+
                '<div class="ibox bg-danger color-white widget-stat">'+
                    '<div class="ibox-body">'+
                        '<h2 class="m-b-5 font-strong">'+data[0][3]+'</h2>'+
                        '<div class="m-b-5">INGRESOS REALIZADOS</div><i class="ti-bar-chart widget-stat-icon"></i>'+
                        '<div></div>'+
                    '</div>'+
                '</div>'+
            '</div>';
            document.getElementById('div_widget').innerHTML=cadena;
        }else{
            cadena+='<div class="col-lg-3 col-md-6">'+
                '<div class="ibox bg-success color-white widget-stat">'+
                    '<div class="ibox-body">'+
                        '<h2 class="m-b-5 font-strong">0</h2>'+
                        '<div class="m-b-5">TOTAL DE VENTAS</div><i class="ti-shopping-cart widget-stat-icon"></i>'+
                        '<div></div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="col-lg-3 col-md-6">'+
                '<div class="ibox bg-info color-white widget-stat">'+
                    '<div class="ibox-body">'+
                        '<h2 class="m-b-5 font-strong">0</h2>'+
                        '<div class="m-b-5">TOTAL INGRESO</div><i class="ti-bar-chart widget-stat-icon"></i>'+
                        '<div></div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="col-lg-3 col-md-6">'+
                '<div class="ibox bg-warning color-white widget-stat">'+
                    '<div class="ibox-body">'+
                        '<h2 class="m-b-5 font-strong">0</h2>'+
                        '<div class="m-b-5">VENTAS REALIZADAS</div><i class="ti-bar-chart widget-stat-icon"></i>'+
                        '<div></div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="col-lg-3 col-md-6">'+
                '<div class="ibox bg-danger color-white widget-stat">'+
                    '<div class="ibox-body">'+
                        '<h2 class="m-b-5 font-strong">0</h2>'+
                        '<div class="m-b-5">INGRESOS REALIZADOS</div><i class="ti-bar-chart widget-stat-icon"></i>'+
                        '<div></div>'+
                    '</div>'+
                '</div>'+
            '</div>';
            document.getElementById('div_widget').innerHTML=cadena;
        }
    })
}

var chartventa;
function TraerGraficoVentas(){
    var inicio = document.getElementById('txt_finicio_d').value;
    var fin = document.getElementById('txt_ffin_d').value;
    $.ajax({
        url:'../controller/usuario/controlador_traergraficoventa_widget.php',
        type:'POST',
        data:{
            inicio:inicio,
            fin:fin
        }
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena='';
        if (data.length>0){
            var producto = new Array();
            var cantidad = new Array();
            var color = new Array();
            for (let index = 0; index < data.length; index++) {
                producto.push(data[index][0]);
                cantidad.push(data[index][1]);
                color.push(colorRGB());
            }
            var ctx = document.getElementById('myChartVentaTop5').getContext('2d');
            if(chartventa){
                chartventa.reset();
                chartventa.destroy();
            }
            chartventa = new Chart(ctx,{
                type:'bar',
                data: {
                    labels:producto,
                    datasets: [{
                        label: 'TOP 5 PRODUCTOS VENDIDOS',
                        backgroundColor: color,
                        borderColor: color,
                        data: cantidad
                    }]
                },
                option:{
                    scales:{
                        xAxes:[{
                            stacked: true
                        }],
                        yAxes:[{
                            stacked:true
                        }]
                    }
                }
            });
        }else{
            var ctx = document.getElementById('myChartVentaTop5').getContext('2d');
            if(chartventa){
                chartventa.reset();
                chartventa.destroy();
            }
            chartventa = new Chart(ctx,{
                type:'bar',
                data: {
                    labels:['NO EXISTEN PRODUCTOS'],
                    datasets: [{
                        label: 'TOP 5 PRODUCTOS VENDIDOS',
                        data: [0]
                    }]
                },
                option:{}
            });
        }
    })
    
}

var chartingreso;
function TraerGraficoIngreso(){
    var inicio = document.getElementById('txt_finicio_d').value;
    var fin = document.getElementById('txt_ffin_d').value;
    $.ajax({
        url:'../controller/usuario/controlador_traergraficoingreso_widget.php',
        type:'POST',
        data:{
            inicio:inicio,
            fin:fin
        }
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena='';
        if (data.length>0){
            var producto = new Array();
            var cantidad = new Array();
            var color = new Array();
            for (let index = 0; index < data.length; index++) {
                producto.push(data[index][0]);
                cantidad.push(data[index][1]);
                color.push(colorRGB());
            }
            var ctx = document.getElementById('myChartIngresoTop5').getContext('2d');
            if(chartingreso){
                chartingreso.reset();
                chartingreso.destroy();
            }
            chartingreso = new Chart(ctx,{
                type:'bar',
                data: {
                    labels:producto,
                    datasets: [{
                        label: 'TOP 5 PRODUCTOS INGRESADOS',
                        backgroundColor: color,
                        borderColor: color,
                        data: cantidad
                    }]
                },
                option:{
                    scales:{
                        xAxes:[{
                            stacked: true
                        }],
                        yAxes:[{
                            stacked:true
                        }]
                    }
                }
            });
        }else{
            var ctx = document.getElementById('myChartIngresoTop5').getContext('2d');
            if(chartingreso){
                chartingreso.reset();
                chartingreso.destroy();
            }
            chartingreso = new Chart(ctx,{
                type:'bar',
                data: {
                    labels:['NO EXISTEN PRODUCTOS'],
                    datasets: [{
                        label: 'TOP 5 PRODUCTOS INGRESADOS',
                        data: [0]
                    }]
                },
                option:{}
            });
        }
    })
    
}

function generarNumero(numero){
    return (Math.random()*numero).toFixed(0);
}

function colorRGB(){
    var coolor = "("+generarNumero(255)+","+generarNumero(255)+","+generarNumero(255)+")";
    return "rgb" + coolor;
}

function TraerDatosPerfil(){
    var id = document.getElementById('txt_codigo_principal').value;
    $.ajax({
        url:'../controller/usuario/controlador_traerdatos_usuario.php',
        type:'POST',
        data:{
            id:id
        }
    }).done(function(resp){
        var data = JSON.parse(resp);
        if (data.length>0){
            document.getElementById('txt_imagen_profile').src='../'+data[0][16];
            document.getElementById('txt_persona_profile').innerHTML=data[0][8]+' '+data[0][9]+' '+data[0][10];
            document.getElementById('txt_rol_profile').innerHTML=data[0][7];
            document.getElementById('txt_nombre_profile').value=data[0][8];
            document.getElementById('txt_apepat_profile').value=data[0][9];
            document.getElementById('txt_apemat_profile').value=data[0][10];
            document.getElementById('txt_nrodocumento_profile').value=data[0][11];
            $("#cbm_tdocumento_profile").val(data[0][12]).trigger('change');
            $("#cbm_sexo_profile").val(data[0][13]).trigger('change');
            document.getElementById('txt_telefono_profile').value=data[0][14];
            document.getElementById('txt_conactual_profile').value=data[0][2];
        }
    })
}

function Editar_Foto_Profile() {

    var id = document.getElementById('txt_codigo_principal').value;
    var archivo = document.getElementById('imagen_profile').value;

    if (archivo.length==0) {
        return Swal.fire("Mensaje de advertencia", "Debe seleccionar un archivo", "warning");
    }
    var f= new Date();

    //me hará conocer la extensión de los archivos que se subirá
    var extension =  archivo.split('.').pop();   

    var nombrearchivo = "IMG"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;

    var formData = new FormData();
    var foto = $("#imagen_profile")[0].files[0];  //capturamos el valor del input y lo pasamos en un object

    formData.append('id', id);
    formData.append('foto', foto); 
    formData.append('nombrearchivo',nombrearchivo); 
    $.ajax({
        url:'../controller/usuario/controlador_usuario_editar_imagen.php',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta){
            if (respuesta !=0) {
                if(respuesta==1){
                    TraerDatosPerfil();
                    swal.fire("Mensaje de confirmación","Foto actualizada","success");
                }
            }
        }
    });

    return false;

}

function Datos_Actualizar() {

    var id = document.getElementById('txt_codigo_principal').value;
    var nombre = document.getElementById('txt_nombre_profile').value;
    var apepat = document.getElementById('txt_apepat_profile').value;
    var apemat = document.getElementById('txt_apemat_profile').value;
    var ndocumento = document.getElementById('txt_nrodocumento_profile').value;
    var tdocumento = document.getElementById('cbm_tdocumento_profile').value;
    var sexo = document.getElementById('cbm_sexo_profile').value;
    var telefono = document.getElementById('txt_telefono_profile').value;

    if(nombre.length==0 || apepat.length==0 || apemat.length==0 || ndocumento.length==0 || tdocumento.length==0 || sexo.length==0 || telefono.length==0 ){
        
        mensajeerror(nombre, apepat, apemat, ndocumento, tdocumento, sexo, telefono);
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacío","warning");

    }

    $.ajax({
        url:'../controller/usuario/controlador_actualizar_datos_persona_profile.php',
        type:'POST',
        data:{
            id:id,
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
            document.getElementById('div_error_profile').style.display="block";
            document.getElementById('div_error_profile').innerHTML="<strong> Revise los siguientes campos: </strong><br>"+resp;
        }else{
            if (resp>0){
                document.getElementById('div_error_profile').style.display="none";
                document.getElementById('div_error_profile').innerHTML="";
                if(resp==1){
                    Swal.fire("Mensaje de confirmación","Datos guardados","success");   
                    TraerDatosPerfil();
                }else{
                    Swal.fire("Mensaje de advertencia","El Numero de documento ingresado ya se encuentra en la BD","warning");  
                } 
            }else{
                Swal.fire("Mensaje de error","El registro no se pudo completar","error");
            }
        }

    })

}


function mensajeerror(nombre, apepat, apemat, ndocumento, tdocumento, sexo, telefono) {
    
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
    
    document.getElementById('div_error_profile').style.display="block";
    document.getElementById('div_error_profile').innerHTML="<strong> Revise los siguientes campos: </strong><br>"+cadena;

}

function Actualizar_Contra(){
    var id = document.getElementById('txt_codigo_principal').value;
    var contraactual = document.getElementById('txt_conactual_profile').value;
    var contraactualescrita = document.getElementById('txt_conactualescrita_profile').value;
    var contranueva = document.getElementById('txt_connueva_profile').value;
    var contrarepetir = document.getElementById('txt_conrepetir_profile').value;

    if(contranueva != contrarepetir){
        return Swal.fire("Mensaje de Advertencia","Las contrase\u00f1as no coinciden, debe ingresar la misma contraseña dos veces","warning");
    }

    $.ajax({
        url:'../controller/usuario/controlador_actualizar_contra_usuario.php',
        type:'POST',
        data:{
            id:id,
            contraactual:contraactual,
            contraactualescrita:contraactualescrita,
            contranueva:contranueva
        }
    }).done(function(resp){
        if (resp>0){
            if(resp==1){
                Swal.fire("Mensaje de confirmación","Contrase\u00f1a actualizada","success");  
                LimpiarContra();
                TraerDatosPerfil();
            }else{
                Swal.fire("Mensaje de advertencia","La contrase\u00f1a actual ingresada no existe","warning");  
            } 
        }else{
            Swal.fire("Mensaje de error","La contrase\u00f1a no se pudo actualizar","error");
        }
    })
}

function LimpiarContra(){
    document.getElementById('txt_conactualescrita_profile').value="";
    document.getElementById('txt_connueva_profile').value="";
    document.getElementById('txt_conrepetir_profile').value="";
}