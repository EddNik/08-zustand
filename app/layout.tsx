import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "NoteHub — simple app for creating, editing, and organizing your notes",
  openGraph: {
    title: "NoteHub",
    description:
      "NoteHub — simple app for creating, editing, and organizing your notes",
    // url: "versel",
    // siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub image",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "NoteHub",
    description:
      "NoteHub — simple app for creating, editing, and organizing your notes",
    images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        {children}
        {/* {modal} */}
      </body>
    </html>
  );
}
