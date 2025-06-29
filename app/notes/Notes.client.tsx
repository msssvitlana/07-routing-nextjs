'use client';

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../lib/api';
import NoteList from '../../components/NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';
import NoteModal from '../../components/NoteModal/NoteModal';
import Loader from '../../components/Loader/Loader';
import css from './NotesPage.module.css';

interface Props {
  dehydratedState: unknown;
}

function NotesClientContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 1000);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isSuccess, isError, error, refetch } = useQuery({
    queryKey: ['Notes', debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleQueryChange} value={query} />
        {isLoading && <Loader />}
        {isSuccess && data?.totalPages > 1 && (
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

      {isSuccess && data?.notes?.length > 0 && <NoteList notes={data.notes} />}

      {modalOpen && (
        <NoteModal
          onClose={handleModalClose}
          onSuccess={() => {
            refetch();
            handleModalClose();
          }}
        />
      )}
    </div>
  );
}

export default function NotesClient({ dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <NotesClientContent />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

