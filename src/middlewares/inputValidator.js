//Here we use Joi and Schema Data Validator
//Used to Validate the input
const Joi = require("joi");

const userSchema = Joi.object({
  name : Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

//this will use to validate user and used as
//validator
const validateUser = (req, res, next) => {
  const {error} = userSchema.validate(req.body);
  if(error){
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
}

module.exports = validateUser;