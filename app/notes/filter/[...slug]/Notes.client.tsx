'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../../../lib/api';
import type { NoteListResponse } from '../../../../lib/api';
import NoteList from '../../../../components/NoteList/NoteList';
import Pagination from '../../../../components/Pagination/Pagination';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Modal from '../../../../components/Modal/Modal';
import Loader from '../../../../components/Loader/Loader';
import css from './NotesPage.module.css';
import NoteForm from '../../../../components/NoteForm/NoteForm';

interface NotesClientProps {
  notesData: NoteListResponse;
  tag?: string;
}

export default function NotesClient({ notesData, tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 1000);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['Notes', debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
    initialData: currentPage === 1 && query === '' ? notesData : undefined,
  });

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  //  Фільтрація по тегу на клієнті
  const filteredNotes = tag
    ? data?.notes.filter((note) => note.tag.toLowerCase() === tag.toLowerCase())
    : data?.notes;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleQueryChange} value={query} />
        {isLoading && <Loader />}
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
        <button className={css.button} onClick={handleModalOpen}>
          Create note +
        </button>
      </header>

      {isError && (
        <p className={css.loaderror}>
          An error occurred: {(error as Error).message}, please reload the page!
        </p>
      )}

      {isSuccess && filteredNotes && filteredNotes.length > 0 && (
        <NoteList notes={filteredNotes} />
      )}

      {isSuccess && filteredNotes?.length === 0 && (
        <p className={css.loaderror}>No notes found for tag `${tag}`</p>
      )}

      {modalOpen && (
        <Modal onClose={handleModalClose}>
          <NoteForm
            onSuccess={() => {
              refetch();
              handleModalClose();
            }}
          />
        </Modal>
      )}
    </div>
  );
}
