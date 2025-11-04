"use client";
import { getNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import css from "./NotesPage.module.css";
import Link from "next/link";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/app/loading";
import Error from "../../../error";
import NoteList from "@/components/NoteList/NoteList";

function NotesByTagClient({ tag }: { tag?: NoteTag }) {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, isError, isLoading, error, isSuccess } = useQuery({
    queryKey: ["notes", tag, page, debouncedQuery],
    queryFn: () => getNotes(debouncedQuery, tag, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
    if (isSuccess && data.notes.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [isError, isSuccess, error, data]);

  function handleQuery(newQuery: string) {
    setQuery(newQuery);
    setPage(1);
  }

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox setQuery={handleQuery} query={query} />
          {isSuccess && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              setPage={setPage}
            />
          )}
          <Link href={"notes/action/create"} className={css.button}>
            Create note +
          </Link>
        </header>
      </div>

      <main>
        {isLoading && <Loader />}
        {isError && <Error error={error} />}
        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}
      </main>
    </>
  );
}

export default NotesByTagClient;
