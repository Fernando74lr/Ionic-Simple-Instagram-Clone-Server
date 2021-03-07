import { Response, Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import { Post } from "../models/post.model";

const postRoutes = Router();

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