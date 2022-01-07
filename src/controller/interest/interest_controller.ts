import { Router } from "express";

import bcrypt from 'bcrypt';
import passport from "passport";
import { interest_repository } from "../../repository/interest/interest_repository";
import { user_repository } from "../../repository/user_repository";
import { Interest } from "../../entity/interest/interest_entity";


export const InterestController = Router();

InterestController.get('/jobCandidatesWithInterest/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const CandidatesWithInterest = await interest_repository.getCandidatesWithInterestByJob(req.params.id);

        return res.status(200).json({
            success: true,
            count: CandidatesWithInterest.length,
            data: CandidatesWithInterest
        });
    } catch (err) {
        console.log("candidate with interest error is", err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

InterestController.get('/jobCandidatesWithoutInterest/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const jobCandidatesWithoutInterest = await interest_repository.getJobCandidatesWithoutInterestByJob(req.params.id);

        return res.status(200).json({
            success: true,
            count: jobCandidatesWithoutInterest.length,
            data: jobCandidatesWithoutInterest
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});







InterestController.post('/interestActivity/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {


        console.log("req user is", (req.user['role']));
        console.log("req user is", (req.user['user_id']));
        const actualRole = req.user['role'];
        if (actualRole == "candidat") {
            const interestExists = await interest_repository.getInterestedRecruiterPerJob(req.params.id, req.user['user_id']);

            if (interestExists) {
                const updateInterest = new Interest({
                    interest: req.body.interest
                });
                const interestUpdated = await interest_repository.candidateAnswer(updateInterest, req.params.id);
                return res.status(200).json({
                    success: true,
                    interest: updateInterest,
                    data: interestUpdated
                });
            }

            await interest_repository.candidateInterest(req.params.id, req.user['user_id'], "NULL");
            res.status(200).json({
                message: 'Nouvel intérêt enregistré',
            });


        }

        else {
            const interestExists = await interest_repository.getCandidateInterestedByJob(req.params.id, req.body);

            if (interestExists) {
                const updateInterest = new Interest({
                    interest: req.body.interest
                });
                const interestUpdated = await interest_repository.recruiterAnswer(updateInterest, req.params.id);
                return res.status(200).json({
                    success: true,
                    interest: updateInterest,
                    data: interestUpdated
                });
            }

            const newInterest = await interest_repository.recruiterInterest(req.params.id, req.user['user_id'], "NULL");
            return res.status(200).json({
                message: 'Nouvel intérêt enregistré',
                data: newInterest
            });
        }
    }

    catch (error) {
        console.log("error is", error);
        res.status(500).json(error);
    }
});








