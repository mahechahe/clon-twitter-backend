import mongoose from 'mongoose'
import { MONGO_URI } from './config.js'

export const connectionDb = async () => {
    try {
        const db = await mongoose.connect(MONGO_URI)
        console.log("Database is connected to", db.connection.name);
    } catch (error) {
        console.error(error.message);
    }
}