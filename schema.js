const Joi = require("joi");
module.exports.reviewSchema = Joi.object({

    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),

});



module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string()
      .required()
      .messages({
        "string.empty": "Title should not be empty",
        "any.required": "Title is required",
      }),
    description: Joi.string().allow("").optional(),
    price: Joi.number()
      .required()
      .messages({
        "number.base": "Price must be a number",
        "any.required": "Price should not be empty",
      }),
    location: Joi.string()
      .required()
      .messages({
        "string.empty": "Location should not be empty",
        "any.required": "Location is required",
      }),
    country: Joi.string()
      .required()
      .messages({
        "string.empty": "Country should not be empty",
        "any.required": "Country is required",
      }),
  }).required()
});
