import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import NavbarMobile from "@/components/Navbar/NavbarMobile";
import Footer from "@/components/Footer/Footer";
const oswald = Oswald({ subsets: ["cyrillic"], variable: "--font-oswald" });
const montserrat = Montserrat({
  subsets: ["cyrillic"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "MK Crvena Zvezda - Red Star Fencing Club Belgrade",
  description:
    "Official website of the Red Star Fencing Club (Macevalacki Klub Crvena Zvezda) from Belgrade, Serbia. Saber, epee, and foil training for all ages.",
  icons: {
    icon: "/logoRed.svg",
  },
};

/**
 * Root layout component that sets the document language, loads localization messages, and wraps page content with the internationalization provider and site chrome.
 *
 * @param children - The page content to render inside the layout
 * @param params - A promise resolving to an object with a `locale` string used to set the HTML `lang` and validate available locales
 * @returns The root HTML structure containing the internationalization provider, navbar, page children, and footer
 */
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${montserrat.variable} ${oswald.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
