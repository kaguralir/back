import { ExtractJwt, Strategy } from 'passport-jwt';
import { getRepository } from 'typeorm';
import {User} from '../src/entity/user_entity';
import jwt from 'jsonwebtoken';
import passport from 'passport';

export function generateToken(payload, expire = 60 * 60) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expire });
    return token;


}

export function configurePassport() {
    passport.use(new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET

    }, async (payload, done) => {

        try {
            const user = await getRepository(User).findOne({email:payload.email},{relations:['shoppingCart']});

            if (user)
                return done(null, user);

            return done(null, false)
        } catch (error) {
            console.log(error);
            return done(error, false);
        }
    }))

}
