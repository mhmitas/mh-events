"use server"

import { Category } from "../database/models/category.model"
import { connectDB } from "../database/mongoose"

export const getCategories = async () => {
    await connectDB()

    try {
        const categories = await Category.find().sort({ name: 1 })
        return { success: true, data: JSON.parse(JSON.stringify(categories)) }
    } catch (error) {
        throw error
    }
}

export const addCategory = async ({ name }) => {
    if (!name) {
        return { error: "Name is required" }
    }
    await connectDB()

    try {
        const category = await Category.create({ name })
        console.log(category);
        return { success: true, data: category }
    } catch (error) {
        throw error
    }
}