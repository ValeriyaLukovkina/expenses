import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URL environment variable inside .env.local');
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log('✅ Reusing existing MongoDB connection');
    return mongoose.connection.getClient();
  };

  try {
    const db = await mongoose.connect(MONGODB_URI, { dbName: 'expenses' });

    isConnected = db.connections[0].readyState === 1;
    console.log('✅ Подключено к MongoDB через Mongoose');
    return mongoose.connection.getClient();
  } catch (error) {
    console.error('❌ Ошибка подключения к MongoDB:', error);
    throw error;
  }
}
