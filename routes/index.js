var config = require('../config');
var pedido=require("../models/pedido.js");

/*
 * GET home page.
 */

exports.index = function(req, res){

	pedido.find().limit(20).desc("Fecha").execFind(function(err,doctos){		
		res.render('index', { title: 'Karaoke db',Pedidos:doctos });
	});
	//client.sort("archivosKar","by","archivo->vicente*",redis.print);  
};