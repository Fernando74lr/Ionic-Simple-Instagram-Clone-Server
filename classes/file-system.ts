import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {
    
    constructor() {};

    saveImageTemp(file: FileUpload, userId: string) {

        return new Promise((res: any, rej) => {
            // Create folders
            const path = this.createUserFolder(userId);
    
            // Filename
            const filename = this.generateUniqueName(file.name);
            
            // Move file from Temp to our folder
            file.mv(`${path}/${filename}`, (err: any) => {
                if (err) {
                    // It failed
                    rej(err);
                } else {
                    // Allright!
                    res();
                }
            });
        });
    
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

    imagesFromTempToPost(userId: string) {
        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPost = path.resolve(__dirname, '../uploads/', userId, 'posts');

        if (!fs.existsSync(pathTemp)) {
            return [];
        }

        if (!fs.existsSync(pathPost)) {
            fs.mkdirSync(pathPost, {recursive: true});
        }

        const imagesTemp = this.getImagesInTemp(userId);

        imagesTemp.forEach(image => {
            fs.renameSync(`${pathTemp}/${image}`, `${pathPost}/${image}`);
        });

        return imagesTemp;
    }

    private getImagesInTemp(userId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs.readdirSync(pathTemp) || [];

    }
}