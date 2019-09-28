import express = require("express");
import { findUserWithGoals } from "../services/userService";

export const getUserById = async (req: express.Request, res: express.Response) => {
  const userId = req.params["userId"];
  try {
    const user = await findUserWithGoals(userId);

    if (user === null) {
      res.sendStatus(404);
    }
    else {
      res.status(200).send(user);
    }
  }
  catch (error) {
    res.status(500).send({ error })
  }
};