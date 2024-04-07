const yup = require('yup');

const validateAnim = (schema) => async (req, res, next) => {
    const body = req.body;
    try {
        await schema.validate(body); 
        next();
    } catch (error) {
        res.status(400).json({ message: error.message || "Validation failed" });
    }
}

module.exports = validateAnim;
