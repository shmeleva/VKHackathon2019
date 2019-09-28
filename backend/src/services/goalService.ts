import { GoalModel, Goal } from "../models/Goal";
import { BasicUserResponse, findUserById } from "./userService";
import { InstanceType } from "@hasezoey/typegoose";

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

const fromDocument = (goalDocument: InstanceType<Goal>): BasicGoalResponse => {
  return {
    id: goalDocument._id,
    title: goalDocument.title,
    description: goalDocument.description,
    startDate: goalDocument.startDate,
    endDate: goalDocument.endDate,
    weekdays: goalDocument.weekdays.map(day => ({ day })),
    checks: goalDocument.checks.map(date => ({ date })),
    donations: goalDocument.donations.map(amount => ({ amount }))
  }
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
    ...fromDocument(goalDocument),
    user
  };
};

export const findGoalsByUserId = async (userId: string): Promise<BasicGoalResponse[]> => {
  const goalDocuments = await GoalModel.find({ userId });
  return goalDocuments.map(d => fromDocument(d));
};

export const createGoalForUser = async (userId: string, request: CreateGoalRequest): Promise<string> => {
  const {
    title,
    description,
    startDate,
    endDate,
    weekdays
  } = request;

  const goalModel = new GoalModel();
  goalModel.userId = userId;
  goalModel.title = title;
  goalModel.description = description;
  goalModel.startDate = startDate;
  goalModel.endDate = endDate;
  goalModel.weekdays = weekdays.map(x => x.day);

  const goalWithId = await goalModel.save();
  return goalWithId._id;
};

export const toggleGoalCheck = async (userId: string, goalId: string, check: Date): Promise<void> => {
  //const goalDocument = 
};

export const donateToGoal = async (goalId: string, amount: number): Promise<void> => {
  await GoalModel.findOneAndUpdate({ _id: goalId }, { "$push": { "donations": amount } });
};

export const deleteGoal = async (userId: string, goalId: string): Promise<void> => {
  await GoalModel.deleteOne({ _id: goalId, userId });
};