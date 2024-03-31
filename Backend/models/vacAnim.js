const mongoose =require('mongoose');

var VacAnimSchema = new mongoose.Schema({
    earTag:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    vaccine:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    vacdate: {
        type: String,
        required:true,
        
    },
    nextdate: {
        type: String,
        required:true,
        
    },
    
},{
    timestamps:false,
});

const veterinary1 =mongoose.model('VaccinatedAnimals',VacAnimSchema );
module.exports=veterinary1;