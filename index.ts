import dotenv from 'dotenv';

dotenv.config();
import { server } from "./server";

import passport from 'passport';
import { configurePassport } from './utils/token';

configurePassport();

const port: number = Number(process.env.PORT) || 8000;

server.listen(port, () => {

    console.log(`Listening on ${port}`);

});
