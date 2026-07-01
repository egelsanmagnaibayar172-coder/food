"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFoodCategory = void 0;
const food_category_model_1 = require("../../models/food.category.model");
const createFoodCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        const existingCategory = await food_category_model_1.FoodCategoryModel.findOne({ categoryName });
        if (existingCategory) {
            return res.status(400).json({ message: "Ene Category burtgelttei bna" });
        }
        const newCategory = await food_category_model_1.FoodCategoryModel.create({ categoryName, description });
        return res.status(201).json({ data: newCategory });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.createFoodCategory = createFoodCategory;
