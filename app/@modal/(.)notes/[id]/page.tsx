import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api';
import NotePreview from './NotePreview.client';

interface NoteModalPageProps {
  params: {
    id: string;
  };
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const noteId = Number(params.id);

  if (Number.isNaN(noteId)) {
    return <p>Invalid note ID</p>;
  }

  const queryClient = new QueryClient();

  // Prefetch note on server
  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={noteId} />
    </HydrationBoundary>
  );
}
