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


export const eventFormSchema = z.object({
    title: z
        .string()
        .min(2, { message: "Title must contain at least 2 characters" })
        .max(100, { message: "Titles must be max 100 characters" }),
    description: z
        .string()
        .min(10, { message: "Description must contain at least 10 characters" })
        .max(800, { message: "Descriptions must be max 800 characters" }),
    location: z
        .string()
        .min(3, { message: "Location must contain at least 3 characters" })
        .max(200, { message: "Locations must be max 200 characters" }),
    startDateTime: z.date(),
    endDateTime: z.date(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
    category: z.string().min(3, { message: "Category must contain at least 3 characters" })
})