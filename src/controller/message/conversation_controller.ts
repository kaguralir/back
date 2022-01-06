import { Router } from "express";
import { jobOffers_repository } from "../../repository/recruiter/jobOffers_repository";
import {JobOffers} from '../../entity/recruiter/jobOffers_entity';
import bcrypt from 'bcrypt';
import { generateToken } from "../../../utils/token";
import passport from "passport";
import { configurePassport } from "../../../utils/token"
import { conversations_repository } from "../../repository/message/conversation_repository";
import { Conversations } from "../../entity/message/conversations_entity";



export const ConversationsController = Router();

ConversationsController.get('/convoPerMatch', async (req, res) => {
    try {
        const convo = await conversations_repository.getAllMessagesPerMutualInterest(req.body);

        return res.status(200).json({
            success: true,
            data: convo
        });
    } catch (err) {
        console.log("err get all jobs is",err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});



ConversationsController.post('/addMessage', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const newMessage = new Conversations(req.body);
       /*  console.log("send data user id is ", req.user);
        console.log("req user is", req.user); */
        
        await conversations_repository.addMessage(newMessage,req.user, req.user,req.user);
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


