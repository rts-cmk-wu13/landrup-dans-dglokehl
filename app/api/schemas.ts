import * as z from "zod";

export const LoginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(4),
})

export const SignupSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(4),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    age: z.number().min(1),
});