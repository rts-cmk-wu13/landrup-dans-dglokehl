import Link from "next/link"
import LoginForm from "@/components/forms/LoginForm"

export default async function LoginPage() {
    return (
        <section className="space-y-8">
            <h1 className="text-4xl">Log ind</h1>
            <LoginForm />
            <p className="text-lg text-center">Er du endnu ikke bruger? <Link href="/signup" className="underline hover-75">Opret dig her.</Link></p>
        </section>
    )
}