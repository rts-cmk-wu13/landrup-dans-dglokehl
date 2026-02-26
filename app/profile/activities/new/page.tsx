import Main from "@/components/layout/Main"
import ActivityForm from "@/components/forms/ActivityForm"

export const metadata = {
    title: "Opret Hold"
}

export default async function NewActivityPage() {
    return (
        <Main className="pt-9 space-y-8">
            <h1 className="text-4xl">Opret hold</h1>
            <ActivityForm />
        </Main>
    )
}