import express from 'express';
import cors from 'cors';
import { UserController } from './src/controller/user_controller';
import { JobOffersController } from './src/controller/recruiter/jobOffers_controller';
import { InterestController } from './src/controller/interest/interest_controller';
import { configurePassport } from './utils/token'
import passport from 'passport';
import multer from 'multer';



export const server = express();

server.use(cors());


configurePassport();
server.use(express.urlencoded({limit: '2000mb', extended: false,  parameterLimit:50000,type:'application/x-www-form-urlencoded' }));
server.use(express.text({ limit: '2000mb' }));
server.use(express.json({limit:'200mb',type:'application/json'}));
server.use(passport.initialize());
server.use(express.static('public'));



server.use('/api/user', UserController);
server.use('/api/jobOffers', JobOffersController);
server.use('/api/interest', InterestController);






