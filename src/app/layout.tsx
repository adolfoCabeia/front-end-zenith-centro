import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zenith Digital",
    template: "%s | Zenith Digital",
  },

  description:
    "Zenith Digital - Soluções digitais modernas, desenvolvimento web, sistemas e presença online para empresas e empreendedores.",

  keywords: [
    "desenvolvimento web",
    "programação",
    "Next.js",
    "Node.js",
    "sistemas web",
    "Angola",
    "Luanda",
    "Zenith Digital",
  ],

  authors: [
    {
      name: "Adolfo Cabeia",
      url: "https://portfolio-adolfo-cabeia-junior.vercel.app/",
    },
  ],

  creator: "Adolfo Cabeia",
  publisher: "Zenith Digital",

  metadataBase: new URL(
    "https://front-end-zenith-centro.onrender.com"
  ),

  openGraph: {
    title: "Zenith Digital",
    description:
      "Soluções digitais modernas para o seu negócio crescer online.",
    url: "https://front-end-zenith-centro.onrender.com",
    siteName: "Zenith Digital",
    locale: "pt_AO",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zenith Digital",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Zenith Digital",
    description:
      "Soluções digitais modernas para o seu negócio crescer online.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/public/favicon/favicon.ico",
    shortcut: "/public/favicon/favicon.ico",
    apple: "/public/favicon/apple-touch-icon.png",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-AO"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}