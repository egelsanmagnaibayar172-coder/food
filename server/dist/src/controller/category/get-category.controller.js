"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoodCategoryById = void 0;
const Category_schema_1 = require("../../schema/Category.schema");
const getFoodCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const foodCategory = await Category_schema_1.FoodCategoryModel.findById(categoryId);
        if (!foodCategory) {
            return res.status(404).json({ message: "Category oldsongui" });
        }
        res.status(200).json({
            message: "Category олдлоо",
            data: foodCategory
        });
    }
    catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
exports.getFoodCategoryById = getFoodCategoryById;
