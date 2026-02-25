import { fetchDefault } from "../api/fetches";
import { Activity } from "../api/types";
import Main from "@/components/layout/Main"
import SearchBar from "./_components/SearchBar"
import ActivityCard from "./_components/ActivityCard";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;

    return {
        title: q ? `${q}: Aktiviteter` : "Aktiviteter"
    }
}

export default async function ActivitiesPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;

    const activities: Activity[] = await fetchDefault("http://localhost:4000/api/v1/activities");
    console.log("activities:", activities)


    function filterActivitiesSearch(activity: Activity) {
        const query = q.toLowerCase().trim()
        const name = activity.name.toLowerCase().trim()
        const weekday = activity.weekday.toLowerCase().trim()
        
        return name.includes(query) || weekday.includes(query)
    }

    let activitiesFiltered = activities
    if (q) activitiesFiltered = activities.filter(filterActivitiesSearch)

    return (
        <>
            <header className="px-default h-20">
                <SearchBar query={q} />
            </header>
            <Main className="pt-0!">
                <section className="space-y-6">
                    <h1 className="text-4xl">Aktiviteter</h1>
                    {activitiesFiltered.length > 0 ? (
                        activitiesFiltered.map((item: any, i: number) => (
                            <ActivityCard activity={item} key={i} />
                        ))
                    ) : (
                        <p className="text-lg text-center opacity-75">Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet</p>
                    )}
                </section>
            </Main>
        </>
    )
}