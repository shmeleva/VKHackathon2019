import { GoalModel, Goal } from "../models/Goal";
import { BasicUserResponse, findUserById } from "./userService";
import { InstanceType } from "@hasezoey/typegoose";

export interface CreateGoalRequest {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    weekdays: {
        day: number;
    }[];
}

export type BasicGoalResponse = CreateGoalRequest & {
    id: string;
    checks: {
        date: Date;
    }[];
    donations: {
        amount: number;
    }[];
};

export type CompleteGoalResponse = BasicGoalResponse & {
    user: BasicUserResponse;
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
    };
};

export const findUserGoalById = async (goalId: string): Promise<CompleteGoalResponse> => {
    const goalDocument = await GoalModel.findById(goalId);

    if (goalDocument === null) {
        return null;
    }

    const { userId } = goalDocument;
    const user = await findUserById(userId);

    if (user === null) {
        return null;
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

export const createUserGoal = async (userId: string, request: CreateGoalRequest): Promise<string> => {
    const {
        title,
        description,
        startDate,
        endDate,
        weekdays
    } = request;

    const goalModel = new GoalModel();

    try {
        goalModel.userId = userId;
        goalModel.title = title;
        goalModel.description = description;
        goalModel.startDate = startDate;
        goalModel.endDate = endDate;
        goalModel.weekdays = weekdays.map(x => x.day);

        await goalModel.validate();
    }
    catch {
        return null;
    }

    const goalWithId = await goalModel.save();
    return goalWithId._id;
};

export const checkUserGoal = async (userId: string, goalId: string, date: Date): Promise<BasicGoalResponse> => {
    const goalDocument = await GoalModel.findOneAndUpdate({ userId, _id: goalId }, { "$push": { "checks": date } });
    if (goalDocument === null) {
        return null;
    }
    return fromDocument(goalDocument);
};

export const uncheckUserGoal = async (userId: string, goalId: string, date: Date): Promise<BasicGoalResponse> => {
    const goalDocument = await GoalModel.findOneAndUpdate({ userId, _id: goalId }, { "$pull": { "checks": date } });
    if (goalDocument === null) {
        return null;
    }
    return fromDocument(goalDocument);
};

export const donateToUserGoal = async (goalId: string, amount: number): Promise<BasicGoalResponse> => {
    const goalDocument = await GoalModel.findOneAndUpdate({ _id: goalId }, { "$push": { "donations": amount } });
    if (goalDocument === null) {
        return null;
    }
    return fromDocument(goalDocument);
};

export const deleteUserGoal = async (userId: string, goalId: string): Promise<number> => {
    const deleteResult = await GoalModel.deleteOne({ _id: goalId, userId });
    return deleteResult.deletedCount;
};