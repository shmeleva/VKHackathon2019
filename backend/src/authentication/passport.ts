import passport from "passport";
import passportVKontakte from "passport-vkontakte";
import _ from "lodash";

import { UserModel } from "../models/User";
import { Request, Response, NextFunction } from "express";

import { VKONTAKTE_ID, VKONTAKTE_SECRET } from "../utils/secrets";

const VKontakteStrategy = passportVKontakte.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new VKontakteStrategy({
    clientID: VKONTAKTE_ID,
    clientSecret: VKONTAKTE_SECRET,
    callbackURL: "/auth/vkontakte/callback"
}, (accessToken, _refreshToken, _params, profile, done) => {
    UserModel.findOne({ vkontakte: profile.id }, (err, existingUser) => {
        if (err) { return done(err); }

        if (existingUser) {
            return done(undefined, existingUser);
        }

        const user: any = new UserModel();
        user.firstName = profile.name.givenName;
        user.lastName = profile.name.familyName;
        user.vkontakte = profile.id;
        user.token = accessToken;

        user.save((err: Error) => {
            done(err, user);
        });
    });
}));

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(401);
};
