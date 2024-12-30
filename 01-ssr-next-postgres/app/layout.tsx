// Let TypeScript we work with Metadata
import type { Metadata } from "next";

// Fonts
import { Inter, Space_Grotesk } from "next/font/google";

// Auth provider
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

//Styles
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Atalaya Digital",
  description:
    "An amazing platform to automatize your projects with state-of-the-art dashboards",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
