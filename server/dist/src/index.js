"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const mongoDb_1 = __importDefault(require("./mongoDb"));
const router_1 = require("./router");
const user_schema_1 = require("./schema/user.schema");
const order_router_1 = require("./router/order.router");
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = [
    "https://food-delivery-s682.onrender.com",
    "https://food-delivery-6d8u.onrender.com",
    "https://food-delivery-iota-five.vercel.app",
    "https://food-one-peach.vercel.app/",
    "http://localhost:3000",
    "http://localhost:8000",
    "https://food-1-b08e.onrender.com",
    "https://food-woad-one-15.vercel.app/",
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.get("/get-users", async (req, res) => {
    const users = await user_schema_1.UserModel.find({});
    res.status(200).send({ message: "users avlaa", data: users });
});
app.use('/users', router_1.userRouter);
app.use("/foods", router_1.foodRouter);
app.use("/foods-category", router_1.foodCategoryRouter);
app.use("/foods-order", order_router_1.orderRouter);
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
    try {
        await (0, mongoDb_1.default)();
        console.log(`Server is running on port ${PORT}`);
    }
    catch (err) {
        console.error("MongoDB connection failed:", err);
    }
});
// // app.listen(8000, () => console.log("http://localhost:8000"));
