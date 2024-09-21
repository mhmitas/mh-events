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
        async signIn({ user, account, profile }) {
            // console.log("User form sign in callback:", user);
            if (account.provider === 'credentials') {
                return true;
            }
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user?._id;
                token.name = user?.name;
                token.picture = user?.avatar;
                token.role = user?.role;
                token.verified = user?.verified;
            }
            return token
        },
        session({ session, token }) {
            if (session) {
                session.user.id = token?.id;
                session.user.role = token?.role;
                session.user.verified = token?.verified;
            }
            return session
        }
    }
})