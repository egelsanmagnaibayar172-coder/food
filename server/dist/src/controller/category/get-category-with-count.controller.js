"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryWithCount = void 0;
const food_category_model_1 = require("../../models/food.category.model");
const getCategoryWithCount = async (req, res) => {
    try {
        const categories = await food_category_model_1.FoodCategoryModel.aggregate([
            {
                $lookup: {
                    from: "foods",
                    localField: "_id",
                    foreignField: "category",
                    as: "foods",
                },
            },
            {
                $addFields: {
                    categoryId: "$_id"
                }
            },
            {
                $project: {
                    _id: 1,
                    categoryName: 1,
                    count: { $size: "$foods" },
                    foods: 1,
                },
            },
        ]);
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ message: "Алдаа гарлаа" });
    }
};
exports.getCategoryWithCount = getCategoryWithCount;
