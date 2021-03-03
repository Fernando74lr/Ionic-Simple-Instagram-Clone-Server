"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes = express_1.Router();
userRoutes.get('/test', (req, res) => {
    res.json({
        'ok': true,
        'message': 'Everything allright!'
    });
});
exports.default = userRoutes;
