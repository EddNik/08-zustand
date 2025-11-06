export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export type NoteTag =
  | "Choose category"
  | "Todo"
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping";

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NoteDraftStore {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
}
