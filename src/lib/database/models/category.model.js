import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    { timestamps: true }
)

export const Category = models.Category || model("Category", CategorySchema) 