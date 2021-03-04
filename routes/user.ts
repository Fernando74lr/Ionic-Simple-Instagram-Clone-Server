import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';

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
            return res.json({
                ok: true,
                token: 'LKSNKLDNFEWFDFMKDMFKSL'
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