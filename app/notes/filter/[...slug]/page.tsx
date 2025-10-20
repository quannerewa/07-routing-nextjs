import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import getQueryClient from "@/lib/getQueryClient";
import NotesClient from "./Notes.client";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const tag = slug?.[0] && slug[0].toLowerCase() !== "all" ? slug[0] : undefined;

  const initialPage = 1;
  const initialQuery = "";


  const queryClient = getQueryClient();

 
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, initialPage, initialQuery],
    queryFn: () => fetchNotes(initialPage, initialQuery, tag),
  });

  
  const dehydratedState = dehydrate(queryClient);

  
  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
