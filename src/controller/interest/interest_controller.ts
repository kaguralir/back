import { Router } from "express";

import bcrypt from 'bcrypt';
import passport from "passport";
import { interest_repository } from "../../repository/interest/interest_repository";
import { user_repository } from "../../repository/user_repository";


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







InterestController.post('/interestActivity', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {


        console.log("req user is", (req.user['role']));
        console.log("req user is", (req.user['name']));


        /* const actualRole = req.user[0].role;

        console.log("req user is", actualRole); */
        const user = await user_repository.getUser(req.body.email);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});





