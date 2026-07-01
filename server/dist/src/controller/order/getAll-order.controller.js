"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrder = void 0;
const models_1 = require("../../models");
// export const getAllOrder = async (req: Request, res: Response) => {
//     try {
//         const orders = await OrderModel.find()
//             .populate("user", "name email") 
//             .populate({
//                 // path: "foodOrderItems.foodId", 
//                 path: "foods.food",
//                 model: "Food"
//             })
//             .sort({ createdAt: -1 }); 
//         return res.status(200).json({
//             message: "Success",
//             count: orders.length,
//             data: orders
//         });
//     } catch (error) {
//         console.error("GetAllOrder Error:", error);
//         return res.status(500).json({ message: "Server-д алдаа гарлаа" });
//     }
// };
const getAllOrder = async (req, res) => {
    try {
        const orders = await models_1.OrderModel.find()
            .populate("user", "name email address")
            .populate({
            path: "foods.food",
            model: "Food"
        })
            .sort({ createdAt: -1 });
        // Schema дээрх 'foods'-ийг Frontend-ийн 'foodOrderItems' руу хөрвүүлэх
        const formattedOrders = orders.map(order => {
            const orderObj = order.toObject();
            return {
                ...orderObj,
                foodOrderItems: orderObj.foods // foods-ийг foodOrderItems нэрээр явуулна
            };
        });
        return res.status(200).json({
            message: "Success",
            count: formattedOrders.length,
            data: formattedOrders
        });
    }
    catch (error) {
        console.error("GetAllOrder Error:", error.message);
        return res.status(500).json({ message: "Server-д алдаа гарлаа" });
    }
};
exports.getAllOrder = getAllOrder;
