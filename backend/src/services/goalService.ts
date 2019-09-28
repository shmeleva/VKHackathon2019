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


export const findAllGoalsByUserId = async (userId: string): Promise<BasicGoalResponse[]> => {
  const goalDocs = await GoalModel.find({ userId });

  const goals: BasicGoalResponse[] = goalDocs.map(goalDoc => ({
    id: goalDoc._id,
    title: goalDoc.title,
    description: goalDoc.description,
    startDate: goalDoc.startDate,
    endDate: goalDoc.endDate,
    weekdays: goalDoc.weekdays.map(day => ({ day })),
    checks: goalDoc.checks.map(date => ({ date })),
    donations: goalDoc.donations.map(amount => ({ amount }))
  }));
  return goals;
};

export const findSingleGoalById = async (goalId: string): Promise<CompleteGoalResponse> => {
  const goalDoc = await GoalModel.findById(goalId);

  if (goalDoc === null) {
    return null
  }

  const { userId } = goalDoc;
  const user = await findUserById(userId);

  if (user === null) {
    return null
  }

  const userGoalResponse: CompleteGoalResponse = {
    id: goalDoc._id,
    title: goalDoc.title,
    description: goalDoc.description,
    startDate: goalDoc.startDate,
    endDate: goalDoc.endDate,
    weekdays: goalDoc.weekdays.map(day => ({ day })),
    checks: goalDoc.checks.map(date => ({ date })),
    donations: goalDoc.donations.map(amount => ({ amount })),
    user
  };
  return userGoalResponse;
}

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