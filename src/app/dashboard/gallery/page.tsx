'use client';

import * as React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import GalleryTable from '@/components/dashboard/gallery/gallery-section';

import {

  createGallery,
  updateGallery,
  deleteGallery,
  getAllGallery,
  toggleGalleryStatus,
} from '@/api/gallery.api';

import { getCategories } from '@/api/categoryApi';

/* =========================
   TYPES
========================= */

interface Category {
  _id: string;
  title: string;
}

interface Gallery {
  _id: string;

  galleryNo: string;

  title: string;

  category: {
    _id: string;
    title: string;
  };

  location: string;

  desc: string;

  status: boolean;

  images: {
    url: string;
    public_id: string;
  }[];

  details: {
    completed: boolean;
  };

  createdAt: Date;
}

/* =========================
   PAGE
========================= */

export default function Page(): React.JSX.Element {

  const [galleries, setGalleries] = React.useState<Gallery[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  /* =========================
     PAGINATION
  ========================= */

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  /* =========================
     SEARCH
  ========================= */

  const [search, setSearch] = React.useState('');

  /* =========================
     FETCH GALLERIES
  ========================= */

  const fetchGalleries = async () => {
    try {
      setLoading(true);

      const res = await getAllGallery();

      setGalleries(res?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FETCH CATEGORIES
  ========================= */

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res?.categories || []);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchGalleries();
    fetchCategories();
  }, []);

  /* =========================
     CREATE
  ========================= */

  const handleAdd = async (formData: FormData): Promise<void> => {
    try {
      await createGallery(formData);
      fetchGalleries();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /* =========================
     UPDATE
  ========================= */

  const handleUpdate = async (
    id: string,
    formData: FormData
  ): Promise<void> => {
    try {
      await updateGallery(id, formData);
      fetchGalleries();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteGallery(id);
      fetchGalleries();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleStatus = async (id: string): Promise<void> => {
  try {
    await toggleGalleryStatus(id);
    fetchGalleries(); // refresh
  } catch (err) {
    console.log(err);
  }
};

  /* =========================
     SEARCH FILTER
  ========================= */

  const filtered = galleries.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  /* =========================
     PAGINATION
  ========================= */

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  /* =========================
     UI
  ========================= */

  return (
    <Stack spacing={3}>

      {/* TITLE */}
      <Typography variant="h4">
        Gallery
      </Typography>

      {/* SEARCH */}
      <TextField
        fullWidth
        placeholder="Search gallery..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      {loading ? (
        <Stack alignItems="center" justifyContent="center" sx={{ py: 10 }}>
          <CircularProgress />
        </Stack>
      ) : (
       <GalleryTable
  rows={paginated}
  categories={categories}
  onAdd={handleAdd}
  onUpdate={handleUpdate}
  onDelete={handleDelete}
  onToggleStatus={handleToggleStatus}
/>
      )}

    </Stack>
  );
}