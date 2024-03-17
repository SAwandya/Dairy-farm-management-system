const mongoose =require('mongoose');

var Animalschema = new mongoose.Schema({
    earTag:{
        type:String,
        required:true,
        unique:true,
    },
    location:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    name:String,
    breed: String,
    color: String,
    birthDate: {
        type: String,
        
    },
    weight:Number,
    
},{
    timestamps:false,
});

const veterinary =mongoose.model('AnimalRegistry',Animalschema);
module.exports=veterinary;