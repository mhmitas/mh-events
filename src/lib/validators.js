import { z } from "zod";

export const signUpFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must contain at least 2 characters"),
    email: z.string().email(),
    password: z
        .string()
        .min(6, "Password must contain at least 6 characters")
        .max(14, "Password must contain less than 14 characters"),
    confirmPassword: z
        .string()
        .min(6).max(14, "Password must contain less than 14 characters")
}).refine(({ password, confirmPassword }) => {
    return password === confirmPassword;
}, {
    message: "Password is not matching.",
    path: ["confirmPassword"]
})

export const signInFormSchema = z.object({
    email: z
        .string()
        .email(),
    password: z
        .string()
        .min(6, "Password must contain at least 6 characters")
})