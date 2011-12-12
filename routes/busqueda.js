var config = require('../config')
var path=require("path");
var archv=require("../models/archivo.js");
var pedido=require("../models/pedido.js");


module.exports=function(app){
	app.post("/busqueda",function(req,res){

		var resultados={
			cantidad:0,
			registros:[]	
		};
		if(req.body.busqueda.length<4)
		{
			res.render("busqueda",{title:"Resultados",Resultados:resultados});
		}
		
		var busqueda=new RegExp('.*' + req.body.busqueda.toLowerCase() + '.*',"i");
		var query=archv.find({});
		query.or(
			[	
				{Archivo:busqueda},
				{Artista:busqueda}
			]);
			query.run(function(err,datos){
				resultados.registros=datos;
				resultados.cantidad=datos.length;
				res.render("busqueda",{title:"Resultados",Resultados:resultados});
		});
	
	});

	//------------------------------------------

	app.post("/Solicitar",function(req,res){
		var fechaAct=new Date();
		archv.findById(req.body.id,function(err,docto){
			var solped=new pedido();
			solped.Persona=req.body.nombrePersona;
			solped.Ruta=req.body.rutaArchivo;
			solped.Artista=docto.Artista;
			solped.Cancion=docto.Archivo;
			solped.Fecha=fechaAct;
			solped.save();
			res.redirect("/");
		});
	});
}