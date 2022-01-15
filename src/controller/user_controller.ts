import { Router } from "express";
import { user_repository } from "../repository/user_repository";
import { User, userSchema } from '../entity/user_entity';
import bcrypt from 'bcrypt';
import { generateToken } from "../../utils/token";
import passport from "passport";
import { configurePassport } from "../../utils/token"
import { Uploads } from "../entity/uploads_entity";
import { cpUpload, createThumbnail, uploader } from "../uploaders/uploads";

export const UserController = Router();

UserController.get('/account', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("req user account", req.user);

    res.json(req.user);

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


UserController.post('/register', cpUpload, async (req, res) => {
    try {

        const { error } = userSchema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({ error: error.details.map(item => item.message) });
            return;
        }

        const newUser = await new User(req.body);

        const exists = await user_repository.getUser(newUser.email);
        if (exists) {
            res.status(400).json({ error: 'Email already taken' });
            return;
        }

        newUser.password = await bcrypt.hash(newUser.password, 11);

        const newUpload = new Uploads(req.files);
        let images = req.files['imageFileName'];
        if (images) {
            images = await createThumbnail(req.files['imageFileName']);
            newUpload.fileName = images;
        }

        let pdf = req.files['pdfFileName'];
        let allPDF: Uploads[] = [];
        for (const item of pdf) {
            let itemPDF = new Uploads(item);
            itemPDF.pdfFileName = item.filename;
            allPDF.push(itemPDF);

        }
        /*    console.log("all pdf", allPDF);
    */

        /*   console.log("AFTER=========================", newUpload); */

        await user_repository.addUser(newUser, images, allPDF);

        res.status(201).json({
            message: 'Nouvel utilisateur enregistré',
            user: newUser, images, allPDF,
            token: generateToken({
                email: newUser.email
            })
        });



    } catch (error) {
        console.log("error is", error);
        res.status(500).json(error);
    }
});





