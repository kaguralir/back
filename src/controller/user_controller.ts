import { Router } from "express";
import { user_repository } from "../repository/user_repository";
import {User} from '../entity/user_entity';
import bcrypt from 'bcrypt';
import { generateToken } from "../../utils/token";
import passport from "passport";
import { configurePassport } from "../../utils/token"


export const UserController = Router();

UserController.get('/allCompanies', async (req, res) => {
    try {
        const post = await user_repository.getAllCompanies();

        return res.status(200).json({
            success: true,
            count: post.length,
            data: post
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});



UserController.post('/login', async (req, res) => {
    try {
        const user = await user_repository.getUser(req.body.email);

        if (user) {
            let samePWD = await bcrypt.compare(req.body.password, user.password)
            if (samePWD) {
                res.json({
                    user,
                    loggedIn: true,
                    token: generateToken({
                        id: user.user_id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    })
                });
                console.log("user is ", user);

                return
            }
        }
        res.status(401).json({ loggedIn: false, error: ' Wrong email / password' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


UserController.get('/account', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.json(req.user);
});


