import type { Metadata } from "next";
import { Noto_Sans_JP, IBM_Plex_Mono, BIZ_UDPGothic } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"
import Script from 'next/script';

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

/*
  試用（2026-08-13）：本文を読みやすさ特化の UD フォントに切り替えて比較中。
  BIZ UDPGothic は 400/700 の2ウェイトしか無い（500は400へ、600は700へ寄る）。
  戻すときは tailwind.config.ts の font-sans から --font-biz-ud を外すだけ。
*/
const bizUD = BIZ_UDPGothic({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-biz-ud",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.natsuki163.com'),
  title: {
    default: "Natsuki Hayashida | 金型設計 × AI × Web開発",
    template: "%s | Natsuki Hayashida",
  },
  description:
    "冷間鍛造の金型設計を本業に、AIとWebアプリケーションの開発に取り組むエンジニアのポートフォリオ。プロジェクトの記録と、領域をつなぐ「接続ノート」を公開しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
      </head>
      <body className={cn(notoSansJP.variable, plexMono.variable, bizUD.variable, 'font-sans min-h-dvh')} suppressHydrationWarning>
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
