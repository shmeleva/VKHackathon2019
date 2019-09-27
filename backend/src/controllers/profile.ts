import { User, UserDocument } from "../models/User";
import { Request, Response, NextFunction } from "express";
//import { check, sanitize, validationResult } from "express-validator";
import "../authentication/passport";

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
    res.status(200).send(req.user);
};

/**
 * PUT /profile/update
 * Update profile information.
 */
export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
    User.findById((req.user as UserDocument)._id, (err, user: UserDocument) => {
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
    User.remove({ _id: (req.user as UserDocument)._id }, (err) => {
        if (err) { return next(err); }
        req.logout();
        res.send({ msg: "Ваш аккаунт удален." });
    });
};
