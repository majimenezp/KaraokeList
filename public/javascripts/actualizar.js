$(document).ready(function (){
		var socket=io.connect();
		socket.on("ActualizaPedidos",function(data){
			actualizaPanel(data);				
		});
		socket.on("EliminarPedido",function(data){
			quitaPanel(data);
		});
	function actualizaPanel(mensaje){
		socket.emit("cliente",{mensaje:"recibido"});
		var pedido="<div class='pedido' id="+ mensaje.Id+"><p class='cancion'>Cancion:"+ mensaje.Cancion+"</p><p class='sol'>"+mensaje.Nombre+"</p></div>";
		$("#pendientes").children().first().before(pedido);
		$("#pendientes").children().first().animate({ backgroundColor: "#ffffff" }, 1000);
	}
	function quitaPanel(mensaje){
		$("#" + mensaje.Id).remove();
	}
});

