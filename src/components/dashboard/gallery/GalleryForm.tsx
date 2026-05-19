'use client';

import * as React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  MenuItem,
  Avatar,
  Typography,
  Switch,
} from '@mui/material';

interface Category {
  _id: string;
  title: string;
}

interface Gallery {
  _id?: string;
  title: string;
  category: string;
  location: string;
  desc: string;
  status?: boolean;
  images?: any[];
  details: {
    completed: boolean;
    clientName: string;
    budget: string;
    year: string;
  };
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData, id?: string) => Promise<void>;
  categories: Category[];
  editData?: Gallery | null;
}

export default function GalleryForm({
  open,
  onClose,
  onSubmit,
  categories,
  editData,
}: Props) {

  const isEdit = !!editData?._id;

  /* =======================
     STATES
  ======================= */

  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [desc, setDesc] = React.useState('');

  const [images, setImages] = React.useState<File[]>([]);
  const [preview, setPreview] = React.useState<string[]>([]);

  const [details, setDetails] = React.useState({
    completed: false,
    clientName: '',
    budget: '',
    year: '',
  });

  /* =======================
     FILL DATA (EDIT)
  ======================= */

  React.useEffect(() => {
    if (editData) {
      setTitle(editData.title || '');
      setCategory(editData.category || '');
      setLocation(editData.location || '');
      setDesc(editData.desc || '');
      setDetails(editData.details || details);
    }
  }, [editData]);

  /* =======================
     IMAGE
  ======================= */

  const handleImage = (files: FileList | null) => {
    if (!files) return;

    const arr = Array.from(files);
    setImages(arr);

    setPreview(arr.map((f) => URL.createObjectURL(f)));
  };

  /* =======================
     SUBMIT
  ======================= */

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('desc', desc);
    formData.append('details', JSON.stringify(details));

    images.forEach((img) => {
      formData.append('images', img);
    });

    await onSubmit(formData, editData?._id);

    onClose();
  };

  /* =======================
     UI
  ======================= */

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">

      <DialogTitle>
        {isEdit ? 'Update Gallery' : 'Add Gallery'}
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} sx={{ mt: 2 }}>

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Category"
            select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.title}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          {/* DETAILS */}
          <Box>
            <Typography>Completed</Typography>
            <Switch
              checked={details.completed}
              onChange={(e) =>
                setDetails({ ...details, completed: e.target.checked })
              }
            />
          </Box>

          <TextField
            label="Client Name"
            value={details.clientName}
            onChange={(e) =>
              setDetails({ ...details, clientName: e.target.value })
            }
          />

          <TextField
            label="Budget"
            value={details.budget}
            onChange={(e) =>
              setDetails({ ...details, budget: e.target.value })
            }
          />

          <TextField
            label="Year"
            value={details.year}
            onChange={(e) =>
              setDetails({ ...details, year: e.target.value })
            }
          />

          {/* IMAGE */}
          <Button variant="outlined" component="label">
            Upload Images
            <input hidden type="file" multiple onChange={(e) => handleImage(e.target.files)} />
          </Button>

          {/* PREVIEW */}
          <Stack direction="row" spacing={2}>
            {preview.map((img, i) => (
              <Avatar key={i} src={img} variant="rounded" />
            ))}
          </Stack>

        </Stack>

      </DialogContent>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </Box>

    </Dialog>
  );
}