[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/hVu0ZQAO)

# Landrup Dans - Loke Hochheim Lunde

Jeg burde gerne have opfyldt alle kravene til opgaven, inklusiv de valgfrie opgaver. Jeg har også tilføjet lidt ekstra funktionalitet/"quality of life" her og der hvor jeg syntes det manglede :) (F.eks. har jeg gjort så instruktører ikke kan tilmelde sig sine egne hold, da det ikke rigtigt giver nogen mening.)

---
## Tech-Stack

- Next.js med TypeScript
- Tailwind
- Zod
- React Icons

Jeg har valgt at bruge Next.js fordi jeg foretrækker det over vanilla React og fordi det fungerer godt til denne type af "web-apps" på grund af server-side rendering og caching, selvom jeg faktisk endte med at bruge mindre caching på denne side, da det er ret vigtigt at de forskellige sider med aktiviteterne bliver hurtigt opdateret når der bliver tilføjet nye eller de bliver ændret.

Jeg har brugt Zod til validering af alle forms på siden. Der var nogle ting som ikke blev valideret i API'et så derfor var jeg nødt til at validere dem, men jeg havde også brug for error messages, hvilket Zod fungerer godt til.

Jeg prøver så vidt som muligt at lave så meget jeg kan server-side. Jeg har f.eks. brugt Next.js form component til størstedelen af mine forms på siden med server actions.

Jeg har brugt cookies og Next.js Proxy/Middleware til at holde styr på login-sessions.

---
## Struktur

Jeg har selvfølgeligt også splittet min kode op i komponenter, som man bør i React. Jeg har struktureret mit projekt sådan at de fleste komponenter ligger i /components, som er opdelt i nogle undermapper. Samtidig har jeg valgt at de komponenter som er specifikke til en side ligger i en "\_components" mappe (så Next.js ikke ser det som en route) relativt til den side i /app mappen. Jeg ved ikke helt hvor glad jeg er for denne struktur, men jeg har bare heller ikke fundet et bedre alternativ til det endnu, da det også ville se underligt ud hvis jeg lavede undermapper i /components til hver side.

Et eksempel på et af mine komponenter er min SearchBar.tsx. I den bruger jeg useState som flipper mellem on/off, for at henholdsvis vise et ikon til at åbne search-baren og så search-selve baren med samme ikon i. Jeg bruger search parameters i URL'en til at søge, da jeg synes det er den mest pålidelige måde at implementere det på.

Min useState:
```
const [open, setOpen] = useState(query ? true : false);
```

Conditional rendering:
```
{!open ? (
	<LuSearch className="size-6 absolute right-3 hover-75" onClick={() => setOpen(!open)} />
            ) : (
	<form action="" noValidate onSubmit={submitSearch} className="w-full flex items-center relative">
		<button className="absolute right-3 z-2">
			<LuSearch className="size-6 hover-75" />
		</button>
		<input
			type="search"
			name="q" id="q"
			autoFocus={query ? false : true}
			defaultValue={query ? query : ""}
			className="form-input pr-11! bg-[#C4C4C4]/30! text-app-white! rounded-xl rounded-br-none"
		/>
	</form>
)}
```

Dette er koden som jeg bruger til at submitte searchen når man trykker på search-ikonet, hvilket er super simpelt. Jeg starter med at bruge trim() til at undgå at brugeren f.eks. bare søger på et mellemrum og gemmer det i en const. Så tjekker jeg om der er blevet gemt noget i den const og hvis der ikke er, så bruger jeg preventDefault() for at stoppe formen fra at submitte searchen, hvorefter jeg sætter min "open"-state til false, så search-baren lukker ned igen.

```
const submitSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
	const q = e.currentTarget.q.value.trim()
	if (!q) {
		e.preventDefault()
		setOpen(false)
	}
}
```

Jeg syntes det her gav mest mening, da der ikke var noget i designet til at lukke search-baren, men jeg synes at det burde være en mulighed, så den ikke bare er permanent åben efter man har trykket på search-ikonet.

På /activities bruger jeg searchParams og tager "q" (det jeg har valgt at den skulle hedde, da det er det jeg oftest har set):
```
ActivitiesPage({ searchParams }: { searchParams: Promise<{ q: string }> })

const { q } = await searchParams;

const activities: Activity[] = await fetchDefault("http://localhost:4000/api/v1/activities");

let activitiesFiltered = activities
if (q) activitiesFiltered = activities.filter(filterActivitiesSearch)
```

Jeg fetcher aktiviteterne og så laver jeg en variabel med de filterede aktiviteter, som til at starte med bare er alle aktiviteterne. Bagefter tjekker jeg om der er en query, hvorefter jeg så filterer aktiviteterne med denne funktion:
```
function filterActivitiesSearch(activity: Activity) {
	const query = q.toLowerCase().trim()
	const name = activity.name.toLowerCase().trim()
	const weekday = activity.weekday.toLowerCase().trim()
	
	return name.includes(query) || weekday.includes(query)
}
```

Først bruger jeg toLowerCase() på query'en, navnet på aktiviteterne og ugedagen på aktiviteterne, for at sørge for at søgeresultaterne ikke er case-sensitive, d.v.s. hvis brugeren f.eks har skrevet "Onsdag" i stedet for "onsdag" (som det er i API'et), så får de stadig søgeresultaterne for det.

Bagefter brugter jeg .trim() for at fjerne ekstra mellemrum i starten og slutningen af query'en, jeg tror ikke det er så vigtigt at gøre men jeg har set at det er noget folk plejer at gøre, så derfor har jeg også altid gjort det.

Til sidst returnerer jeg de aktiviteter der er blevet filtreret.

I kravene til opgaven stod der at man til søgefunktionaliteten skulle kunne søge i holdnavn, ugedag og instruktørnavn, men der er kun instruktøren's id og man kan ikke fetche deres bruger uden at være logget ind som dem, så derfor har jeg bare undladt at man kan søge efter instruktør, men man kan stadig søge efter holdnavn og ugedag :)

Dette er hvordan aktiviteterne bliver renderet på siden:
```
{activitiesFiltered.length > 0 ? (
	activitiesFiltered.map((item: any, i: number) => (
		<ActivityCard activity={item} key={i} />
	))
) : (
	<p className="text-lg text-center opacity-75">Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet</p>
)}
```

Først tjekker jeg om der overhovedet er nogle aktiviteter og hvis der ikke er, bliver der vist en besked. Ellers bliver aktiviteterne mappet ud i ActivityCard komponentet.