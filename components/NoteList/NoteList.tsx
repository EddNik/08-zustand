import { Note } from "@/types/note";
import css from "./NoteList.module.css";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import toast from "react-hot-toast";

function NoteList({ notes }: { notes: Note[] }) {
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationKey: ["notes"],
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted!");
    },
    onError: (error) => {
      toast.error(`Failed to delete note. ${error?.message}`);
    },
  });

  return (
    <>
      {notes.length > 0 && (
        <ul className={css.list}>
          {notes.map((note) => (
            <li key={note.id} className={css.listItem}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <Link href={`/notes/${note.id}`} className={css.link}>
                  View details
                </Link>
                <button
                  className={css.button}
                  onClick={() => mutationDelete.mutate(note.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default NoteList;
