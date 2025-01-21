import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Natsuki's Portfolio",
  description: "Welcome to Natsuki's Portfolio. Here you'll find a showcase of my latest projects, including websites and apps I've developed and AI-generated artwork. Dive into my journey of creativity and innovation in technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={cn(inter.className, 'min-h-dvh  ')} suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header/>
        {children}
        <Footer />
        </ThemeProvider>
        {/* Google Analytics タグここから */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-8D9W92XLJY" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8D9W92XLJY');
          `}
        </Script>
        {/* Google Analytics タグここまで */}
      </body>
    </html>
  );
}