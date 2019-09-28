import { prop, Typegoose, Ref, arrayProp, instanceMethod } from "@hasezoey/typegoose";
import shortid = require("shortid");

export class Goal extends Typegoose {
    @prop({ default: shortid.generate })
    _id!: string;

    @prop({ required: true })
    title!: string;

    @prop()
    description?: string;

    @prop({ required: true })
    userId!: string;

    @prop({ required: true })
    startDate!: Date;

    @prop({ required: true })
    endDate!: Date;

    @arrayProp({ items: Number })
    weekdays!: number[]

    @arrayProp({ items: Date })
    checks!: Date[]

    @arrayProp({ items: Number })
    donations!: number[]
}

export const GoalModel = new Goal().getModelForClass(Goal);
