"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    foods: [{
            food: { type: mongoose_1.Schema.Types.ObjectId, ref: "Food", required: true },
            quantity: { type: Number, required: true, default: 1 }
        }],
    totalPrice: { type: Number },
    address: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Delivered", "Cancelled"],
        default: "Pending"
    },
}, { timestamps: true });
exports.OrderModel = mongoose_1.models["Order"] || (0, mongoose_1.model)("Order", OrderSchema);
