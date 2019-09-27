import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./utils/secrets";

const MongoStore = mongo(session);

/**
 * Controllers.
 */

import * as profileController from "./controllers/profile";

/**
 * Passport configuration.
 */

import * as passportConfig from "./authentication/passport";

/**
 * Create Express server.
 */

const app = express();

/**
 * Connect to MongoDB.
 */

const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true }).then(
    () => { },
).catch(err => {
    console.error("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit(1);
});

/**
 * Express configuration.
 */

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

/**
 * API routes.
 */
app.get("/logout", profileController.logout);
app.get("/profile", passportConfig.isAuthenticated, profileController.getProfile);
app.put("/profile/update", passportConfig.isAuthenticated, profileController.updateProfile);
app.delete("/profile/delete", passportConfig.isAuthenticated, profileController.deleteProfile);

/**
 * VKontakte authentication routes.
 */
app.get("/auth/vkontakte", passport.authenticate("vkontakte", { scope: ["email", "public_profile"] }));
app.get("/auth/vkontakte/callback", passport.authenticate("vkontakte", { failureRedirect: "/login" }), (_req, res) => {
    res.sendStatus(200);
});

export default app;
