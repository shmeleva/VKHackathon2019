import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    firstName: string;
    lastName: string;
    email: string;
    vkontakte: string;
    token: string;
};

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    vkontakte: { type: String, unique: true },
    token: String
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("User", userSchema);
