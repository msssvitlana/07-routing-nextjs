'use client';

import type { Note } from '../../../../types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  note: Note;
  onClose: () => void;
}

export default function NotePreview({ note, onClose }: NotePreviewProps) {
  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={onClose}>
        Back
      </button>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
