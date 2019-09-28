import { GoalModel } from "../models/Goal";
import { BasicUserResponse, findUserById } from "./userService";
import { ObjectId } from "mongodb";

export type CreateGoalRequest = {
  title: string,
  description?: string,
  startDate: Date,
  endDate: Date,
  weekdays: Array<{
    day: number
  }>
};

export type BasicGoalResponse = CreateGoalRequest & {
  id: string,
  checks: Array<{
    date: Date
  }>,
  donations: Array<{
    amount: number
  }>
};

export type CompleteGoalResponse = BasicGoalResponse & {
  user: BasicUserResponse
};

export const findGoalById = async (goalId: string): Promise<CompleteGoalResponse> => {
  const goalDocument = await GoalModel.findById(goalId);

  if (goalDocument === null) {
    return null
  }

  const { userId } = goalDocument;
  const user = await findUserById(userId);

  if (user === null) {
    return null
  }

  return {
    id: goalDocument._id,
    title: goalDocument.title,
    description: goalDocument.description,
    startDate: goalDocument.startDate,
    endDate: goalDocument.endDate,
    weekdays: goalDocument.weekdays.map(day => ({ day })),
    checks: goalDocument.checks.map(date => ({ date })),
    donations: goalDocument.donations.map(amount => ({ amount })),
    user
  };
};

export const findGoalsByUserId = async (userId: string): Promise<BasicGoalResponse[]> => {
  const goalDocuments = await GoalModel.find({ userId });

  return goalDocuments.map(goalDocument => ({
    id: goalDocument._id,
    title: goalDocument.title,
    description: goalDocument.description,
    startDate: goalDocument.startDate,
    endDate: goalDocument.endDate,
    weekdays: goalDocument.weekdays.map(day => ({ day })),
    checks: goalDocument.checks.map(date => ({ date })),
    donations: goalDocument.donations.map(amount => ({ amount }))
  }));
};

export const createGoal = async (userId: string, createGoalRequest: CreateGoalRequest): Promise<string> => {
  const goalModel = new GoalModel();
  goalModel.title = createGoalRequest.title;
  goalModel.description = createGoalRequest.description;
  goalModel.userId = userId;
  goalModel.startDate = createGoalRequest.startDate;
  goalModel.endDate = createGoalRequest.endDate;
  goalModel.weekdays = createGoalRequest.weekdays.map(x => x.day);
  goalModel.checks = [];
  goalModel.donations = [];

  const goalDoc = await goalModel.save();
  return goalDoc._id;
}

export const toggleGoalCheck = async (userId: string, goalId: string, check: Date): Promise<void> => {

}

export const donateToGoal = async (userId: string, goalId: string, amount: number): Promise<void> => {

}

export const deleteGoal = async (userId: string, goalId: string): Promise<void> => {

}