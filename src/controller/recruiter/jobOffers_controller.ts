import { Router } from "express";
import { jobOffers_repository } from "../../repository/recruiter/jobOffers_repository";
import { JobOffers } from '../../entity/recruiter/jobOffers_entity';
import bcrypt from 'bcrypt';
import { generateToken } from "../../../utils/token";
import passport from "passport";
import { configurePassport } from "../../../utils/token"
import { jobTags } from "../../entity/recruiter/tagsEntity";



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

JobOffersController.get('/getavgjob', async (req, res) => {
    try {
        const post = await jobOffers_repository.getAVGjobRoleOffer();

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
JobOffersController.get('/getjobsthisyear', async (req, res) => {
    try {
        const post = await jobOffers_repository.getJobsOfferPerThisYear();

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
JobOffersController.get('/getnonupdatedjobs', async (req, res) => {
    try {
        const post = await jobOffers_repository.getNonUpdatedJob();

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


JobOffersController.get('/getJobsWithoutCandidateInterest', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const candidate_id = req.user['user_id'];


        const getJobs = await jobOffers_repository.getJobsWithoutCandidateInterest(candidate_id);

        return res.status(200).json({
            success: true,
            count: getJobs.length,
            data: getJobs
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
        console.log("new", req.body);

        console.log("req.body.tags.length", req.body.tags.length);
        if (req.body.tags.length > 0) {
            let newTag: jobTags[] = [];

            for (const oneTag of req.body.tags) {
                newTag.push(oneTag);
                newJob.tagDescription = newTag;

            }
        }

        console.log("NWJOV", newJob);


        await jobOffers_repository.addJob(req.user['user_id'], newJob);
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

JobOffersController.get('/getJobByRecruiter/:recruiter_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const recruiter_id = req.user['user_id']
        console.log("recruiter", recruiter_id);

        if (recruiter_id) {
            const post = await jobOffers_repository.getJobByRecruiter(Number(req.params.recruiter_id));

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

JobOffersController.get('/getOnejob/:job_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {



        const post = await jobOffers_repository.getJobByRecruiter(Number(req.params.job_id));

        return res.status(200).json({
            success: true,
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