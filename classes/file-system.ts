import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {
    
    constructor() {};

    saveImageTemp(file: FileUpload, userId: string) {
        
        // Create folders
        const path = this.createUserFolder(userId);

        // Filename
        const filename = this.generateUniqueName(file.name);
        console.log(file.name);        
        console.log(filename);
        


    }

    private generateUniqueName(originalName: string) {
        const nameArr = originalName.split('.');
        const extension = nameArr[nameArr.length - 1];
        const uniqueID = uniqid();

        return `${uniqueID}.${extension}`;
    }

    private createUserFolder(userId: string) {

        const pathUser = path.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        
        const exists = fs.existsSync(pathUser);

        if (!exists) {
            fs.mkdirSync(pathUser, {recursive: true});
            fs.mkdirSync(pathUserTemp, {recursive: true});
        }

        return pathUserTemp;
    }

}