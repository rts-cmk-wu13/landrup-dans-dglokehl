import Image from "next/image"
import HeroImg from "@/assets/heroimg.jpg"
import Button from "@/components/Button"
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

type HeroProps = {
    className?: string;
}

export default function Hero({ className }: HeroProps) {
    return (
        <div className={`height-minus-footer *:height-minus-footer ${className ? className : ""}`}>
            <div className="pt-16 pb-8 w-full flex flex-col justify-between absolute z-2">
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
                <div className="self-center flex flex-col items-center gap-8">
                    <Button href="/login" className="px-18">Log ind her</Button>
                    <HiOutlineChevronDoubleDown className="size-12 text-app-bg text-shadow-[0_0_8px] text-shadow-white" />
                </div>
            </div>

            <Image
                src={HeroImg}
                alt="Hero image"
                width={1499}
                height={1000}
                className="absolute z-0 object-cover"
            />
        </div>
    )
}