$(document).ready(function (){
		var socket=io.connect();
		socket.on("ActualizaPedidos",function(data){
			actualizaPanel(data);				
		});
	function actualizaPanel(mensaje){
		socket.emit("cliente",{mensaje:"recibido"});
		var pedido="<div class='pedido'><p class='cancion'>Cancion:"+ mensaje.Cancion+"</p><p class='sol'>Solicitante:"+mensaje.Nombre+"</p><a href='"+ mensaje.Ruta
		+"'>Archivo:</a>"+ mensaje.Ruta+"<br/><br/><a href='"+ mensaje.Id+"'>Despachado</a></p></div>";
		$("#pendientes").children().first().before(pedido);
		$("#pendientes").children().first().animate({ backgroundColor: "#ffffff" }, 1000);
	}
});

