import Main from "@/components/layout/Main";
import Logo from "@/components/Logo";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Main className="space-y-12">
            <Logo />
            {children}
        </Main>
    );
}