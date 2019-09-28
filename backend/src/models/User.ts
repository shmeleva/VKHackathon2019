import { prop, Typegoose } from "@hasezoey/typegoose";

export class User extends Typegoose {
  @prop({ required: true })
  firstName!: string;

  @prop({ required: true })
  lastName!: string;

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true, unique: true })
  vkontakte!: string;

  @prop({ required: true })
  token!: string;
}

export const UserModel = new User().getModelForClass(User);
