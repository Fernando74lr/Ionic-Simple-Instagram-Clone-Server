import { Response, Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import { Post } from "../models/post.model";

const postRoutes = Router();

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

export  default postRoutes;