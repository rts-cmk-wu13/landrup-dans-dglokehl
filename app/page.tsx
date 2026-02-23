import Image from "next/image"

import Main from "@/components/layout/Main"
import Button from "@/components/buttons/Button"

import Hero from "./_components/Hero"
import { holdtyper } from "./_components/holdtyper"
import TestimonialGallery from "./_components/TestimonialGallery"

import { fetchDefault } from "./api/fetches"

export default async function HomePage() {
    const testimonials = await fetchDefault("http://localhost:4000/api/v1/testimonials")
    console.log("testimonials:", testimonials)

    return (
        <>
            <Hero />

            <Main className="pt-12 pb-16 space-y-12">
                <section className="space-y-8">
                    <h2 className="text-4xl">Vores holdtyper</h2>
                    {holdtyper.map((item: any, i: number) => (
                        <article className="space-y-3" key={i}>
                            <h3 className="text-2xl font-medium">{item.heading}</h3>
                            <Image
                                src={item.image.src}
                                alt={item.image.alt}
                                width={item.image.width}
                                height={item.image.height}
                            />
                            <p className="text-lg">{item.body}</p>
                        </article>
                    ))}
                </section>

                <section>
                    <h2 className="text-4xl">Nyhedsbrev</h2>
                    <p className="mt-5 text-lg">Få direkte besked når vi har sæsonstart eller afholder arrangementer.</p>
                    <form action="" className="mt-4 w-full flex items-center gap-4">
                        <input type="email" name="email" id="email" placeholder="Email" className="form-input" />
                        <Button className="px-3">Tilmeld</Button>
                    </form>
                </section>

                {testimonials && <TestimonialGallery data={testimonials} className="px-0!" />}

                <section>
                    <h2 className="mb-8 text-4xl">Kontakt os</h2>
                    <input type="text" placeholder="Navn" className="form-input" />
                </section>

                <address className="space-y-5 not-italic text-center">
                    <div className="flex flex-col items-center gap-4">
                        <Image
                            src="/logo-icon.png"
                            alt="Logo"
                            width={64}
                            height={64}
                        />
                        <p className="text-2xl font-medium">Laudrup Dans</p>
                    </div>
                    <p className="text-lg">Pulsen 8 . 4000 Roskilde<br/>Tlf. 3540 4550</p>
                </address>
            </Main>
        </>
    )
}