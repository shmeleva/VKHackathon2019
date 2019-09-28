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
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

UserModel.find({}, (err, res) => console.log(res))

/**
 * API routes.
 */

app.get("/logout", profileController.logout);

app.get("/profile", passportConfig.isAuthenticated, profileController.getProfile);
app.put("/profile/update", passportConfig.isAuthenticated, profileController.updateProfile);
app.delete("/profile/delete", passportConfig.isAuthenticated, profileController.deleteProfile);

app.get("/users/:userId", userController.getUserById);

app.get("/goals/:goalId", goalController.getGoalById);
app.get("/createGoal", passportConfig.isAuthenticated, goalController.postGoal); // POST /goals/create
app.get("/goals/:goalId/check", passportConfig.isAuthenticated, goalController.postGoalCheck);  // POST /goals/:goalId/check
app.get("/goals/:goalId/donate", goalController.postGoalDonate); // POST /goals/:goalId/donate
app.delete("/goals/:goalId/delete", goalController.deleteGoal);

/**
 * VKontakte authentication routes.
 */
app.get("/auth/vkontakte", passport.authenticate("vkontakte", { scope: ["email", "public_profile"] }));
app.get("/auth/vkontakte/callback", passport.authenticate("vkontakte", { failureRedirect: "/login" }), (_req, res) => {
    res.sendStatus(200);
});

export default app;
