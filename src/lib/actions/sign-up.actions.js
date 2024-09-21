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
            { expiresIn: "365d" }
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
            provider: "credentials",
            verificationToken: tokenSecret,
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


export async function verifyEmail({ email, verificationToken }) {
    try {
        await connectDB()

        // check all credentials are in the prop
        if (!email || !verificationToken) {
            throw new Error("Credentials are missing or invalid")
        }

        // find the user with the given email
        const user = await User.findOne({ email }).select("email verificationToken verified")
        // if user not found, throw an error
        if (!user) {
            throw new Error("User not found")
        }
        // if the user has already verified, return
        if (user.verified || !user.verificationToken) {
            return { error: "Already verified" }
        }
        // if have verification token, verify the token
        try {
            await jwt.verify(verificationToken, user.verificationToken)
        } catch (error) {
            console.log('error: ' + error)
            throw new Error("Invalid or expired verification token")
        }
        // if token is valid, mark the user as verified;
        user.verified = true
        user.verificationToken = undefined;
        await user.save()

        return { success: true }
    } catch (error) {
        throw error
    }
}