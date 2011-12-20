var fs = require('fs');
var archv=require("../models/archivo.js");
var pedido=require("../models/pedido.js");
var config = require('../config')
var path = require("path");
var walk = require('walk');

var walker,options;
options={
	followLinks: false
};

module.exports=function(app,conexionCliente){
	app.get("/iniciar",function(req,res){

		///
		var dirs = [];
		var files_kar = [];
		res.write("<html><head></head><body>");
		// funcion para indexar
		walker = walk.walk(config.server.Ruta, options);
		walker.on("file",function(raiz,fileStats,siguiente){			
			var extension=path.extname(fileStats.name);
			if(config.extensiones.indexOf(extension)>-1)
			{
				res.write(fileStats.name);	
				var ruta=path.normalize(raiz).split("\\");
				var artista=ruta[ruta.length-1].toLowerCase();
				var llave="archivo:" + fileStats.name.toLowerCase() +"|" +artista;
				var archivo=new archv();
				archivo.Archivo=fileStats.name.toLowerCase();
				archivo.Ruta=path.normalize(raiz);
				archivo.Artista=artista;
				archivo._keywords=llave;
				archivo.save();
				// client.HMSET(llave,
				// 	{
				// 		"archivo":fileStats.name.toLowerCase(),
				// 		"ruta":raiz.toLowerCase(),
				// 		"artista":artista
				// 	});
				//client.set("archivosKar",llave);
				//client.sadd("archivo",fileStats.name.toLowerCase());
				//client.sadd("ruta",raiz.toLowerCase());
				//client.sadd("artista",ruta[ruta.length-1].toLowerCase());
				//client.hmset(llave,"archivo",fileStats.name.toLowerCase(),"ruta",raiz.toLowerCase(),"artista",ruta[ruta.length-1].toLowerCase());
			}
			siguiente();	
		});
		walker.on("errors", function (raiz, nodeStatsArray, siguiente) {
			console.log("error");
  			siguiente();
		});

		walker.on("end", function () {
  			console.log("terminado");
  			res.end();
		});
			
	});

	app.get("/pedidos",function(req,res){
		pedido.find().desc("Fecha").execFind(function(err,doctos){		
			res.render('pedidos', { title: 'Lista de pedidos',Pedidos:doctos });
		});
	});

	app.get("/quitarpedido/:id",function(req,res){
		pedido.findById(req.params.id,function(err,doc){
			conexionCliente.emit('EliminarPedido',{Id:doc._id});			
			doc.remove();			
			res.redirect("/pedidos");
		});
	});
}

