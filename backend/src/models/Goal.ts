import { prop, Typegoose, Ref, arrayProp } from "@hasezoey/typegoose";
import { User } from "./User";

export class Weekday extends Typegoose {
    @prop({ required: true })
    day!: number;
}

export class Check extends Typegoose {
    @prop({ required: true })
    date!: Date;
}

export class Donation extends Typegoose {
    @prop({ required: true })
    date: Date;

    @prop({ required: true })
    amount: number;
}

export class Goal extends Typegoose {
    @prop({ required: true })
    title!: string;

    @prop()
    description?: string;

    @prop({ required: true, ref: User })
    user!: Ref<User>;

    @prop({ required: true })
    startDate!: Date;

    @prop({ required: true })
    endDate!: Date;

    @prop()
    timesAWeek?: number;

    @arrayProp({ itemsRef: Weekday })
    weekdays?: Ref<Weekday>[];

    @arrayProp({ itemsRef: Check })
    checks?: Ref<Check>[];

    @arrayProp({ itemsRef: Donation })
    donations?: Ref<Donation>[];
}

export const GoalModel = new Goal().getModelForClass(Goal);
