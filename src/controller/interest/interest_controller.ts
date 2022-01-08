import { Router } from "express";

import bcrypt from 'bcrypt';
import passport from "passport";
import { interest_repository } from "../../repository/interest/interest_repository";
import { user_repository } from "../../repository/user_repository";
import { Interest } from "../../entity/interest/interest_entity";
import { User } from "../../entity/user_entity";


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
        const jobCandidatesWithoutInterest = await interest_repository.getJobCandidatesWithoutInterestByJob(Number(req.params.id));

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







InterestController.post('/interestActivity/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const actualRole = req.user['role'];

        if (actualRole == "candidat") {
            const job_id = req.body.jobApplied_id;
            const candidat_id = req.user['user_id'];
            const interestExists = await interest_repository.getInterestedRecruiterPerJob(job_id, candidat_id);


            /*             if (interestExists.recruiterJobOffer_id == null) {
             */
            if (!interestExists) {
                const candidateNewInterest = await interest_repository.candidateInterest(job_id, candidat_id);

                return res.status(200).json({
                    success: true,
                    message: 'Nouvel intérêt candidat enregistré',
                    data: candidateNewInterest
                });


            }
            console.log("interest exists", interestExists.candidateWhoApplied_id);
            console.log("interest", interestExists);


            const interest = req.body.interest;
            const interestUpdated = await interest_repository.candidateAnswer(interest, interestExists.interest_id);
            console.log("interestUpdated", interest);

            return res.status(200).json({
                success: true,
                message: "Réponse du candidat enregistré",
                data: interestUpdated
            });


        }

        else {


            const jobApplied_id = req.body.jobApplied_id;
            const candidat_id = req.body.candidateWhoApplied_id;

            const exists = await interest_repository.getCandidateInterestedByJob(jobApplied_id, candidat_id);

            console.log("exists is", jobApplied_id, candidat_id, req.user['user_id']);
            console.log("exists is", exists);

            if (!exists.interest_id) {
                const recruiterInterest = await interest_repository.recruiterInterest(jobApplied_id, candidat_id, req.user['user_id']);
                console.log("recruiter interest", recruiterInterest);

                return res.status(200).json({
                    success: true,
                    count: recruiterInterest,
                    data: recruiterInterest
                });

            }
/*             const interest_id = Number(req.params.jobApplied_id)// a revoir
 */         const interest_id = exists.interest_id// a revoir

            const interest = req.body.interest;

            const recruiterAnswer = await interest_repository.recruiterAnswer(interest_id, jobApplied_id, candidat_id, interest);
            console.log("recruiter answer", recruiterAnswer);

        }
    }

    catch (error) {
        console.log("error is", error);
        res.status(500).json(error);
    }
});








