import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

async function NotePreview({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}

export default NotePreview;
