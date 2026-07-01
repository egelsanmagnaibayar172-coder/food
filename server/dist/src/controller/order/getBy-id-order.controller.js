"use strict";
// import { Request, Response } from "express";
// import { OrderModel } from "../../schema/order.schema";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderByIdGet = void 0;
const models_1 = require("../../models");
const getOrderByIdGet = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await models_1.OrderModel.find({ user: userId })
            .populate("foods.food")
            .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: orders
        });
    }
    catch (error) {
        console.error("Order Fetch Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Захиалгын түүх авахад алдаа гарлаа"
        });
    }
};
exports.getOrderByIdGet = getOrderByIdGet;
