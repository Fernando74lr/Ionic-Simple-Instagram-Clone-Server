"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const user_1 = __importDefault(require("./routes/user"));
const server = new server_1.default();
// Routes
server.app.use('/user', user_1.default);
// Raise server
server.start(() => {
    console.log(`Server listening in port: ${server.port}`);
});
