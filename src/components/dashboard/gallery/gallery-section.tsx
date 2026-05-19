'use client';

import * as React from 'react';

import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';

import { Eye, Trash, PencilSimple } from '@phosphor-icons/react';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

/* =========================
   TYPES
========================= */

interface Category {
  _id: string;
  title: string;
}

interface Image {
  url: string;
  public_id: string;
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

  coverImage?: Image;
  images: Image[];

  details: {
    completed: boolean;
    clientName?: string;
    budget?: number;
    year?: number;
  };

  createdAt: Date;
}

interface Props {
  rows: Gallery[];
  categories: Category[];

  onAdd: (data: FormData) => Promise<void>;
  onUpdate: (id: string, data: FormData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleStatus?: (id: string, status: boolean) => Promise<void>;
}

/* =========================
   COMPONENT
========================= */

export default function GalleryTable({
  rows,
  categories,
  onAdd,
  onUpdate,
  onDelete,
  onToggleStatus,
}: Props) {

  /* =========================
     STATE
  ========================= */

  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);

  const [editId, setEditId] = React.useState('');
  const [viewData, setViewData] = React.useState<Gallery | null>(null);

  const [deleteId, setDeleteId] = React.useState('');
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  /* =========================
     FORM
  ========================= */

  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [desc, setDesc] = React.useState('');

  const [status, setStatus] = React.useState(true);

  const [details, setDetails] = React.useState({
    completed: false,
    clientName: '',
    budget: '',
    year: '',
  });

  const [coverImage, setCoverImage] = React.useState<File | null>(null);
  const [coverPreview, setCoverPreview] = React.useState<string | null>(null);

  const [images, setImages] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [loadingAction, setLoadingAction] = React.useState(false);
const [loadingText, setLoadingText] = React.useState('');

  /* =========================
     RESET
  ========================= */

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setLocation('');
    setDesc('');
    setStatus(true);

    setDetails({
      completed: false,
      clientName: '',
      budget: '',
      year: '',
    });

