import { Router } from "express";

import bcrypt from 'bcrypt';
import passport from "passport";
import { interest_repository } from "../../repository/interest/interest_repository";
import { user_repository } from "../../repository/user_repository";
import { Interest } from "../../entity/interest/interest_entity";
import { User } from "../../entity/user_entity";
import { uploads_repository } from "../../repository/uploads_repository";


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
        console.log("req", req.params.id);

        const jobCandidatesWithoutInterest = await interest_repository.getJobCandidatesWithoutInterestByJob(Number(req.params.id));


        for (const candidate of jobCandidatesWithoutInterest) {
            const user = candidate.user_id;

            const userUploads = await uploads_repository.findImagePerUser(user);

            for (const row of userUploads) {

                if (row.fileName !== null) {
                    candidate.images = [];
                    candidate.images.push(row.fileName);

                }
            }
        }
        return res.status(200).json({
            success: true,
            count: jobCandidatesWithoutInterest.length,
            data: jobCandidatesWithoutInterest
        });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});




InterestController.post('/interestActivity/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const actualRole = req.user['role'];

        if (actualRole == "Candidat") {
            const job_id = req.body.job;
            const candidat_id = req.user['user_id'];
            console.log("REQ BODY", req.body);

            const interestExists = await interest_repository.getInterestedRecruiterPerJob(job_id, candidat_id);


            /*             if (interestExists.recruiterJobOffer_id == null) {
             */
            if (!interestExists) {
                const interest = req.body.interest;
                if (interest === 0) {
                    const candidateNewInterest = await interest_repository.candidateInterest(job_id, candidat_id, 0);
                    return res.status(200).json({
                        success: true,
                        message: 'Candidate not interested registered',
                        data: candidateNewInterest
                    });
                }
                const candidateNewInterest = await interest_repository.candidateInterest(job_id, candidat_id, null);

                return res.status(200).json({
                    success: true,
                    message: 'Candidate interested registered',
                    data: candidateNewInterest
                });
            }

            const answerExists = await interest_repository.getCandidatAnswer(job_id, candidat_id);
            if (answerExists) { //answerExists
                const interest = req.body.interest;// à revoir: comment déterminer si l'intérêt est bien celui d'une réponse déjà envoyé?
                const candidateNewInterest = await interest_repository.updateCandidateAnswer(answerExists.interest_id, job_id, candidat_id, interest);

                return res.status(200).json({
                    success: true,
                    message: 'Réponse du candidat mise à jour ',
                    data: candidateNewInterest
                });

            }

            const interest = req.body.interest;
            const interestUpdated = await interest_repository.candidateAnswer(interest, interestExists.interest_id);


            return res.status(200).json({
                success: true,
                message: "Réponse du candidat enregistré ",
                data: interestUpdated
            });


        }

        else {


            const jobApplied_id = req.body.job;
            const candidat_id = req.body.candidate_id;
            const recruiter_id = req.user['user_id']
            console.log("req body", req.body);


            const candidateInterest = await interest_repository.getCandidateInterestedByJob(jobApplied_id, candidat_id);
            console.log("candidate interest", candidateInterest);

            const recruiterAlreadyAnswer = await interest_repository.getRecruiterAnswer(jobApplied_id, candidat_id);


            if (recruiterAlreadyAnswer) {
                const interestId = recruiterAlreadyAnswer.interest_id;
                const interest = req.body.interest;
                const recruiterInterest = await interest_repository.updateRecruiterAnswer(interestId, jobApplied_id, candidat_id, recruiter_id, interest);

                return res.status(200).json({
                    success: true,
                    message: 'Réponse recruteur mise à jour',
                    data: recruiterInterest
                });

            }


            if (!candidateInterest) {
                const interest = req.body.interest;
                if (interest === 0) {
                    const recruiterInterest = await interest_repository.recruiterInterest(jobApplied_id, candidat_id, req.user['user_id'], 0);
                    return res.status(200).json({
                        success: true,
                        message: 'Nouvel intérêt recruteur enregistré',
                        data: recruiterInterest
                    });
                }

                const recruiterInterest = await interest_repository.recruiterInterest(jobApplied_id, candidat_id, req.user['user_id'], null)
                return res.status(200).json({
                    success: true,
                    message: 'Nouvel intérêt recruteur enregistré',
                    data: recruiterInterest
                });

            }


            const interest_id = candidateInterest.interest_id// ?
            const interest = req.body.interest;

            const recruiterAnswer = await interest_repository.recruiterAnswer(interest_id, jobApplied_id, candidat_id, interest);
            return res.status(200).json({
                success: true,
                message: 'Réponse du recruteur enregistré',
                data: recruiterAnswer
            });

        }
    }

    catch (error) {
        console.log("error interest controller is", error);
        res.status(500).json(error);
    }
});


InterestController.delete('/interestActivity/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const actualRole = req.user['role'];

        if (actualRole == "candidat") {

            await interest_repository.deleteCandidateInterest(Number(req.params.id), req.user['user_id']);
            res.end();
        }

        else {

            await interest_repository.deleteRecruiterInterest(Number(req.params.id), req.user['user_id']);//rajouter candidat
            res.end();
        }
    }

    catch (error) {
        console.log("error is", error);
        res.status(500).json(error);
    }
});









