import { NextFunction, Router } from "express";


import passport from "passport";
import { configurePassport } from "../../../utils/token";
import { SearchedJob } from "../../entity/candidate/searchedJob_entity";
import { searchedJob_repository } from "../../repository/candidate/searchedJob_repository";
import { skillsEntity } from "../../entity/skills_entity";
const fs = require("fs");

export const SearchedJobController = Router();



SearchedJobController.get('/allSearchedJob', async (req, res) => {
    try {
        const post = await searchedJob_repository.getAllSearchedJobs();

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





SearchedJobController.post('/addSearch', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {

        const newSearch = await new SearchedJob(req.body);
        console.log("REQ BODY", req.body);

        const searchExists = await searchedJob_repository.getSearchedJobExists(newSearch.candidat_id);
        if (searchExists) {
            const jobId = searchExists.searchedJob_id;
            const candidateNewInterest = await searchedJob_repository.updateSearch(req.body['user_id'], jobId, req.body);

            return res.status(200).json({
                success: true,
                message: 'Searched Job Updated',
                data: candidateNewInterest
            });

        }
        newSearch.candidateSkills = new skillsEntity(req.body)


        await searchedJob_repository.addSearch(req.body['user_id'], newSearch);

        console.log("SKILLS ARE : ", newSearch.candidateSkills);

        res.status(201).json({
            message: 'New search OK',
            data: newSearch
        });



    } catch (error) {
        console.log("error user controller is", error);
        res.status(500).json(error);
    }
});


// UserController.get('/getSearchJob/:user_id', async (req, res) => {
//     try {
//         const userUploads = await uploads_repository.findByPerson(Number(req.params.user_id));
//         const allUploads: Uploads[] = [];
//         for (const row of allUploads) {
//             let uploads = new Uploads(req.body);

//             allUploads.push(uploads);
//         }
//         const user = await user_repository.getProfile((Number(req.params.user_id)));

//         return res.status(200).json({
//             success: true,
//             data: userUploads, user
//         });
//     } catch (err) {
//         console.log("err", err);
//         return res.status(500).json({
//             success: false,
//             error: 'Server Error'
//         });
//     }
// });





