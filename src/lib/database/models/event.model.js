import { model, models, Schema } from "mongoose"

const EventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        startDateTime: {
            type: Date,
            default: Date.now(),
        },
        endDateTime: {
            type: Date,
            default: Date.now(),
        },
        price: {
            type: Number,
        },
        isFree: {
            type: Boolean,
            default: false,
        },
        url: {
            type: String,
            required: true
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    },
    { timestamps: true }
)

export const Event = models.Event || model("Event", EventSchema)