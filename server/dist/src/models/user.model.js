"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (UserRole = {}));
const UserSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    isVerified: { type: Boolean, default: false, required: false },
    ttl: { type: Date, required: false },
    verificationToken: { type: String },
    phoneNumber: { type: String },
    address: { type: String, required: true },
    refreshToken: { type: String },
    resetPasswordOtp: { type: String },
    resetPasswordExpires: { type: Date },
    // orderedFoods: { type: Schema.Types.ObjectId[] },
}, { timestamps: true });
UserSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });
exports.UserModel = mongoose_1.models["User"] || (0, mongoose_1.model)("User", UserSchema);
