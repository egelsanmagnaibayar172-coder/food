"use strict";
// import mongoose from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const connectToMongoDB = async ()=>{
//     try{
//         await mongoose.connect(process.env.MONGODB_CONNECTION_STRINGz!)
//         console.log("Connect to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDb", error)
//     }
// }
// export default connectToMongoDB;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToMongoDB = async () => {
    const mongoUri = process.env.MONGODB_CONNECTION_STRING;
    if (!mongoUri) {
        console.error("Error: MONGODB_CONNECTION_STRING is undefined. Check your .env file.");
        return;
    }
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log("Connect to MongoDB successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDb", error);
    }
};
exports.default = connectToMongoDB;
