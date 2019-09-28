import express = require("express");
import { check, sanitize, validationResult } from "express-validator";
import { findUserGoalById, CreateGoalRequest, createUserGoal, checkUserGoal, donateToUserGoal, deleteUserGoal, uncheckUserGoal } from "../services/goalService";

export const getGoalById = async (req: any, res: any) => {
    const goalId = req.params["goalId"];
    try {
        const goal = await findUserGoalById(goalId);

        if (goal === null) {
            res.sendStatus(404);
        }
        else {
            res.status(200).send(goal);
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
};


export const postGoal = async (req: any, res: any) => {
    const userId = req.user._id;

    check("title", "title must not be empty").not().isEmpty();
    check("startDate", "startDate must be a string in ISO format (ISO 8601)").isISO8601();
    check("endDate", "endDate must be a string in ISO format (ISO 8601)").isISO8601();
    check("weekdays", "weekdays must be an array of length [1, 7]").isArray({ min: 1, max: 7 });
    // TODO: Validate the format of weekdays: [{ day: 2 }, { day: 5 }].

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
        return;
    }

    const requestBody: CreateGoalRequest = req.body;

    try {
        const goal = await createUserGoal(userId, requestBody);
        if (goal === null) {
            res.status(400).send();
        }
        else {
            res.status(200).send(goal);
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
};

export const postGoalCheck = async (req: any, res: any) => {
    const userId = req.user._id;
    const goalId = req.params["goalId"];

    check("date", "date must be a string in ISO format (ISO 8601)").isISO8601();

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
        return;
    }

    try {
        const goal = await checkUserGoal(userId, goalId, new Date(req.body.date));
        if (goal === null) {
            res.status(404).send();
        }
        else {
            res.status(200).send(goal);
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
};

export const postGoalUncheck = async (req: any, res: any) => {
    const userId = req.user._id;
    const goalId = req.params["goalId"];

    check("date", "date must be a string in ISO format (ISO 8601)").isISO8601();

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
        return;
    }

    try {
        const goal = await uncheckUserGoal(userId, goalId, new Date(req.body.date));
        if (goal === null) {
            res.status(404).send();
        }
        else {
            res.status(200).send(goal);
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
};

export const postGoalDonate = async (req: any, res: any) => {
    const goalId = req.params["goalId"];

    check("amount", "amount must be a positive number").isFloat({ gt: 0 });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
        return;
    }

    const amount = req.body.amount;

    try {
        const goal = await donateToUserGoal(goalId, amount);
        if (goal === null) {
            res.status(404).send();
        }
        else {
            res.status(200).send(goal);
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
};

export const postGoalDelete = async (req: any, res: any) => {
    const userId = req.user._id;
    const goalId = req.params["goalId"];

    try {
        const deleteCount = await deleteUserGoal(userId, goalId);
        if (!deleteCount) {
            res.status(404).send();
        }
        else {
            res.status(200).send();
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
};
