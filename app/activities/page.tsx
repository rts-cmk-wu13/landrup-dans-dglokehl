import Main from "@/components/layout/Main"
import SearchBar from "./_components/SearchBar"
import fetchDefault from "@/utils/fetchHelper";
import ActivityCard from "./_components/ActivityCard";

export default async function ActivitiesPage() {
    const activities = await fetchDefault("http://localhost:4000/api/v1/activities");
    console.log("activities:", activities)

    return (
        <>
            <header className="px-default h-20">
                <SearchBar />
            </header>
            <Main className="pt-0!">
                <section className="space-y-6">
                    <h1 className="text-4xl">Aktiviteter</h1>
                    {activities.map((item: any, i: number) => (
                        <ActivityCard data={item} key={i} />
                    ))}
                </section>
            </Main>
        </>
    )
}