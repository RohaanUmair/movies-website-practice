import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

export async function connectToDb() {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: 'movie_website-db'
        });
    } catch (error) {
        throw error;
    }
}