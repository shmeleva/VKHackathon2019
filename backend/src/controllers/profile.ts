import { UserModel } from "../models/User";
import { Request, Response, NextFunction } from "express";
//import { check, sanitize, validationResult } from "express-validator";
import "../authentication/passport";
import { GoalModel } from "../models/Goal";

/**
 * GET /logout
 * Log out.
 */
export const logout = (req: Request, res: Response) => {
    req.logout();
    res.sendStatus(200);
};

/**
 * GET /profile
 */
export const getProfile = (req: Request, res: Response) => {
    const goal = new GoalModel();
    goal.title = "Quit smoking...";
    goal.user = (req.user as any)._id;
    goal.startDate = new Date();
    goal.endDate = new Date();

    goal.save((err: Error) => {

    });

    GoalModel.find({ user: (req.user as any)._id }, (err: any, goals: any) => {
        res.status(200).send(goals);
    })

    //res.status(200).send();
};

/**
 * PUT /profile/update
 * Update profile information.
 */
export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
    UserModel.findById((req.user as any)._id, (err: any, user: any) => {
        if (err) { return next(err); }
        // TODO: Validation + type body + functional.
        user.firstName = req.body.firstName || "";
        user.lastName = req.body.lastName || "";
        user.save(() => res.send({ msg: "Профиль успешно обновлен." }));
    });
};

/**
 * DELETE /profile/delete
 * Delete an account.
 */
export const deleteProfile = (req: Request, res: Response, next: NextFunction) => {
    UserModel.remove({ _id: (req.user as any)._id }, (err: any) => {
        if (err) { return next(err); }
        req.logout();
        res.send({ msg: "Ваш аккаунт удален." });
    });
};
