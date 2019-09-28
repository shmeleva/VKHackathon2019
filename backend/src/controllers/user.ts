import express = require("express");
import { findUserWithGoalsById } from "../services/userService";

export const getUserById = async (req: express.Request, res: express.Response) => {
    const userId = req.params["userId"];
    try {
        const user = await findUserWithGoalsById(userId);

        if (user === null) {
            res.sendStatus(404);
        }
        else {
            res.status(200).send(user);
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
};