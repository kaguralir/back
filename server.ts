import express from 'express';
import cors from 'cors';



import { UserController } from './src/controller/user_controller';
import { JobOffersController } from './src/controller/recruiter/jobOffers_controller';
import { MutualActivity } from './src/controller/mutualActivity/mutualActivity_controller';



export const server = express();


server.use(express.json());
server.use(cors());

server.use('/api/user', UserController);
server.use('/api/jobOffers', JobOffersController);
server.use('/api/mutual', MutualActivity)


