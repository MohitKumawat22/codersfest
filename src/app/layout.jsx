import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Apna Store - Your Ultimate Shopping Destination",
  description: "Shop the latest in fashion, beauty, electronics, and home living. Experience AI-powered style recommendations with Apna Sarthi, your personal fashion assistant.",
};

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatInterface from "../components/ChatInterface";
import CookieConsent from "../components/CookieConsent";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <ChatInterface />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}

