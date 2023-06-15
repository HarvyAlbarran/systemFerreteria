var t_categoria;
function listar_categoria(){

    t_categoria = $("#tabla_categoria").DataTable({
		"ordering":false,   
        "pageLength":10,
        "destroy":true,
        "async": false ,
        "responsive": true,
    	"autoWidth": false,
        "ajax":{
            "method":"POST",
            "url":"../controller/categoria/controlador_categoria_listar.php",
        },
        "columns":[
            {"defaultContent":""},
            {'data':"categoria_nombre"},
            {'data':"categoria_fregistro"},
            {'data':"categoria_estatus", 
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
        },
        "language":idioma_espanol,
        select: true
	});
	t_categoria.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_categoria').DataTable().page.info();
        t_categoria.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        } );
    } );
}

$('#tabla_categoria').on('click','.editar',function(){
    var data = t_categoria.row($(this).parents('tr')).data();//detecta a que fila hago click
    //y me captura los datos en la variable data.
    if(t_categoria.row(this).child.isShown()){
        var data = t_categoria.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
    document.getElementById('txtidcategoria').value=data.categoria_id;
    document.getElementById('txt_categoria_actual_editar').value=data.categoria_nombre;
    document.getElementById('txt_categoria_nuevo_editar').value=data.categoria_nombre;
    $("#cbm_estatus").val(data.categoria_estatus).trigger("change");
})

function AbrirModal() {
    $("#modal_registro").modal({backdrop:'static',keyboard:false})
    $("#modal_registro").modal('show');
}

function Registrar_Categoria(){
    var categoria = document.getElementById('txt_categoria').value;
    if(categoria.length==0){
        return Swal.fire("Mensaje de advertencia","Llenar el campo vacío","warning");
    }
    $.ajax({
        url:'../controller/categoria/controlador_registro_categoria.php',
        type:'POST',
        data:{
            categoria:categoria
        }
    }).done(function(resp){
        if (resp>0){
            if(resp==1){
                t_categoria.ajax.reload();
                $("#modal_registro").modal('hide');
                swal.fire("Mensaje de confirmación","Datos guardados","success");   
            }else{
                swal.fire("Mensaje de advertencia","La categoría ingresada ya se encuentra en la BD","warning");  
            } 
        }else{
            swal.fire("Mensaje de error","el registro no se pudo completar","error");
        }
    });
}


function Editar_Categoria(){
    var id = document.getElementById('txtidcategoria').value;
    var categoriaactual = document.getElementById('txt_categoria_actual_editar').value;
    var categorianuevo = document.getElementById('txt_categoria_nuevo_editar').value;
    var estatus = document.getElementById('cbm_estatus').value;
    
    if(id.length==0 || categoriaactual.length==0 || categorianuevo.length==0 || estatus.length==0){
        Swal.fire("Mensaje de advertencia","Llenar el campo vacío","warning");
    }
    $.ajax({
        url:'../controller/categoria/controlador_editar_categoria.php',
        type:'POST',
        data:{
            id:id,
            categoriaactual:categoriaactual,
            categorianuevo:categorianuevo,
            estatus:estatus
        }
    }).done(function(resp){
        if (resp>0){
            if(resp==1){
                t_categoria.ajax.reload();
                $("#modal_registro").modal('hide');
                swal.fire("Mensaje de confirmación","Datos actualizados","success");   
            }else{
                swal.fire("Mensaje de advertencia","La categoría ingresada ya se encuentra en la BD","warning");  
            } 
        }else{
            swal.fire("Mensaje de error","La actualizacion no se pudo completar","error");
        }
    })
}