"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneOrderUpdate = void 0;
const order_schema_1 = require("../../schema/order.schema");
const oneOrderUpdate = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { newStatus } = req.body;
        const validStatuses = ["Pending", "Processing", "Delivered", "Cancelled"];
        if (!validStatuses.includes(newStatus)) {
            return res.status(400).json({ message: "Buruu utga ilgeesen baina" });
        }
        const updatedOrder = await order_schema_1.OrderModel.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order oldsongui" });
        }
        res.status(200).json({
            message: "Zahialga update successfull",
            order: updatedOrder
        });
    }
    catch (error) {
        console.error("Single Update Error:", error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
exports.oneOrderUpdate = oneOrderUpdate;
