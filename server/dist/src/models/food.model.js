"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodModel = exports.FoodSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FoodSchema = new mongoose_1.Schema({
    foodName: { type: String, required: true },
    foodPrice: { type: Number, required: true },
    foodImage: { type: String, default: null },
    quantity: { type: Number, default: 1 },
    ingredients: [{ type: String }],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'FoodCategory',
        required: true
    }
}, { timestamps: true });
exports.FoodModel = mongoose_1.models["Food"] || (0, mongoose_1.model)("Food", exports.FoodSchema);
