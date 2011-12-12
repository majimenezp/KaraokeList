var config = require('../config')
var redis = require("redis"),
    client = redis.createClient();
var pedido=require("../models/pedido.js");

client.on("error", function (err) {
    console.log("Error " + err);
});
/*
 * GET home page.
 */

exports.index = function(req, res){

	pedido.find().limit(20).desc("Fecha").execFind(function(err,doctos){		
		res.render('index', { title: 'Karaoke db',Pedidos:doctos });
	});
	//client.sort("archivosKar","by","archivo->vicente*",redis.print);  
};