import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
    {
        stripeId: {
            type: String,
            required: true,
            unique: true
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
        buyer: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        totalAmount: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
)

export const Order = models.Order || model("Order", OrderSchema)