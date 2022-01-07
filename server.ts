import express from 'express';
import cors from 'cors';
import { UserController } from './src/controller/user_controller';
import { JobOffersController } from './src/controller/recruiter/jobOffers_controller';
import { InterestController } from './src/controller/interest/interest_controller';
import { configurePassport } from './utils/token'
import passport from 'passport';

export const server = express();
configurePassport();
server.use(passport.initialize());
server.use(express.static('public'));
server.use(express.json());
server.use(cors());

server.use('/api/user', UserController);
server.use('/api/jobOffers', JobOffersController);
server.use('/api/interest', InterestController);




