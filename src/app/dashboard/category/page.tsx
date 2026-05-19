'use client';

import * as React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import CategoriesTable from '@/components/dashboard/categories/categories-table';

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/api/categoryApi';

export default function Page(): React.JSX.Element {
  const [categories, setCategories] =
    React.useState<any[]>([]);

  const [loading, setLoading] =
    React.useState<boolean>(true);

  /* ==============================
     PAGINATION
  ============================== */

  const [page, setPage] =
    React.useState(0);

  const [rowsPerPage, setRowsPerPage] =
    React.useState(5);

  /* ==============================
     SEARCH
  ============================== */

  const [search, setSearch] =
    React.useState('');

  /* ==============================
     FETCH CATEGORY
  ============================== */

  const fetchCategories =
    async () => {
      try {
        setLoading(true);

        const response =
          await getCategories();

        setCategories(
          response?.categories || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  /* ==============================
     ADD CATEGORY
  ============================== */

  const handleAdd =
    async (formData: FormData) => {
      try {
        await createCategory(
          formData
        );

        fetchCategories();
      } catch (error) {
        console.log(error);
      }
    };

  /* ==============================
     UPDATE CATEGORY
  ============================== */

  const handleUpdate =
    async (
      id: string,
      formData: FormData
    ) => {
      try {
        await updateCategory(
          id,
          formData
        );

        fetchCategories();
      } catch (error) {
        console.log(error);
      }
    };

  /* ==============================
     DELETE CATEGORY
  ============================== */

  const handleDelete =
    async (id: string) => {
      try {
        await deleteCategory(id);

        fetchCategories();
      } catch (error) {
        console.log(error);
      }
    };

  /* ==============================
     SEARCH FILTER
  ============================== */

  const filteredCategories =
    categories.filter((item) =>
      item.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  /* ==============================
     PAGINATION
  ============================== */

  const paginatedCategories =
    filteredCategories.slice(
      page * rowsPerPage,
      page * rowsPerPage +
        rowsPerPage
    );

  return (
    <Stack spacing={3}>
      {/* TITLE */}
      <Typography variant="h4">
        Categories
      </Typography>

      {/* SEARCH */}
      <TextField
        fullWidth
        placeholder="Search category..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* TABLE */}
      {loading ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ py: 10 }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <CategoriesTable
          rows={
            paginatedCategories
          }
          count={
            filteredCategories.length
          }
          page={page}
          rowsPerPage={
            rowsPerPage
          }
     onPageChange={(
  _: React.MouseEvent<
    HTMLButtonElement
  > | null,
  newPage: number
) => setPage(newPage)}

onRowsPerPageChange={(
  event: React.ChangeEvent<HTMLInputElement>
) => {
  setRowsPerPage(
    parseInt(
      event.target.value,
      10
    )
  );

  setPage(0);
}}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </Stack>
  );
}