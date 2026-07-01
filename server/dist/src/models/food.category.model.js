"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodCategoryModel = void 0;
const mongoose_1 = require("mongoose");
const FoodCategorySchema = new mongoose_1.Schema({
    categoryName: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });
exports.FoodCategoryModel = mongoose_1.models["FoodCategory"] || (0, mongoose_1.model)("FoodCategory", FoodCategorySchema);
