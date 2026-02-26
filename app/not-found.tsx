import Link from "next/link";
import Main from "@/components/layout/Main";

export default async function NotFound() {
    return (
        <Main className="height-minus-footer flex flex-col justify-center items-center gap-12 text-center">
            <h1 className="*:block space-y-2">
                <span className="text-8xl">404</span><span className="text-4xl">Page not found</span>
            </h1>
            <p className="text-center text-xl">
                <Link href="/" className="underline hover-75">Return to home page?</Link>
            </p>
        </Main>
    );
}