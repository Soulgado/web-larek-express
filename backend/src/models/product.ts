import mongoose from 'mongoose';

interface IImage {
  filename: string,
  originalName: string
}

interface IProduct {
    title: string,
    image: IImage,
    category: string,
    description: string,
    price: number
}

const imageSchema = new mongoose.Schema<IImage>({
  filename: String,
  originalName: String,
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
  },
  image: {
    type: imageSchema,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
