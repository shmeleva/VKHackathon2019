import express = require("express");
import { check, sanitize, validationResult } from "express-validator";
import { findSingleGoalById, CreateGoalRequest, createGoal } from "../services/goalService";

export const getGoalById = async (req: any, res: any) => {
  const goalId = req.params["goalId"];
  try {
    const goal = await findSingleGoalById(goalId);

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


// 2019-09-28T12:00:20.743Z
export const postGoal = async (req: any, res: any) => {
  const userId = req.user._id;
  const createGoalRequest: CreateGoalRequest = {
    title: "wow",
    startDate: new Date("2019-09-28T12:00:20.743Z"),
    endDate: new Date("2019-09-28T12:00:20.743Z"),
    weekdays: [{ day: 2 }, { day: 5 }]
  };

  try {
    const goal = await createGoal(userId, createGoalRequest);
    console.log(goal)
    res.status(200).send(goal)
  }
  catch (error) {
    res.status(500).send({ error })
  }
};

export const postGoalCheck = async (req: any, res: any) => {
  const userId = req.user._id;
  const goalId = req.params["goalId"];
  try {

  }
  catch (error) {
    res.status(500).send({ error })
  }
};

export const postGoalDonate = async (req: any, res: any) => {
  const goalId = req.params["goalId"];
  try {

  }
  catch (error) {
    res.status(500).send({ error })
  }
};

export const deleteGoal = async (req: any, res: any) => {
  const userId = req.user._id;
  const goalId = req.params["goalId"];
  try {

  }
  catch (error) {
    res.status(500).send({ error })
  }
};
