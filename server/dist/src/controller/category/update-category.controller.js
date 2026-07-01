"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = void 0;
const food_category_model_1 = require("../../models/food.category.model");
const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categoryName, description } = req.body;
        const updatedCategory = await food_category_model_1.FoodCategoryModel.findByIdAndUpdate(categoryId, { categoryName, description }, { new: true, runValidators: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category oldsongui" });
        }
        res.status(200).json({
            message: "Update successfull",
            data: updatedCategory
        });
    }
    catch (error) {
        console.error("Update Error:", error.message);
        res.status(500).json({
            message: "Aldaa garlaa",
            error: error.message
        });
    }
};
exports.updateCategory = updateCategory;
