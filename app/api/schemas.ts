import * as z from "zod";


export const LoginSchema = z.object({
    username: z.string({ error: "Indtast dit brugernavn" }).min(1, { error: "Indtast dit brugernavn" }),
    password: z.string({ error: "Indtast din adgangskode" }).min(1, { error: "Indtast din adgangskode" })
});

export const SignupSchema = z.object({
    firstname: z.string({ error: "Indtast dit fornavn" }).min(1, { error: "Indtast dit fornavn" }),
    lastname: z.string({ error: "Indtast dit efternavn" }).min(1, { error: "Indtast dit efternavn" }),
    age: z.number({ error: "Indtast din alder" }).min(1, { error: "Indtast din alder" }),
    username: z.string({ error: "Indtast et brugernavn" }).min(4, { error: "Dit brugernavn skal mindst indeholde 4 tegn" }),
    password: z.string({ error: "Indtast en adgangskode" }).min(4, { error: "Din adgangskode skal mindst indeholde 4 tegn" }),
    passwordConfirm: z.string({ error: "Gentag din adgangskode" }).min(1, { error: "Gentag din adgangskode" }),
}).refine((item) => item.password === item.passwordConfirm, {
    message: "Gentag din adgangskode",
    path: ["passwordConfirm"],
});


export const ActivitySchema = z.object({
    name: z.string({ error: "Indtast et navn" }).min(1, { error: "Indtast et navn" }),
    description: z.string({ error: "Indtast en beskrivelse" }).min(1, { error: "Indtast en beskrivelse" }),
    weekday: z.enum(["mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "søndag"], { error: "Vælg en ugedag" }),
    time: z.iso.time({ precision: -1, error: "Indtast et tidspunkt" }),
    minAge: z.number({ error: "Indtast en minimumsalder mellem 0 og 100" }).min(0, { error: "Indtast en minimumsalder mellem 0 og 100" }).max(100, { error: "Indtast en minimumsalder mellem 0 og 100" }),
    maxAge: z.number({ error: "Indtast en maximumsalder mellem 0 og 100" }).min(0, { error: "Indtast en maximumsalder mellem 0 og 100" }).max(100, { error: "Indtast en maximumsalder mellem 0 og 100" }),
    instructorId: z.enum(["1", "2", "3", "4"], { error: "Vælg en instruktør" }),
    maxParticipants: z.number({ error: "Indtast en maximum af deltagere" }).min(1, { error: "Indtast en maximum af deltagere" }),
    file: z.file({ error: "Upload et billede" }).min(1, { error: "Upload et billede" }),
});