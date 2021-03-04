"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() { }
    // Return token with its payload
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({
            user: payload
        }, this.seed, { expiresIn: this.expiration });
    }
    // Check if the token has our seed (is trusted)
    static checkToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    // Do not trust
                    reject();
                }
                else {
                    // Valid token
                    resolve(decoded);
                }
            });
        });
    }
}
exports.default = Token;
Token.seed = 'this-is-the-seed-of-my-secret-app';
Token.expiration = '30d';
