"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = void 0;
const food_model_1 = require("../../models/food.model");
const mongoose_1 = __importDefault(require("mongoose"));
const deleteFood = async (req, res) => {
    try {
        const { foodId } = req.params;
        if (typeof foodId !== 'string') {
            return res.status(400).json({
                success: false,
                message: "ID bhq",
            });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({
                success: false,
                message: "id huchingui",
            });
        }
        const deletedFood = await food_model_1.FoodModel.findByIdAndDelete(foodId);
        if (!deletedFood) {
            return res.status(404).json({
                success: false,
                message: "Khool oldsongui",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Success",
            data: deletedFood,
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
exports.deleteFood = deleteFood;
