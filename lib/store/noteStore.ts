import { NewNote, NoteDraftStore } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Choose category",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        //   It updates only the draft object without touching the rest of the store.
        set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      // ⬇️ This line ensures only `draft` is saved
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
