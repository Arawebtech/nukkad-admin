'use client';

import * as React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import ServicesTable from '@/components/dashboard/services/services-table';

import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from '@/api/serviceApi';

import { getCategories } from '@/api/categoryApi';

interface Category {
  _id: string;
  title: string;
}

interface Service {
  _id: string;

  serviceNo: string;

  title: string;

  icon: string;

  shortDesc: string;

  desc: string;

  mixed: {
    title: string;
    value: string;
  }[];

    status: "active" | "inactive"; // 👈 ADD THIS


  image?: {
    url?: string;
  };

  category: {
    _id: string;
    title: string;
  };

  createdAt: Date;
}

export default function Page(): React.JSX.Element {
  const [services, setServices] =
    React.useState<Service[]>([]);

  const [categories, setCategories] =
    React.useState<Category[]>([]);

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
     FETCH SERVICES
  ============================== */

  const fetchServices =
    async (): Promise<void> => {
      try {
        setLoading(true);

        const response =
          await getAllServices();

        setServices(
          response?.data || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  /* ==============================
     FETCH CATEGORIES
  ============================== */

  const fetchCategories =
    async (): Promise<void> => {
      try {
        const response =
          await getCategories();

        setCategories(
          response?.categories || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  React.useEffect(() => {
    fetchServices();

    fetchCategories();
  }, []);

  /* ==============================
     CREATE SERVICE
  ============================== */

const handleAdd = async (
  formData: FormData
): Promise<void> => {
  try {
    await createService(formData);

    fetchServices();
  } catch (error) {
    console.log(error);

    throw error;
  }
};

  /* ==============================
     UPDATE SERVICE
  ============================== */

const handleUpdate = async (
  id: string,
  formData: FormData
): Promise<void> => {
  try {
    await updateService(
      id,
      formData
    );

    fetchServices();
  } catch (error) {
    console.log(error);

    throw error;
  }
};

  /* ==============================
     DELETE SERVICE
  ============================== */

  const handleDelete =
    async (
      id: string
    ): Promise<void> => {
      try {
        await deleteService(id);

        fetchServices();
      } catch (error) {
        console.log(error);
      }
    };

  /* ==============================
     SEARCH FILTER
  ============================== */

  const filteredServices =
    services.filter((item) =>
      item.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  /* ==============================
     PAGINATION
  ============================== */

  const paginatedServices =
    filteredServices.slice(
      page * rowsPerPage,
      page * rowsPerPage +
        rowsPerPage
    );

  return (
    <Stack spacing={3}>
      {/* TITLE */}
      <Typography variant="h4">
        Services
      </Typography>

      {/* SEARCH */}
      <TextField
        fullWidth
        placeholder="Search service..."
        value={search}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement>
        ) =>
          setSearch(
            e.target.value
          )
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
        <ServicesTable
          rows={
            paginatedServices
          }
          categories={
            categories
          }
          count={
            filteredServices.length
          }
          page={page}
          rowsPerPage={
            rowsPerPage
          }
          onPageChange={(
            _: unknown,
            newPage: number
          ) =>
            setPage(newPage)
          }
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
          onUpdate={
            handleUpdate
          }
          onDelete={
            handleDelete
          }
        />
      )}
    </Stack>
  );
}