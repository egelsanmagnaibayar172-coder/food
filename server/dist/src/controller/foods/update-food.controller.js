"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFood = void 0;
const food_model_1 = require("../../models/food.model");
const mongoose_1 = __importDefault(require("mongoose"));
const updateFood = async (req, res) => {
    try {
        const { foodId } = req.params;
        const updateData = req.body;
        if (typeof foodId !== 'string' || !mongoose_1.default.Types.ObjectId.isValid(foodId)) {
            res.status(400).json({
                success: false,
                message: "Id huchingui.",
            });
            return;
        }
        const updatedFood = await food_model_1.FoodModel.findByIdAndUpdate(foodId, updateData, { new: true, runValidators: true });
        if (!updatedFood) {
            res.status(404).json({
                success: false,
                message: "Khool olsongui",
            });
            return;
        }
        return res.status(200).json({
            success: true,
            message: "Success.",
            data: updatedFood,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Aldaa garlaa",
            error: error.message,
        });
    }
};
exports.updateFood = updateFood;
