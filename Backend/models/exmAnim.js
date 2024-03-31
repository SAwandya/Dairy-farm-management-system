const mongoose =require('mongoose');

var ExamAnimSchema = new mongoose.Schema({
    earTag:{
        type:String,
        required:true,
    },
    currentStatus:{
        type:String,
        required:true,
    },
    exam:{
        type:String,
        required:true,
    },
    checkdate: {
        type: String,
        required:true,
        
    },
    
},{
    timestamps:false,
});

const veterinary2 =mongoose.model('ExaminedAnimals',ExamAnimSchema );
module.exports=veterinary2;