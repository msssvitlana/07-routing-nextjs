'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '../../../../components/Modal/Modal';
import NotePreview from './NotePreview.client';  
import { fetchNoteById } from '../../../../lib/api';
import type { Note } from '../../../../types/note';

export default function NoteModalPage() {
  const router = useRouter();
  const { id } = useParams();

  const noteId = Number(id);

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ['notes', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !Number.isNaN(noteId),
    refetchOnWindowFocus: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (!id || Number.isNaN(noteId)) return <p>Invalid ID</p>;
  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Failed to load note.</p>;

  return (
    <Modal onClose={handleClose}>
      <NotePreview note={note} onClose={handleClose} />
    </Modal>
  );
}
