"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    ;
    saveImageTemp(file, userId) {
        return new Promise((res, rej) => {
            // Create folders
            const path = this.createUserFolder(userId);
            // Filename
            const filename = this.generateUniqueName(file.name);
            // Move file from Temp to our folder
            file.mv(`${path}/${filename}`, (err) => {
                if (err) {
                    // It failed
                    rej(err);
                }
                else {
                    // Allright!
                    res();
                }
            });
        });
    }
    generateUniqueName(originalName) {
        const nameArr = originalName.split('.');
        const extension = nameArr[nameArr.length - 1];
        const uniqueID = uniqid_1.default();
        return `${uniqueID}.${extension}`;
    }
    createUserFolder(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        const exists = fs_1.default.existsSync(pathUser);
        if (!exists) {
            fs_1.default.mkdirSync(pathUser, { recursive: true });
            fs_1.default.mkdirSync(pathUserTemp, { recursive: true });
        }
        return pathUserTemp;
    }
}
exports.default = FileSystem;
