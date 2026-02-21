import "./globals.css";

import { Ubuntu } from "next/font/google";

import Footer from "@/components/layout/Footer";

const ubuntu = Ubuntu({
    weight: ["300", "400", "500", "700"]
})

export const metadata = {
    title: {
        template: "%s | Landrup Dans",
        default: "Landrup Dans",
    }
}


export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`pb-footer bg-app-bg ${ubuntu.className}`}>
                {children}
                <Footer />
            </body>
        </html>
    );
}
