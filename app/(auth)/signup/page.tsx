import Link from "next/link"
import SignupForm from "@/components/forms/SignupForm"

export const metadata = {
    title: "Opret bruger"
}

export default async function SignupPage() {
    return (
        <section className="space-y-8">
            <h1 className="text-4xl">Opret bruger</h1>
            <SignupForm />
            <p className="text-lg text-center">Er du allerede bruger? <Link href="/login" className="underline hover-75">Log ind her.</Link></p>
        </section>
    )
}