// app/notes/filter/[...slug]/page.tsx
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];


  console.log('Fetching notes with tag:', tag);

  const notesData = await fetchNotes('', 1, tag);
console.log(params)
  return <NotesClient notesData={notesData} tag={tag} />;
}







  

 

  