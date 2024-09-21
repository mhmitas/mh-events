"use server"

import { User } from "../database/models/user.model"
import bcryptjs from "bcryptjs"
import { connectDB } from "../database/mongoose"
import { signIn } from "@/auth"

export async function signInUser({ email, password }) {
    try {
        if (!email || !password) {
            throw new Error("Email and password required")
        }

        await connectDB()

        const user = await User.findOne({ email }).select("email password verified provider")

        if (!user) {
            return { error: "User not found, 😞" }
        }
        if (user.provider !== 'credentials') {
            return { error: `Please sign in with you ${user.provider} account` }
        }
        if (!user.verified || user.verified !== true) {
            return { error: "Your email address is not verified. Please check your inbox and follow the verification link we sent you." }
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return ({ error: "Invalid password" })
        }

        console.log("50% pass");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        return { success: true, data: res }
    } catch (error) {
        console.error("user sign in error: " + error)
        throw new Error(error)
    }
}