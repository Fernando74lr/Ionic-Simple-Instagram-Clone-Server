import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";

const userRoutes = Router();

// Login
userRoutes.post('/login', (req: Request, res: Response) => {
    
    const body = req.body;

    User.findOne({email: body.email}, (err: any, userDB: any) => {

        if (err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                message: 'User/Password are not correct'
            });
        }

        if (userDB.comparePassword(body.password)) {
            const userToken = Token.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                avatar: userDB.avatar
            });
            return res.json({
                ok: true,
                token: userToken
            });
        } else {
            return res.json({
                ok: false,
                message: 'User/Password are not correct ***'
            });
        }
    });

});

// Create user
userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };

    User.create(user).then(userDB => {        
        
        const userToken = Token.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });
        
        res.json({
            ok: true,
            token: userToken
        });

    }).catch(userDB => {
        res.json({
            ok: false,
            user: userDB
        });
    });
});

export default userRoutes;