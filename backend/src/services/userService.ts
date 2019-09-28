import { UserModel } from "../models/User";
import { BasicGoalResponse, findGoalsByUserId } from "./goalService";

export type BasicUserResponse = {
  id: string,
  firstName: string,
  lastName: string
};

export type CompleteUserResponse = BasicUserResponse & {
  goals: BasicGoalResponse[]
};

export const findUserById = async (userId: string): Promise<BasicUserResponse> => {
  const userDocument = await UserModel.findById(userId);

  if (userDocument === null) {
    return null
  }

  const { firstName, lastName } = userDocument
  return {
    id: userId,
    firstName,
    lastName
  };
};

export const findUserWithGoalsById = async (userId: string): Promise<CompleteUserResponse> => {
  const user = await findUserById(userId);

  if (user == null) {
    return null
  }

  const goals = await findGoalsByUserId(userId);

  return {
    ...user,
    goals
  }
};