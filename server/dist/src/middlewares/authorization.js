"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const models_1 = require("../models");
const authorization = (allowedRoles) => {
    return async (req, res, next) => {
        const user = req.user;
        console.log("Token-оос ирсэн user объект:", user);
        if (!user) {
            return res.status(401).json({ message: "Nevtreegui bn" });
        }
        const userId = user.userId || user.id || user._id || user.sub;
        const userIdFind = await models_1.UserModel.findById(userId);
        if (!userIdFind) {
            return res.status(404).json({ message: "User oldsongui" });
        }
        if (!allowedRoles.includes(userIdFind.role)) {
            return res.status(403).json({
                message: "Eniig hiih erh alga tand"
            });
        }
        next();
    };
};
exports.authorization = authorization;
