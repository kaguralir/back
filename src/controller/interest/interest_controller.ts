import { Router } from "express";

import bcrypt from 'bcrypt';
import passport from "passport";
import { interest_repository } from "../../repository/interest/interest_repository";


export const InterestController = Router();

InterestController.get('/jobCandidatesWithInterest/:id', passport.authenticate('jwt', { session: false }),  async (req, res) => {
    try {
        const CandidatesWithInterest = await interest_repository.getCandidatesWithInterestByJob(req.user);

        return res.status(200).json({
            success: true,
            count: CandidatesWithInterest.length,
            data: CandidatesWithInterest
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

InterestController.get('/jobCandidatesWithoutInterest/:id',  passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const jobCandidatesWithoutInterest = await interest_repository.getJobCandidatesWithoutInterestByJob(req.user);

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









