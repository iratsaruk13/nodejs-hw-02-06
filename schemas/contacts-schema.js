import Joi from "joi";

const contactsAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().messages({message: "missing field favorite"}),
  });
  
  const contactsUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  export default {
    contactsAddSchema,
    contactsUpdateFavoriteSchema,
  }