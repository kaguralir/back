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







InterestController.post('/interestActivity/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {




        console.log("req user is", (req.user['role']));
        console.log("req user is", (req.user['user_id']));
        const actualRole = req.user['role'];

        if (actualRole == "candidat") {
            const interestExists = await interest_repository.getInterestedRecruiterPerJob(req.body.jobApplied_id, req.user['user_id']);
            console.log("interest exists", interestExists);

            if (interestExists) {
                const job_id = req.body.jobApplied_id;
                const candidat_id = req.body.candidateWhoApplied_id;
                const updateInterest = new Interest(1, job_id, candidat_id, req.user['user_id'], 0);
                const interestUpdated = await interest_repository.candidateAnswer(req.body.interest_id, updateInterest, req.body.jobApplied_id);
                console.log("interestUpdated", interestUpdated);

                return res.status(200).json({
                    success: true,
                    interest: updateInterest,
                    data: interestUpdated
                });
            }

            const candidateNewInterest = await interest_repository.candidateInterest(req.body.jobApplied_id, req.user['user_id'], "NULL");
            console.log("candidateNewInterest", candidateNewInterest);

            res.status(200).json({
                message: 'Nouvel intérêt enregistré',
            });


        }

        else {


            const jobApplied_id = req.body.jobApplied_id;
            const candidat_id = req.body.candidateWhoApplied_id;

            const exists = await interest_repository.getCandidateInterestedByJob(jobApplied_id, candidat_id);

            console.log("exists is", jobApplied_id, candidat_id, req.user['user_id']);
            console.log("exists is", exists);

            if (exists.interest_id == undefined) {
                const recruiterInterest = await interest_repository.recruiterInterest(jobApplied_id, candidat_id, req.user['user_id']);
                console.log("recruiter interest", recruiterInterest);

                return res.status(200).json({
                    success: true,
                    count: recruiterInterest,
                    data: recruiterInterest
                });

            }
/*             const interest_id = Number(req.params.jobApplied_id)// a revoir
 */            const interest_id = Number(req.body.jobApplied_id)// a revoir

            const interest = "";

            const recruiterAnswer = await interest_repository.recruiterAnswer(interest_id, jobApplied_id, candidat_id, interest);
            console.log("recruiter answer", recruiterAnswer);

            //  if (interestExists) {
            //     const updateInterest = new Interest({
            //         interest: req.body.interest
            //     });
            //     /*                 const interestUpdated = await interest_repository.recruiterAnswer(updateInterest, req.params.jobApplied_id, req.body.interest_id, req.body.candidat_id);
            //      */
            //     const interestUpdated = await interest_repository.recruiterAnswer(updateInterest, req.params.jobApplied_id, req.body, req.body);
            //     console.log("interestUpdated", interestUpdated);

            //     return res.status(200).json({
            //         success: true,
            //         interest: updateInterest,
            //         data: interestUpdated
            //     });
            // } 

            // const newInterest = await interest_repository.recruiterInterest(req.params.jobApplied_id, req.body, req.user['user_id'], "NULL");
            // console.log("newInterest", newInterest);

            // return res.status(200).json({
            //     message: 'Nouvel intérêt enregistré',
            //     data: newInterest
            // });
        }
    }

    catch (error) {
        console.log("error is", error);
        res.status(500).json(error);
    }
});








