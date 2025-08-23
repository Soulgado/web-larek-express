import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import cookierParser from 'cookie-parser';

import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import logger from './middlewares/logger';

const { PORT, DB_ADDRESS } = process.env;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger.requestLogger);
app.use(cookierParser());

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.use(logger.errorLogger);

mongoose.connect(DB_ADDRESS!);
app.listen(PORT);
