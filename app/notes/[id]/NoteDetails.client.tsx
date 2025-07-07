"use client";

import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import { useRouter } from 'next/navigation';


const NoteDetailClient = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const idNum = Number(id);
  const router = useRouter();
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




  const handleGoBack = () => {
    const isSure = confirm('Are you sure?');
    if (isSure) {
      router.back();

    }
    
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
           <button onClick={handleGoBack}>Back</button>
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
