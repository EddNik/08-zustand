import { NoteTag } from "@/types/note";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesByTagClient from "./NotesByTag.client";
import { getNotes } from "@/lib/api";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  const tag = slug[0] === "all" ? "All" : (slug[0] as NoteTag);
  return {
    title: `${tag} notes`,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, nam, repellat eos reprehenderit, eaque quasi pariatur asperiores dolorum odit enim placeat! Cupiditate, iste sint? Quod magni id quibusdam modi earum.",
    openGraph: {
      title: `${tag} notes`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, nam, repellat eos reprehenderit, eaque quasi pariatur asperiores dolorum odit enim placeat! Cupiditate, iste sint? Quod magni id quibusdam modi earum.",
      url: `https://08-zustand-blond-seven.vercel.app/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub image",
        },
      ],
    },
  };
}

async function NotesByTag({ params }: { params: Promise<{ slug: string[] }> }) {
  const queryClient = new QueryClient();
  const slug = (await params).slug;

  const tag = slug[0] === "all" ? undefined : (slug[0] as NoteTag);

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => getNotes("", tag, 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesByTagClient tag={tag} />
    </HydrationBoundary>
  );
}

export default NotesByTag;
