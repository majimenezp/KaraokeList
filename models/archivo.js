var mongoose=require("mongoose")
	,Schema=mongoose.Schema
	,ObjectId=Schema.ObjectId;

var archivoSchema=new Schema({
	Id:ObjectId,
	Archivo:{type:String,default:""},
	Ruta:{type:String,default:""},
	Artista:{type:String,default:""},
	_keywords:{type:String,default:""}
},{collection:"Archivo"});

module.exports=mongoose.model("Archivo",archivoSchema);