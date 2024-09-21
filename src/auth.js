import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { connectDB } from "./lib/database/mongoose";
import { User } from "./lib/database/models/user.model";
import bcryptjs from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
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
            await connectDB()
            try {
                // handle google sign in process
                if (account.provider === "google") {
                    const existedUser = await User.findOne({ email: user.email });
                    console.log({ existedUser: !!existedUser });
                    // check if the user already exists, and is verified
                    if (existedUser && existedUser?.verified) {
                        // if user exists and not from google provider, don't allow sign in;
                        if (existedUser.provider !== "google") {
                            throw new Error("Email is already registered with a different provider")
                        }

                        const existedUserObj = await existedUser.toObject();

                        // update the user object with the database credentials
                        user._id = existedUserObj?._id;
                        user.image = existedUserObj?.avatar;
                        user.name = existedUserObj?.name;
                        user.role = existedUserObj?.role;
                        user.verified = existedUserObj?.verified;

                        return user;
                    } else {
                        // If the user is not found in the database, create a new one
                        const newUser = await User.create({
                            email: user?.email,
                            name: user?.name,
                            avatar: profile?.picture,
                            provider: account?.provider,
                            verified: true,
                            role: "user"
                        })
                        // console.log("New user, created by google:", newUser);
                        // if the user created successfully, then update the user with with the new user
                        if (!newUser) {
                            throw new Error("Google sign in failed");
                        }

                        const newUserObj = await newUser.toObject();

                        user._id = newUserObj._id;
                        user.avatar = newUserObj.avatar;
                        user.name = newUserObj.name;
                        user.provider = newUserObj.provider;
                        user.role = newUserObj.role;
                        user.verified = newUserObj.verified;
                        // return the user after assigning necessary fields
                        return user;
                    }
                }
                // if credentials sign in return true
                if (account.provider === 'credentials') {
                    return true;
                }
            } catch (error) {
                throw new Error(error?.message || "Failed to sign in");
            }
        },
        jwt({ user, token }) {
            if (user) {
                token.id = user?._id;
                token.name = user?.name;
                token.image = user?.image;
                token.role = user?.role;
                token.verified = user?.verified;
            }
            return token
        },
        session({ token, session }) {
            if (session) {
                session.user.id = token?.id;
                session.user.role = token?.role;
                session.user.verified = token?.verified;
            }
            return session
        }
    },
    pages: {
        signIn: '/sign-in',
        signOut: "/",
        error: '/error'
    }
})