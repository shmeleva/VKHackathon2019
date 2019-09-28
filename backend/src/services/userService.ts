import { UserModel } from "../models/User";
import { BasicGoalResponse, findAllGoalsByUserId } from "./goalService";

export type CreateUserRequest = {
  firstName: string,
  lastName: string,
  vkontakte: string,
  email: string,
  token: string,
};

export type BasicUserResponse = {
  id: string,
  firstName: string,
  lastName: string
};

export type CompleteUserResponse = BasicUserResponse & {
  goals: BasicGoalResponse[]
};

export const findUserById = async (userId: string): Promise<BasicUserResponse> => {
  const user = await UserModel.findById(userId);

  if (user === null) {
    return null
  }

  const { firstName, lastName } = user
  const userResponse: BasicUserResponse = {
    id: userId,
    firstName,
    lastName
  };
  return userResponse;
};

export const findUserByVkontakteId = async (userVkontakteId: string): Promise<BasicUserResponse> => {
  const user = await UserModel.findOne({ vkontakte: userVkontakteId });

  if (user === null) {
    return null
  }

  const userResponse: BasicUserResponse = {
    id: user._id,
    ...user
  };
  return userResponse;
};

export const findUserWithGoals = async (userId: string): Promise<CompleteUserResponse> => {
  const userResponse = await findUserById(userId);

  if (userResponse == null) {
    return null
  }

  const goals = await findAllGoalsByUserId(userId);

  const userWithGoalsResponse: CompleteUserResponse = {
    ...userResponse,
    goals
  };
  return userWithGoalsResponse;
};