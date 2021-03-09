import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';

export default class FileSystem {
    
    constructor() {};

    saveImageTemp(file: FileUpload, userId: string) {
        
        const path = this.createUserFolder(userId);
    }

    private createUserFolder(userId: string) {

        const pathUser = path.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);
        
        const exists = fs.existsSync(pathUser);

        if (!exists) {
            fs.mkdirSync(pathUser, {recursive: true});
            fs.mkdirSync(pathUserTemp, {recursive: true});
        }

        return pathUserTemp;
    }

}