"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const user_schema_1 = require("../../schema/user.schema");
const getAllUsers = async (req, res) => {
    try {
        const users = await user_schema_1.UserModel.find({}).select("-password");
        res.status(200).json({
            message: "Buh Users",
            count: users.length,
            data: users
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Alda garlaa" });
    }
};
exports.getAllUsers = getAllUsers;
