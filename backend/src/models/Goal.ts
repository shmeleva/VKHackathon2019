import { prop, Typegoose, Ref, arrayProp, instanceMethod } from "@hasezoey/typegoose";
import shortid = require("shortid");

export class Goal extends Typegoose {
    @prop({ default: shortid.generate })
    public _id!: string;

    @prop({ required: true })
    public title!: string;

    @prop()
    public description?: string;

    @prop({ required: true })
    public userId!: string;

    @prop({ required: true })
    public startDate!: Date;

    @prop({ required: true })
    public endDate!: Date;

    @arrayProp({ items: Number })
    public weekdays!: number[]

    @arrayProp({ items: Date })
    public checks!: Date[]

    @arrayProp({ items: Number })
    public donations!: number[]
}

export const GoalModel = new Goal().getModelForClass(Goal);
