import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET, FRONTEND_URI } from "./utils/secrets";

const MongoStore = mongo(session);

/**
 * Controllers.
 */

import * as profileController from "./controllers/profile";
import * as userController from "./controllers/user";
import * as goalController from "./controllers/goal";

/**
 * Passport configuration.
 */

import * as passportConfig from "./authentication/passport";
import { UserModel } from "./models/User";

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
    () => {
        //mongoose.connection.db.dropDatabase(function (err, result) { });
    },
).catch(err => {
    //console.error("MongoDB connection error. Please make sure MongoDB is running. " + err);
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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", FRONTEND_URI);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

/**
 * API routes.
 */

app.get("/profile", passportConfig.isAuthenticated, profileController.getProfile);
app.get("/profile/logout", profileController.logout);

app.get("/users/:userId", userController.getUserById);

app.get("/goals/:goalId", goalController.getGoalById);
app.post("/goals/create", passportConfig.isAuthenticated, goalController.postGoal);
app.post("/goals/:goalId/check", passportConfig.isAuthenticated, goalController.postGoalCheck);
app.post("/goals/:goalId/uncheck", passportConfig.isAuthenticated, goalController.postGoalUncheck);
app.post("/goals/:goalId/donate", goalController.postGoalDonate);
app.post("/goals/:goalId/delete", passportConfig.isAuthenticated, goalController.postGoalDelete);

/**
 * VKontakte authentication routes.
 */

app.get("/auth/vkontakte", passport.authenticate("vkontakte", { scope: ["email", "public_profile"] }));
app.get("/auth/vkontakte/callback", passport.authenticate("vkontakte", { failureRedirect: `${FRONTEND_URI}/login` }), function (req: any, res: any) {
    if (req.user || req.session.user) {
        return res.redirect(`${FRONTEND_URI}/main`);
    }
    return res.redirect(`${FRONTEND_URI}/login`);
});

export default app;
