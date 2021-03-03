import { Router, Request, Response } from "express";
import { User } from "../models/user.model";

const userRoutes = Router();

userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
    };

    User.create(user).then(userDB => {        
        res.json({
            ok: true,
            user: userDB
        });
    }).catch(userDB => {
        res.json({
            ok: false,
            user: userDB
        });
    });
});

export default userRoutes;