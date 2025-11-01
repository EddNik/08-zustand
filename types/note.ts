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
