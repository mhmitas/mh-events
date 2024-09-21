"use server"

import { User } from "../database/models/user.model";
import { connectDB } from "../database/mongoose";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs";
import crypto from "crypto"
import { sendVerificationEmail } from "../emails/verification-email";

export async function signUp({ values }) {
    try {
        const { email, password, name } = values;
        if (!email, !password, !name) {
            throw new Error("All credentials are required");
        }
        // connect to database
        await connectDB()

        const isExists = await User.exists({ email: email })
        if (isExists) {
            throw new Error("An account with this email already exists.")
        }

        // generate a validation token secret
        const tokenSecret = crypto.randomBytes(32).toString('hex')

        // generate a validation token
        const verificationToken = jwt.sign(
            { email },
            tokenSecret,
            { expiresIn: "1d" }
        )
        // hast the password
        const hashedPassword = await bcryptjs.hash(password, 12);
        if (!hashedPassword) {
            throw new Error("Password related issue happened")
        }
        // create a new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken,
        });

        if (!user) {
            throw new Error("Sign up failed")
        }

        await sendVerificationEmail({ email, verificationToken })

        return { success: true }
    } catch (error) {
        throw new Error(error)
    }

}