import { useRouter } from "next/router";
import css from "./page.module.css";
import { useEffect } from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description:
    "Sorry, the page you are looking for doesn't exist. It may have been removed or never existed.",
  openGraph: {
    title: "404 - Page not found",
    description:
      "This page doesn't exist or has been deleted. Go back to the homepage.",
    url: "https://vercel.com/eddniks-projects/08-zustand/404",
    images: [
      {
        // url: "/notehub-og-meta.jpg",
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
  },
};

function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist. Redirect on home
        page.
      </p>
      <Link className={css.link} href="/">
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
