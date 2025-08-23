import express from 'express';
import { getProducts, createProduct } from '../controllers/products';
import productValidation from '../middlewares/validations';

const router = express.Router();

router.get('/', getProducts);
router.post('/', productValidation, createProduct);

export default router;
