import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { connectDB } from "./lib/database/mongoose";
import { User } from "./lib/database/models/user.model";
import bcryptjs from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null
                try {
                    const { email, password } = credentials;

                    await connectDB()

                    const user = await User.findOne({ email })

                    const isPasswordValid = await bcryptjs.compare(password, user.password);

                    if (!isPasswordValid) {
                        throw new Error("Password is incorrect")
                    }

                    const userObj = JSON.parse(JSON.stringify(user));
                    delete userObj.password;

                    return userObj
                } catch (error) {
                    console.error("Credentials sign in error:", error)
                    throw new Error(error)
                }
            },
        }),
    ],
    callbacks: {
        async signIn() {

        },
        jwt({ token, user }) {

        },
        session() {

        }
    }
})