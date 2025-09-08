import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { faker } from '@faker-js/faker';

import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

enum PaymentType {
  Card = 'card',
  Online = 'online',
}

interface IOrder {
  payment: PaymentType;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

const checkItems = async (items: string[]) => {
  items.forEach(async (item) => {
    const res = await Product.findById({ item });
    if (!res || !res.price) {
      throw new Error('Data not found');
    }
  });
};

const checkSum = async (values: IOrder) => {
  const { items, total } = values;

  const prices = await Product.find({ _id: { $in: items } }, 'price');

  const actualSum = prices.reduce((sum, item) => sum + item.price, 0);

  if (actualSum !== total) {
    throw new Error('Total is wrong');
  }

  return values;
};

const orderSchema = Joi.object({
  items: Joi.array().items(Joi.string()).min(1).external(checkItems),
  total: Joi.number().required(),
  payment: Joi.string().valid(...Object.values(PaymentType)).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
}).external(checkSum);

function validateOrder(order: IOrder) {
  orderSchema.validateAsync(order)
    .then((data: any) => {
      if (data.error) {
        throw new Error(`Validation error: ${data.error.message}`);
      }
      return data.value;
    });
}

const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const newOrder = req.body;

  try {
    validateOrder(newOrder);
  } catch (error) {
    next(new BadRequestError('Ошибка валидации данных при создании заказа'));
  }

  res.status(201).send({
    id: faker.string.uuid(),
    total: newOrder.total,
  });
};

export default createOrder;
