import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log(`MongoDb already connected`);
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // stop trying after 5 seconds
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000, // initial connection timeout
    });

    console.log(`Mongo DB connection successful `, conn.connection.host);
  } catch (e) {
    console.log(`Error while connecting database : `, e);

    process.exit(1);
  }
};
