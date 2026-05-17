import mongoose from 'mongoose';

const connectDb = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI not defined');
        }
            await mongoose.connect(process.env.MONGO_URI);
            console.log('MongoDB Connect hogaya hai');
        
    } catch (error: any ) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;