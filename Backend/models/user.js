const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// Function to validate user input
function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    }).options({ presence: 'optional' }); // Set presence to optional for first name and last name

    return schema.validate(user);
}

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "70d",
    });
    return token;
};

const User = mongoose.model("user", userSchema);

module.exports = { User, validateUser };