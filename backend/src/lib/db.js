import mongoose from 'mongoose';

export default async function connectDB(uri) {
  if (!uri) throw new Error('MONGODB_URI is not set');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
