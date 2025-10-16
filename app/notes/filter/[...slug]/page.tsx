import { fetchNotes, FetchNotesResponse } from "@/lib/api"
import NotesClient from "./Notes.client"


interface NotesProps {
    params: Promise<{ slug: string[] }>;
}

export default async function Notes({params}: NotesProps) {
    const { slug } = await params;
    const tag = slug?.[0] && slug[0].toLowerCase() !== "all" ? slug[0] : undefined;


    const initialPage = 1;
    const initialQuery = "";

    const initialData: FetchNotesResponse = await fetchNotes(initialPage, initialQuery, tag);


    return <NotesClient initialData={initialData} tag={tag}/>
}