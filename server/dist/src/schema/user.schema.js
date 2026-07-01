"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
const UserSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, enum: ["USER", "ADMIN"], default: UserRole.USER },
    isVerified: { type: Boolean, default: false },
    address: { type: String },
    otpCode: { type: String },
    otpExpires: { type: Date },
    phoneNumber: { type: String },
    resetPasswordOtp: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
    userName: { type: String },
    refreshToken: { type: String },
    ttl: { type: Date, required: false },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
