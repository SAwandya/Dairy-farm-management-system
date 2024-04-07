const mongoose = require('mongoose');
const yup = require('yup');

var Animalschema = new mongoose.Schema({
    earTag: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    name: String,
    breed: String,
    color: String,
    birthDate: {
        type: String,
    },
    weight: Number,
}, {
    timestamps: false,
});

const veterinary = mongoose.model('AnimalRegistry', Animalschema);

const schema = yup.object().shape({
    earTag: yup.string().required(),
    location: yup.string().required(),
    gender: yup.string().required(),
    batch: yup.string().required(),
    age: yup.string().required(),
    name: yup.string(),
    breed: yup.string(),
    color: yup.string(),
    birthDate: yup.string(),
    weight: yup.number(),
});

module.exports = {
    veterinary,
    Animalschema,
    schema
};
