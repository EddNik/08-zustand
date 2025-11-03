import { NoteTag } from "@/types/note";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesByTagClient from "./NotesByTag.client";
import { getNotes } from "@/lib/api";

async function NotesByTag({ params }: { params: Promise<{ slug: string[] }> }) {
  const queryClient = new QueryClient();

  console.log(params);

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
