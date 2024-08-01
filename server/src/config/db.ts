import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mongodb', {
        });
        console.log('MongoDB connected');
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error(`Error: unknown`);
        }

        process.exit(1);
    }
};

export default connectDB;