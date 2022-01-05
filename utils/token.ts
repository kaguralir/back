import { ExtractJwt, Strategy } from 'passport-jwt';
import {User} from '../src/entity/user_entity';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { user_repository } from "../src/repository/user_repository";



export function generateToken(payload:any, expire = 60 * 60) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expire });
    return token;


}


export function configurePassport() {
    passport.use(new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, async (payload, done) => {


        try {
            const user = await user_repository.getUser(payload.email);

            if (user) {

                return done(null, user);
            }

            return done(null, false);
        } catch (error) {
            console.log("jwt error is",error);
            return done(error, false);
        }
    }))

}
