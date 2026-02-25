import Image from "next/image"

type LogoProps = {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <div className={`${className ? className : ""}`}>
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
    )
}