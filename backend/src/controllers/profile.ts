import { UserModel } from "../models/User";
import { NextFunction } from "express";
import { check, sanitize, validationResult } from "express-validator";
import "../authentication/passport";
import { findUserById } from "../services/userService";

/**
 * GET /logout
 * Log out.
 */
export const logout = (req: any, res: any) => {
    req.logout();
    res.sendStatus(200);
};

/**
 * GET /profile
 */
export const getProfile = async (req: any, res: any) => {
    const userId = req.user._id;

    check(userId).isMongoId();

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/contact");
    }

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
 * PUT /profile/update
 * Update profile information.
 */
export const updateProfile = (req: any, res: any, next: NextFunction) => {
    UserModel.findOne({ _id: req.user._id }, (err: any, user: any) => {
        if (err) { return next(err); }
        user.firstName = req.body.firstName || "";
        user.lastName = req.body.lastName || "";
        user.save(() => res.send({ msg: "Профиль успешно обновлен." }));
    });
};

/**
 * DELETE /profile/delete
 * Delete an account.
 */
export const deleteProfile = (req: any, res: any, next: NextFunction) => {
    UserModel.remove({ _id: req.user._id }, (err: any) => {
        if (err) { return next(err); }
        req.logout();
        res.send({ msg: "Ваш аккаунт удален." });
    });
};
