"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoodByIdGet = void 0;
const food_model_1 = require("../../models/food.model");
const getFoodByIdGet = async (req, res) => {
    try {
        const { foodId } = req.params;
        const food = await food_model_1.FoodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: "Khool olsongui" });
        }
        res.status(200).json(food);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
exports.getFoodByIdGet = getFoodByIdGet;
