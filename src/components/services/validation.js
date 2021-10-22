import Joi from "joi-browser";

export const setValidationProperty = (object, property, propertyType) => {
  if (property === "email") {
    object[`${property}`] = Joi.string()
      .required()
      .email()
      .label(`${property}`);
  } else {
    if (propertyType === "string")
      object[`${property}`] = Joi.string().required().label(`${property}`);
    if (propertyType === "number")
      object[`${property}`] = Joi.number().required().label(`${property}`);
    if (propertyType === "object")
      object[`${property.split(".")[0]}`] = Joi.object()
        .required()
        .label(`${property.split(".")[0]}`);
    if (propertyType === "boolean")
      object[`${property}`] = Joi.boolean().required().label(`${property}`);
    if (propertyType === "date")
      object[`${property}`] = Joi.date().required().label(`${property}`);
  }
};

export const validate = (formSchema, formData) => {
  const options = { abortEarly: false };
  const { error } = Joi.validate(formData, formSchema, options);
  if (!error) return null;

  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};

export const validateProperty = (formSchema, { name, value }) => {
  const obj = { [name]: value };
  const schema = { [name]: formSchema[name] };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
};
