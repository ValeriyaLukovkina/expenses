import mongoose from 'mongoose';
import type { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URL environment variable inside .env.local');
}

let cachedConnection: Connection | null = null;

export async function connectDB() {
  if (cachedConnection) {
    console.log('✅ Reusing existing MongoDB connection');
    return cachedConnection;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, { dbName: 'expenses' });

    cachedConnection = db.connection;
    console.log('✅ Подключено к MongoDB через Mongoose');
    return cachedConnection;
  } catch (error) {
    console.error('❌ Ошибка подключения к MongoDB:', error);
    throw error;
  }
}
