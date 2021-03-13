import { Response, Router } from "express";
import FileSystem from "../classes/file-system";
import  { FileUpload }  from "../interfaces/file-upload";
import { verifyToken } from "../middlewares/authentication";
import { Post } from "../models/post.model";

const postRoutes = Router();
const fileSystem = new FileSystem();

// Get paginated posts
postRoutes.get('/', async (req: any, res: Response) => {

    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    skip = skip * 10;

    const posts = await Post.find()
                            .sort({_id: -1})
                            .skip(skip)
                            .limit(10)
                            .populate('user', '-password')
                            .exec();

    res.json({
        ok: true,
        posts
    });

});

// Create post
postRoutes.post('/', [verifyToken], (req: any, res: Response) => {

    const body = req.body;
    body.user = req.user._id;

    const images = fileSystem.imagesFromTempToPost(req.user._id);
    body.imgs = images;

    Post.create(body).then( async postDB => {
        // Get user's data using its ID
        await postDB.populate('user', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    }).catch(err => {
        res.json(err);
    });

});

// Service to upload files
postRoutes.post('/upload', [verifyToken], async (req: any, res: Response) => {
    
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No file was uploaded'
        });
    }

    const file: FileUpload = req.files.image;

    if (!file) {
        return res.status(400).json({
            ok: false,
            message: 'No file was uploaded - image'
        });
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            message: 'File uploaded is not an image'
        });
    }

    await fileSystem.saveImageTemp(file, req.user._id); 

    res.json({
        ok: true,
        file: file.mimetype
    });
});

postRoutes.get('/image/:userid/:img', (req: any, res: Response) => {
    const userId = req.params.userid;
    const img = req.params.img;

    const pathPhoto = fileSystem.getPhotoUrl(userId, img);

    res.sendFile(pathPhoto);

    res.json({
        userId,
        img
    });
});

export  default postRoutes;