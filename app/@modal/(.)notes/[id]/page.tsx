// app/@modal/(.)notes/[id]/page.tsx

import { fetchNoteById } from '../../../../lib/api';
import type { Note } from '../../../../types/note';
import Modal from '../../../../components/Modal/Modal';

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params; 

  const idNum = Number(id);
  if (!id || isNaN(idNum)) {
    return <p>Invalid note ID</p>;
  }

  const note: Note = await fetchNoteById(idNum);

  return (
    <Modal>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </Modal>
  );
};

export default NotePreview;
