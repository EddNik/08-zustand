import { Note, NoteTag } from "@/types/note";
import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    common: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  },
});

interface GetNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function getNotes(
  query: string,
  tag?: NoteTag,
  page?: number,
  perPage?: number
): Promise<GetNotesResponse> {
  const options = {
    params: {
      page,
      perPage,
      ...(query.trim() !== "" && { search: query.trim() }),
      tag,
    },
  };

  try {
    const { data } = await api.get<GetNotesResponse>("/notes", options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createNote(newNote: Note): Promise<Note> {
  try {
    const { data } = await api.post<Note>("/notes", newNote);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(id: string): Promise<Note> {
  try {
    const { data } = await api.delete<Note>(`/notes/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getNoteById(id: string): Promise<Note> {
  try {
    const { data: note } = await api.get<Note>(`/notes/${id}`);
    return note;
  } catch (error) {
    throw error;
  }
}
