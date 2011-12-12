var mongoose=require("mongoose")
	,Schema=mongoose.Schema
	,ObjectId=Schema.ObjectId;

var pedidoSchema=new Schema({
	Id:ObjectId,
	Persona:{type:String,default:""},
	Cancion:{type:String,default:""},
	Artista:{type:String,default:""},
	Ruta:{type:String,default:""},	
	Fecha:{type: Date, default: Date.now}
},{collection:"Pedido"});

module.exports=mongoose.model("Pedido",pedidoSchema);