import { Router } from "express";
import passport from "passport";
import { jobOffer } from "../../entity/jobs/jobOffer_entity";
import { Uploads } from "../../entity/uploads_entity";
import { conversations_repository } from "../../repository/message/conversation_repository";
import { uploads_repository } from "../../repository/uploads_repository";




export const ConversationsController = Router();

ConversationsController.get('/mutualInterest/:user_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        console.log("req.user", req.user);
        const actualRole = req.user['role'];

        if (actualRole == "Candidat") {

            const interest = await conversations_repository.candidateAllMutualInterestPerUser((Number(req.user['user_id'])));

            const allUploads: Uploads[] = [];
            const jobPerInterest: jobOffer[] = [];

            for (const oneInterest of interest) {

                const userJoboffer = await uploads_repository.findJobPerId(oneInterest.jobApplied_id);
                let job = new jobOffer(userJoboffer);
                jobPerInterest.push(job);

                const userUploads = await uploads_repository.candidateFindUploadsPerUser(oneInterest.jobApplied_id);

                let uploads = new Uploads(userUploads);

                allUploads.push(uploads);

            }
            return res.status(200).json({
                success: true,
                data: interest, allUploads, jobPerInterest
            });
        }

        const interest = await conversations_repository.recruiterAllMutualInterestPerUser((Number(req.params.user_id)));
        const allUploads: Uploads[] = [];
        const jobPerInterest: jobOffer[] = [];

        for (const oneInterest of interest) {

            const userJoboffer = await uploads_repository.findJobPerId(oneInterest.jobApplied_id);
            let job = new jobOffer(userJoboffer);
            jobPerInterest.push(job);

            const userUploads = await uploads_repository.candidateFindUploadsPerUser(oneInterest.jobApplied_id);

            let uploads = new Uploads(userUploads);

            allUploads.push(uploads);

        }

        return res.status(200).json({
            success: true,
            data: interest, allUploads, jobPerInterest
        });


    } catch (err) {
        console.log("err  is", err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

// ConversationsController.get('/InterestProfile/:user_id', async (req, res) => {
//     try {
//         const interest = await conversations_repository.candidateAllMutualInterestPerUser(Number(req.params.user_id));
//         console.log("interest", interest);

//         const interestProfile = await conversations_repository.candidateAllMutualInterestPerUser((Number(req.params.user_id)));

//         return res.status(200).json({
//             success: true,
//             data: interest, interestProfile
//         });
//     } catch (err) {
//         console.log("err", err);
//         return res.status(500).json({
//             success: false,
//             error: 'Server Error'
//         });
//     }
// });

ConversationsController.get('/convoPerInterest/:mutualInterest_id', async (req, res) => {
    try {
        const convo = await conversations_repository.getAllMessagesPerMutualInterest(Number(req.params.mutualInterest_id));

        return res.status(200).json({
            success: true,
            data: convo
        });
    } catch (err) {
        console.log("err  is", err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});



ConversationsController.post('/addMessage/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        console.log("req add message", req.body);

        const newMessage = req.body.message;
        const interestid = req.body.interestId;
        const sender = req.user['user_id']
        const newMessageSend = await conversations_repository.addMessage(interestid, sender, newMessage);
        console.log("newmessageend", interestid, sender, newMessage);

        res.status(201).json({
            success: true,
            data: newMessage
        })

    }
    catch (error) {
        console.log("post messageerror", error);
        res.status(500).json(error);
    }
});


