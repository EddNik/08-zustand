import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import toast from "react-hot-toast";
import { tags } from "@/constants/constants";
import { NewNote, NoteTag } from "@/types/note";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const mutationCreate = useMutation({
    mutationKey: ["notes"],
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/all");
      clearDraft();
    },
    onError: (error) => {
      if (draft.tag === "Choose category") {
        toast.error("Please select a valid tag before saving.");
      } else {
        toast.error(`Failed to create note. ${error?.message}`);
      }
    },
  });

  function handleSubmit(formdata: FormData) {
    const noteObj: NewNote = {
      title: formdata.get("title") as string,
      content: formdata.get("content") as string,
      tag: formdata.get("tag") as NoteTag,
    };

    mutationCreate.mutate(noteObj);
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  }

  const handleCancel = () => {
    router.push("/notes/filter/all");
  };

  return (
    <>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className={css.input}
            onChange={handleChange}
            defaultValue={draft?.title}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft?.content}
            onChange={handleChange}
            maxLength={500}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            name="tag"
            id="tag"
            className={css.select}
            defaultValue={draft?.tag}
            onChange={handleChange}
          >
            {tags.map((tag) => (
              <option
                key={tag}
                value={tag}
                disabled={tag === "Choose category"}
              >
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div className={css.actions}>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" disabled={mutationCreate.isPending}>
            {mutationCreate.isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </form>
    </>
  );
}

export default NoteForm;
