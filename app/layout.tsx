import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/NavBar";
import { ThemeProvider } from "./components/ThemeProvider";
// app/layout.tsx (or app/layout.js)

import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CMS",
  description: "DABAS",
};
// Configure your fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} theme-light`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased theme-light dark:theme-dark
`}
      >
        <ThemeProvider>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

/* 
Then update your globals.css to use these variables:

@theme inline {
  --color-background: var(--bg);
  --color-foreground: var(--text);
  --font-sans: var(--font-inter);
  --font-heading: var(--font-poppins);
  --font-mono: 'Courier New', monospace;
}

@layer base {
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
  }
}
*/
