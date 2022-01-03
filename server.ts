import express from 'express';
import cors from 'cors';
import { UserController } from './src/controller/user_controller';


export const server = express();


server.use(express.json());
server.use(cors());

server.use('/api/user', UserController)
