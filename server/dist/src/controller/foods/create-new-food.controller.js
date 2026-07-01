"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFoodItem = void 0;
const food_model_1 = require("../../models/food.model");
const createFoodItem = async (req, res) => {
    console.log("Хүсэлт Backend-д хүрлээ!");
    console.log("Ирсэн өгөгдөл (Payload):", req.body);
    try {
        const { foodName, foodPrice, foodImage, category, ingredients } = req.body;
        const newFood = await food_model_1.FoodModel.create({
            foodName,
            foodPrice,
            foodImage,
            category,
            ingredients
        });
        res.status(201).json({
            message: "Khool amjilttai burtgegdlee",
            data: newFood
        });
    }
    catch (error) {
        console.error("Backend Error:", error);
        console.log("-----------------------");
        console.error("БОДИТ АЛДАА:", error.message);
        console.log("-----------------------");
        res.status(500).json({ message: "Aldaa garlaa", error: error.message });
    }
};
exports.createFoodItem = createFoodItem;
