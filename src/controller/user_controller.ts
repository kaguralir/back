import { NextFunction, Router } from "express";
import { user_repository } from "../repository/user_repository";
import { uploads_repository } from "../repository/uploads_repository";

import { User } from '../entity/user_entity';
import bcrypt from 'bcrypt';
import { generateToken } from "../../utils/token";
import passport from "passport";
import { configurePassport } from "../../utils/token"
import { Uploads } from "../entity/uploads_entity";
import { uploadImage, uploadPdf } from "../uploaders/uploads";
const fs = require("fs");

export const UserController = Router();

UserController.get('/account', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("req user account", req.user);

    res.json(req.user);
    console.log("usr", req.user);


});

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
                        user_id: user.user_id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    })


                });
                console.log("user is", user);

                return
            }
        }
        res.status(401).json({ loggedIn: false, error: ' Wrong email / password' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


UserController.post('/register', async (req, res, next) => {
    try {

        const newUser = await new User(req.body);

        const exists = await user_repository.getUser(newUser.email);
        if (exists) {
            res.status(400).json({ error: 'Email already taken' });
            return;
        }

        newUser.password = await bcrypt.hash(newUser.password, 11);



        let newImages: Uploads[] = [];
        if (req.body.file.length > 0) {
            for (const oneImage of req.body.file) {
                const baseImage = await uploadImage(oneImage);
                let image = new Uploads(baseImage);
                image.fileName = baseImage.toString();

                newImages.push(image);
                newUser.images = newImages;
                // console.log("NEW IMAGES", image);

            }

            /*  console.log("NEW IMAGES", newImages); */
        }


        if (req.body.pdf.length > 0) {
            const pdfFile = await uploadPdf(req.body.pdf)
            newUser.pdfs = new Uploads({ pdfFileName: pdfFile, user: newUser })
        } 
        await user_repository.addUser(newUser);
        res.status(201).json({
            message: 'Nouvel utilisateur enregistr??',
            user: newUser,
            token: generateToken({
                email: newUser.email
            })
        });



    } catch (error) {
        console.log("error user controller is", error);
        res.status(500).json(error);
    }
});


UserController.get('/getProfile/:user_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const userUploads = await uploads_repository.findUploadsPerUser(Number(req.params.user_id));
        const allUploads: Uploads[] = [];
        for (const row of allUploads) {
            let uploads = new Uploads(req.body);

            allUploads.push(uploads);
        }
        const user = await user_repository.getProfile((Number(req.params.user_id)));

        return res.status(200).json({
            success: true,
            data: userUploads, user
        });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});





UserController.get('/getSearchedJob/:user_id', async (req, res) => {
    try {
        const userUploads = await uploads_repository.findUploadsPerUser(Number(req.params.user_id));
        const allUploads: Uploads[] = [];
        for (const row of allUploads) {
            let uploads = new Uploads(req.body);

            allUploads.push(uploads);
        }
        const user = await user_repository.getProfile((Number(req.params.user_id)));

        return res.status(200).json({
            success: true,
            data: userUploads, user
        });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});
