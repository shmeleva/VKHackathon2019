import { UserModel } from "../models/User";
import { NextFunction } from "express";
import { check, sanitize, validationResult } from "express-validator";
import "../authentication/passport";
import { findUserById } from "../services/userService";

/**
 * GET /profile
 */
export const getProfile = async (req: any, res: any) => {
    const userId = req.user._id;

    try {
        const user = await findUserById(userId);

        if (user === null) {
            res.status(404).send();
        }
        else {
            res.status(200).send(user);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};

/**
 * POST /logout
 * Log out.
 */
export const logout = (req: any, res: any) => {
    req.logout();
    res.sendStatus(200);
};

/**
 * DELETE /profile/delete
 */
export const deleteProfile = (req: any, res: any, next: NextFunction) => {
    UserModel.remove({ _id: req.user._id }, (err: any) => {
        if (err) { return next(err); }
        req.logout();
        res.send({ msg: "Ваш аккаунт удален." });
    });
};
