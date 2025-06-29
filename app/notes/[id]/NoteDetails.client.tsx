"use client";

import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";

const NoteDetailClient = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const idNum = Number(id);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(idNum),
    enabled: !!id, 
    refetchOnMount: false,
  });

  if (!id) return <p>Note ID is missing in the URL.</p>;
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.updatedAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailClient;
