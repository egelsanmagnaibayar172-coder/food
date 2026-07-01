"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFoodCategory = void 0;
const Category_schema_1 = require("../../schema/Category.schema");
const getAllFoodCategory = async (req, res) => {
    try {
        const foodCategory = await Category_schema_1.FoodCategoryModel.find();
        console.log("Oldsongui", foodCategory);
        res.status(200).json({
            message: "Buh Category",
            count: foodCategory.length,
            data: foodCategory
        });
    }
    catch (error) {
        console.error("GetAll Error:", error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
exports.getAllFoodCategory = getAllFoodCategory;
