"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFood = void 0;
const models_1 = require("../../models");
const getAllFood = async (req, res) => {
    try {
        const food = await models_1.FoodModel.find().populate("category");
        console.log("Populated Food:", JSON.stringify(food, null, 2));
        res.status(200).json({
            message: "Buh Khool",
            count: food.length,
            data: food
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Alda garlaa" });
    }
};
exports.getAllFood = getAllFood;
