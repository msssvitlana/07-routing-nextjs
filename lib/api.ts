// lib/api.ts

import axios from "axios";
import type { Note, NewNoteData} from '../types/note'

export const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;
export type Tag = typeof TAGS[number];

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const NOTES_PER_PAGE = 12;


export type NoteListResponse = {
  notes: Note[];
  totalPages: number;
};

axios.interceptors.request.use((config) => {
  const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (myToken) {
    config.headers.Authorization = `Bearer ${myToken}`;
  } 
  return config;
})

// Універсальна функція для отримання нотаток
export async function fetchNotes(
  query: string = '',
  page: number = 1,
  tag?: string
): Promise<NoteListResponse> {
  try {
    const params: Record<string, string | number> = {
      page,
      perPage: NOTES_PER_PAGE,
    };

    if (query.trim()) {
      params.search = query.trim();
    }

    if (tag && tag !== 'All') {
      params.tag = tag; //  ключ згідно API
    }

    const response = await axios.get<NoteListResponse>("/notes", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw new Error("Failed to fetch notes. Please try again later.");
  }
}


export async function removeNote(id: number): Promise<Note> {
  try {
    const response = await axios.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete note:', error);
    throw new Error('Failed to delete note. Please try again later.');
  }
}

export async function createNote(note: NewNoteData): Promise<Note> {
  try {
    const response = await axios.post<Note>(`/notes`, note);
    return response.data;
  } catch (error) {
    console.error('Failed to create note:', error);
    throw new Error('Failed to create note. Please try again later');
    
  }
  
}
export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};



// export type Category = {
//   id: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export const getCategories = async () => {
//   const res = await axios<Category[]>(`/categories`);
//   return res.data;
// };

