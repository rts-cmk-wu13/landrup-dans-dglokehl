import Image from "next/image"
import HeroImg from "@/assets/heroimg.jpg"

import Main from "@/components/layout/Main"
import Button from "@/components/Button"

export default async function HomePage() {
    return (
        <>
            <div className="h-dvh">
                <div className="pt-16 pb-28 size-full flex flex-col justify-between absolute z-2">
                    <div>
                        <div className="flex flex-col items-center gap-8">
                            <Image
                                src="/logo-icon.png"
                                alt="Logo"
                                width={64}
                                height={64}
                            />
                            <Image
                                src="/logo-text.png"
                                alt="Logo"
                                width={291}
                                height={63}
                            />
                        </div>
                        <div className="mt-2 mr-11 h-1 bg-app-white"></div>
                    </div>
                    <Button className="px-18 self-center">Log ind her</Button>
                </div>
                <Image
                    src={HeroImg}
                    alt="Hero image"
                    width={1499}
                    height={1000}
                    className="h-full absolute z-0 object-cover"
                />
            </div>

            <Main className="pt-12">
                <h2 className="text-4xl">Vores holdtyper</h2>
            </Main>
        </>
    )
}