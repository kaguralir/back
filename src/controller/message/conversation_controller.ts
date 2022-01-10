import { Router } from "express";
import { jobOffers_repository } from "../../repository/recruiter/jobOffers_repository";
import { JobOffers } from '../../entity/recruiter/jobOffers_entity';
import bcrypt from 'bcrypt';
import { generateToken } from "../../../utils/token";
import passport from "passport";
import { configurePassport } from "../../../utils/token"
import { conversations_repository } from "../../repository/message/conversation_repository";
import { Conversations } from "../../entity/message/conversations_entity";
import { interest_repository } from "../../repository/interest/interest_repository";



export const ConversationsController = Router();

ConversationsController.get('/convoPerInterest', async (req, res) => {
    try {
        const convo = await conversations_repository.getAllMessagesPerMutualInterest(req.body);

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



ConversationsController.post('/addMessage/:interest_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const newMessage = req.body.messageSend;
        await conversations_repository.addMessage(Number(req.params.interest_id), req.user['user_id'], newMessage);
        res.status(201).json({
            success: true,
            data: newMessage
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


