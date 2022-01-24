import { Router } from "express";
import { jobOffers_repository } from "../../repository/recruiter/jobOffers_repository";
import { JobOffers } from '../../entity/recruiter/jobOffers_entity';
import bcrypt from 'bcrypt';
import { generateToken } from "../../../utils/token";
import passport from "passport";
import { configurePassport } from "../../../utils/token"



export const JobOffersController = Router();

JobOffersController.get('/allJobs', async (req, res) => {
    try {
        const post = await jobOffers_repository.getAllJobOffers();

        return res.status(200).json({
            success: true,
            count: post.length,
            data: post
        });
    } catch (err) {
        console.log("err get all jobs is", err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});



JobOffersController.post('/addJob', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const newJob = new JobOffers(req.body);
        await jobOffers_repository.addJob(newJob, req.user['user_id']);

        console.log("new", newJob);
        console.log("new", req.user['user_id']);
        res.status(201).json({
            success: true,
            data: newJob
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


JobOffersController.get('/getJobs', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const candidate_id = req.user['user_id'];
        const post = await jobOffers_repository.getJobs(candidate_id);

        return res.status(200).json({
            success: true,
            count: post.length,
            data: post
        });
    } catch (err) {
        console.log("err getjobs is", err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

JobOffersController.get('/getCandidates', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const recruiter_id = req.user['user_id']
        if (recruiter_id) {
            const post = await jobOffers_repository.getCandidate(recruiter_id);

            return res.status(200).json({
                success: true,
                count: post.length,
                data: post
            });
        }

    } catch (err) {
        console.log("err getjobs is", err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});