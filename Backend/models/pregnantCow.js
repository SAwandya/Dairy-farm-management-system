const mongoose = require('mongoose');

const PregnantAnimalSchema = new mongoose.Schema({
    earTag: {
        type: String,
    },
    maleCowMateId: {
        type: String,
        required: true,
    },
    dateOfMate: {
        type: String, 
    },
    isPregnant: {
        type: String, 
    },
    calvingDate: {
        type: String, 
       
    },
}, {
    timestamps: true, 
});


const PregnantAnimal = mongoose.model('PregnantAnimal', PregnantAnimalSchema);

module.exports = PregnantAnimal;
