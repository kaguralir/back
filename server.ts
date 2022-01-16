import express from 'express';
import cors from 'cors';
import { UserController } from './src/controller/user_controller';
import { JobOffersController } from './src/controller/recruiter/jobOffers_controller';
import { InterestController } from './src/controller/interest/interest_controller';
import { configurePassport } from './utils/token'
import passport from 'passport';
import multer from 'multer';



export const server = express();
/* configurePassport(); */
server.use(passport.initialize());
server.use(express.static('public'));
server.use(express.static('public/uploads'));
server.use(express.static(__dirname));
server.use(express.json());
server.use(cors());
/* server.use(express.urlencoded({ limit: '50mb', extended: false })) */
server.use(multer({ dest: './public/uploads/' }).fields([{ name: 'imageFileName' }, { name: 'pdfFileName' }]));



server.use('/api/user', UserController);
server.use('/api/jobOffers', JobOffersController);
server.use('/api/interest', InterestController);






