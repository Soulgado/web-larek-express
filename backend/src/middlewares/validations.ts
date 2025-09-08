import { celebrate, Joi, Segments } from 'celebrate';

const productSchema = Joi.object({
  title: Joi.string().required().min(2).max(30)
    .messages({
      'string.required': 'Поле "title" должно быть заполнено',
      'string.min': 'Минимальная длина поля "title" - 2',
      'string.max': 'Максимальная длина поля "title" - 30',
    }),
  image: Joi.object().required().messages({
    'object.required': 'Поле "image" должно быть заполнено',
  }),
  category: Joi.string().required().messages({
    'string.required': 'Поле "category" должно быть заполнено',
  }),
  description: Joi.string(),
  price: Joi.number(),
});

const productValidation = celebrate({
  [Segments.BODY]: productSchema,
});

export default productValidation;
