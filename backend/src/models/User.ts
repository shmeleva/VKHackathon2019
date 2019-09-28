import { prop, Typegoose } from "@hasezoey/typegoose";
import shortid = require("shortid");

export class User extends Typegoose {
  @prop({ default: shortid.generate })
    public _id!: string;

  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, unique: true })
  public vkontakte!: string;

  @prop({ required: true })
  public token!: string;
}

export const UserModel = new User().getModelForClass(User, { schemaOptions: { timestamps: true } });
