"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = void 0;
const Category_schema_1 = require("../../schema/Category.schema");
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const deletedCategory = await Category_schema_1.FoodCategoryModel.findByIdAndDelete({ _id: categoryId });
        if (!deletedCategory) {
            res.status(404).json({
                message: "Category oldsongui"
            });
            return;
        }
        res.status(200).json({
            message: "Amjilttai ustgagdlaa",
            data: deletedCategory
        });
    }
    catch (error) {
        console.error("Delete Category Error:", error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
exports.deleteCategory = deleteCategory;
