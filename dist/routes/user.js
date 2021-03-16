"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const authentication_1 = require("../middlewares/authentication");
const userRoutes = express_1.Router();
// Login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    user_model_1.User.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                message: 'User/Password are not correct'
            });
        }
        if (userDB.comparePassword(body.password)) {
            const userToken = token_1.default.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                avatar: userDB.avatar
            });
            return res.json({
                ok: true,
                token: userToken
            });
        }
        else {
            return res.json({
                ok: false,
                message: 'User/Password are not correct ***'
            });
        }
    });
});
// Create user
userRoutes.post('/create', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    user_model_1.User.create(user).then(userDB => {
        const userToken = token_1.default.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: userToken
        });
    }).catch(userDB => {
        res.json({
            ok: false,
            user: userDB
        });
    });
});
// Update user
userRoutes.post('/update', authentication_1.verifyToken, (req, res) => {
    const user = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email,
        avatar: req.body.avatar || req.user.avatar
    };
    user_model_1.User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                message: 'There is no user with that ID'
            });
        }
        const userToken = token_1.default.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            user: userToken
        });
    });
});
// Get user info
userRoutes.get('/', [authentication_1.verifyToken], (req, res) => {
    const user = req.user;
    res.json({
        ok: true,
        user
    });
});
exports.default = userRoutes;
