import * as z from "zod";

// --- AUTH SCHEMAS --- //

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


// --- ACTIVITY SCHEMAS --- //

export const ActivitySchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    weekday: z.string().min(1),
    time: z.string().min(1),
    minAge: z.number().min(0).max(100),
    maxAge: z.number().min(0).max(100),
    instructorId: z.number(),
    maxParticipants: z.number(),
    file: z.file(),
});