    setCoverImage(null);
    setCoverPreview(null);
    setImages([]);
    setPreviews([]);
  };

  /* =========================
     IMAGE
  ========================= */

  const handleCover = (file: File | null) => {
    setCoverImage(file);
    setCoverPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleImages = (files: FileList | null) => {
    if (!files) return;

    const arr = Array.from(files);
    setImages(arr);
    setPreviews(arr.map(f => URL.createObjectURL(f)));
  };

  /* =========================
     ADD
  ========================= */

const handleAdd = async () => {
  try {
    setLoadingAction(true);
    setLoadingText('Adding gallery...');

    const formData = new FormData();

    formData.append('title', title);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('desc', desc);
    formData.append('status', String(status));
    formData.append('details', JSON.stringify(details));

    if (coverImage) formData.append('coverImage', coverImage);
    images.forEach(img => formData.append('images', img));

    await onAdd(formData);

    setSuccess('Gallery Added');
    setAddOpen(false);
    resetForm();
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoadingAction(false);
  }
};

  /* =========================
     EDIT OPEN
  ========================= */

  const handleEditOpen = (row: Gallery) => {
    setEditId(row._id);

    setTitle(row.title);
    setCategory(row.category._id);
    setLocation(row.location);
    setDesc(row.desc);

    setStatus(row.status);
    // setDetails(row.details)

    setCoverPreview(row.coverImage?.url || null);
    setPreviews(row.images.map(i => i.url));

    setEditOpen(true);
  };

  /* =========================
     UPDATE
  ========================= */

const handleUpdate = async () => {
  try {
    setLoadingAction(true);
    setLoadingText('Updating gallery...');

    const formData = new FormData();

    formData.append('title', title);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('desc', desc);
    formData.append('status', String(status));
    formData.append('details', JSON.stringify(details));

    if (coverImage) formData.append('coverImage', coverImage);
    images.forEach(img => formData.append('images', img));

    await onUpdate(editId, formData);

    setSuccess('Gallery Updated');
    setEditOpen(false);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoadingAction(false);
  }
};

  /* =========================
     DELETE
  ========================= */

const handleDelete = async () => {
  try {
    setLoadingAction(true);
    setLoadingText('Deleting gallery...');

    await onDelete(deleteId);

    setSuccess('Deleted successfully');
    setDeleteOpen(false);
  } catch (err: any) {
    setError('Delete failed');
  } finally {
    setLoadingAction(false);
  }
};

const handleToggle = async (id: string, current: boolean) => {
  try {
    setLoadingAction(true);
    setLoadingText('Updating status...');

    await onToggleStatus?.(id, !current);
  } catch (err) {
    console.log(err);
  } finally {
    setLoadingAction(false);
  }
};

  /* =========================
     VIEW
  ========================= */

  const handleView = (row: Gallery) => {
    setViewData(row);
    setViewOpen(true);
  };


  
  /* =========================
     UI
  ========================= */

  return (
    <>
      <Card>

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Gallery</Typography>

          <Button startIcon={<PlusIcon />} variant="contained" onClick={() => setAddOpen(true)}>
            Add Gallery
          </Button>
        </Box>

        <Divider />

        {loadingAction && (
  <Box
    sx={{
      position: 'fixed',
      inset: 0,
      bgcolor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}
  >
    <Card sx={{ p: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
      <CircularProgress size={24} />
      <Typography>{loadingText}</Typography>
    </Card>
  </Box>
)}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cover</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row._id}>

                <TableCell>
                  <Avatar src={row.coverImage?.url} variant="rounded" />
                </TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {row.images.slice(0, 2).map((img, i) => (
                      <Avatar key={i} src={img.url} variant="rounded" />
                    ))}
                  </Stack>
                </TableCell>

                <TableCell>
                  <Chip label={row.galleryNo} />
                </TableCell>

                <TableCell>{row.title}</TableCell>

                <TableCell>
                  <Chip label={row.category.title} color="success" />
                </TableCell>

                {/* STATUS TOGGLE */}
                <TableCell>
                <Switch
  checked={row.status}
  onChange={() => handleToggle(row._id, row.status)}
/>
                </TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleView(row)}>
                      <Eye />
                    </IconButton>

                    <IconButton onClick={() => handleEditOpen(row)}>
                      <PencilSimple />
                    </IconButton>

                    <IconButton color="error" onClick={() => {
                      setDeleteId(row._id);
                      setDeleteOpen(true);
                    }}>
                      <Trash />
                    </IconButton>
                  </Stack>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* =========================
         ADD / EDIT FORM
      ========================= */}

      {[{ open: addOpen, setOpen: setAddOpen, action: handleAdd, title: 'Add Gallery' },
        { open: editOpen, setOpen: setEditOpen, action: handleUpdate, title: 'Edit Gallery' }
      ].map((d, i) => (
        <Dialog key={i} open={d.open} fullWidth maxWidth="md">

          <DialogTitle>{d.title}</DialogTitle>

          <DialogContent>

            <Stack spacing={2} sx={{ mt: 2 }}>

              <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />

              <TextField select label="Category" value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(c => (
                  <MenuItem key={c._id} value={c._id}>{c.title}</MenuItem>
                ))}
              </TextField>

              <TextField label="Location" value={location} onChange={e => setLocation(e.target.value)} />

              <TextField label="Description" multiline rows={3} value={desc} onChange={e => setDesc(e.target.value)} />

              {/* STATUS TOGGLE */}
              <FormControlLabel
                control={
                  <Switch checked={status} onChange={(e) => setStatus(e.target.checked)} />
                }
                label="Active Status"
              />

              {/* DETAILS COMPLETED */}
              <FormControlLabel
                control={
                  <Switch
                    checked={details.completed}
                    onChange={(e) =>
                      setDetails({ ...details, completed: e.target.checked })
                    }
                  />
                }
                label="Completed"
              />

              {/* COVER */}
              <Button component="label" variant="outlined">
                Upload Cover
                <input hidden type="file" accept="image/*"
                  onChange={e => handleCover(e.target.files?.[0] || null)}
                />
              </Button>

              {coverPreview && <Avatar src={coverPreview} variant="rounded" />}

              {/* IMAGES */}
              <Button component="label" variant="outlined">
                Upload Images
                <input hidden multiple type="file" onChange={e => handleImages(e.target.files)} />
              </Button>

              <Stack direction="row" spacing={1}>
                {previews.map((p, i) => (
                  <Avatar key={i} src={p} variant="rounded" />
                ))}
              </Stack>

            </Stack>

          </DialogContent>

          <DialogActions>
            <Button onClick={() => d.setOpen(false)}>Cancel</Button>
            <Button onClick={d.action} variant="contained">Save</Button>
          </DialogActions>

        </Dialog>
      ))}

 {/* VIEW */}
<Dialog open={viewOpen} onClose={() => setViewOpen(false)} fullWidth maxWidth="md">
  <DialogTitle>Gallery Details</DialogTitle>

  <DialogContent>
    <Stack spacing={3} sx={{ mt: 2 }}>

      <Typography>
        <b>Title:</b> {viewData?.title}
      </Typography>

      <Typography>
        <b>Category:</b> {viewData?.category?.title}
      </Typography>

      <Typography>
        <b>Location:</b> {viewData?.location}
      </Typography>

      {/* COMPLETED */}
      {/* <Box>
        <Typography sx={{ mb: 1 }}>
          <b>Completed:</b>
        </Typography>

        <Chip
          label={viewData?.details?.completed ? "Yes (Completed)" : "No (Pending)"}
          color={viewData?.details?.completed ? "success" : "warning"}
        />
      </Box> */}

         <Box>
        <Typography sx={{ mb: 1 }}>
          <b>Status:</b>
        </Typography>

        <Chip
          label={viewData?.status ? "Yes Active" : "InActive"}
          color={viewData?.status ? "success" : "warning"}
        />
      </Box>

      {/* COVER IMAGE */}
      {viewData?.coverImage?.url && (
        <Box>
          <Typography sx={{ mb: 1 }}>
            <b>Cover Image</b>
          </Typography>

          <Avatar
            src={viewData.coverImage.url}
            variant="rounded"
            sx={{ width: 200, height: 150 }}
          />
        </Box>
      )}

      {/* MULTIPLE IMAGES (SAFE FIX) */}
      {viewData?.images?.length ? (
        <Box>
          <Typography sx={{ mb: 1 }}>
            <b>Gallery Images</b>
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap">
            {viewData.images.map((img, i) => (
              <Avatar
                key={i}
                src={img.url}
                variant="rounded"
                sx={{ width: 120, height: 100 }}
              />
            ))}
          </Stack>
        </Box>
      ) : null}

    </Stack>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setViewOpen(false)}>Close</Button>
  </DialogActions>
</Dialog>

      {/* DELETE */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar open={!!error}><Alert severity="error">{error}</Alert></Snackbar>
      <Snackbar open={!!success}><Alert severity="success">{success}</Alert></Snackbar>
    </>
  );
}