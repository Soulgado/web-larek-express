import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import cookierParser from 'cookie-parser';
require('dotenv').config();

import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import logger from './middlewares/logger';

const DB_ADDRESS = process.env.DB_ADDRESS;
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger.requestLogger);
app.use(cookierParser());
app.use(express.json());

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.use(logger.errorLogger);
console.log(DB_ADDRESS);

mongoose.connect(DB_ADDRESS!);
app.listen(PORT);
