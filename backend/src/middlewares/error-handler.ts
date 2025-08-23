import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

const ErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({
      message: 'Ошибка валидации данных при создании товара',
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({
      message: 'Данные не найдены',
    });
  }
  if (err instanceof ConflictError) {
    return res.status(err.statusCode).json({
      message: 'Товар с таким названием уже существует',
    });
  }

  return res.status(500).json({
    message: 'Ошибка сервера',
  });
};

export default ErrorHandler;
