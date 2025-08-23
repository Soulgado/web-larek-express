import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import InternalServerError from '../errors/internal-server-error';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';
import BadRequestError from '../errors/bad-request-error';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Product.find({});

    res.send({
      data: {
        items: data,
        total: data.length,
      },
    });
  } catch (err) {
    if (err instanceof MongooseError) {
      next(new InternalServerError(err.message));
    }
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    description, image, title, category, price,
  } = req.body;

  try {
    const newProduct = await Product.create({
      title, description, image, category, price,
    });

    res.send({ data: newProduct });
  } catch (err) {
    if (err instanceof Error && err.message.includes('E11000')) {
      next(new ConflictError(err.message));
    } else if (err instanceof MongooseError.ValidationError) {
      next(new BadRequestError(err.message));
    } else if (err instanceof MongooseError) {
      next(new InternalServerError(err.message));
    }
  }
};
