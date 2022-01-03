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

        const user = await user_repository.getUser(req.body.username);
        console.log(user);
        if (user) {
            const samePassword = await bcrypt.compare(req.body.password, user.password);
            console.log(samePassword);
            if (samePassword) {
                res.json({
                    loggedIn: true,
                    user,
                    token: generateToken({
                        id: user.user_id,
                        username: user.username
                    })
                });
                return;
            }
        }
        res.status(401).json({ loggedIn: false, error: 'Wrong username and/or password' });


    } catch (error) {
        console.log(error);
        res.status(500).json({ loggedIn: false, error });
    }
});



UserController.get('/account', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.json(req.user);
});


