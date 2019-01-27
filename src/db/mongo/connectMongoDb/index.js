import mongoose from 'mongoose';

// DB Config
import { MONGO_URI } from '../../../config';

export default async () => {
  try {
    // Fix Depreication Warning
    mongoose.set('useFindAndModify', false);
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    console.log('MongoDB Connected...'); 
  } catch (exception) {
    // Log Exception
    console.error(exception);
  }
};