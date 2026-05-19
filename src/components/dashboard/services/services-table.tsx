'use client';

import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Trash } from '@phosphor-icons/react/dist/ssr/Trash';

import { useSelection } from '@/hooks/use-selection';
import { Alert, Snackbar } from '@mui/material';
import { Eye } from '@phosphor-icons/react/dist/ssr';

interface Category {
  _id: string;
  title: string;
}

interface MixedField {
  title: string;
  value: string;
}

interface Service {
  _id: string;

  serviceNo: string;

  title: string;

  icon: string;

  shortDesc: string;

  desc: string;

  mixed: MixedField[];
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

interface Props {
  rows: Service[];

  categories: Category[];

  count: number;

  page: number;

  rowsPerPage: number;

  onPageChange: (
    event: unknown,
    newPage: number
  ) => void;

  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  onAdd: (
    formData: FormData
  ) => Promise<void>;

  onUpdate: (
    id: string,
    formData: FormData
  ) => Promise<void>;

  onDelete: (
    id: string
  ) => Promise<void>;
}

export default function ServicesTable({
  rows,
  categories,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onAdd,
  onUpdate,
  onDelete,
}: Props): React.JSX.Element {
  /* ==============================
     SELECTION
  ============================== */

  const rowIds = React.useMemo(() => {
    return rows.map(
      (row) => row._id
    );
  }, [rows]);

  const {
    selectAll,
    deselectAll,
    selectOne,
    deselectOne,
    selected,
  } = useSelection(rowIds);
  const [error, setError] =
  React.useState('');

const [success, setSuccess] =
  React.useState('');
  const [viewOpen, setViewOpen] =
  React.useState(false);

const [viewData, setViewData] =
  React.useState<Service | null>(
    null
  );
  const [status, setStatus] = React.useState<'active' | 'inactive'>('active');

  const selectedSome =
    (selected?.size ?? 0) > 0 &&
    (selected?.size ?? 0) <
      rows.length;

      /* ==============================
   HANDLE VIEW
============================== */

const handleViewOpen = (
  row: Service
) => {
  setViewData(row);

  setViewOpen(true);
};

  const selectedAll =
    rows.length > 0 &&
    selected?.size === rows.length;

  /* ==============================
     DIALOG STATES
  ============================== */
console.log("get the gategoryes",categories)
  const [addOpen, setAddOpen] =
    React.useState(false);

  const [editOpen, setEditOpen] =
    React.useState(false);

  const [deleteOpen, setDeleteOpen] =
    React.useState(false);

  /* ==============================
     FORM STATES
  ============================== */

  const [editId, setEditId] =
    React.useState('');

  const [deleteId, setDeleteId] =
    React.useState('');

  const [title, setTitle] =
    React.useState('');

  const [icon, setIcon] =
    React.useState('');

  const [shortDesc, setShortDesc] =
    React.useState('');

  const [desc, setDesc] =
    React.useState('');

  const [category, setCategory] =
    React.useState('');

  const [image, setImage] =
    React.useState<File | null>(
      null
    );
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [addLoading, setAddLoading] = React.useState(false);
const [updateLoading, setUpdateLoading] = React.useState(false);

  const [mixed, setMixed] =
    React.useState<MixedField[]>([
      {
        title: '',
        value: '',
      },
    ]);

    const handleImageChange = (file: File | null) => {
  setImage(file);

  if (file) {
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  } else {
    setImagePreview(null);
  }
};

  /* ==============================
     RESET FORM
  ============================== */

  const resetForm = () => {
    setTitle('');

    setIcon('');

    setShortDesc('');

    setDesc('');
setStatus('active');
    setCategory('');

    setImage(null);
  setImagePreview(null);
    setMixed([
      {
        title: '',
        value: '',
      },
    ]);
  };

  /* ==============================
     MIXED FIELD
  ============================== */

  const handleMixedChange = (
    index: number,
    field: 'title' | 'value',
    value: string
  ) => {
    const updated = [...mixed];

    updated[index][field] =
      value;

    setMixed(updated);
  };

  const addMixedField = () => {
    setMixed([
      ...mixed,
      {
        title: '',
        value: '',
      },
    ]);
  };

  const removeMixedField = (
    index: number
  ) => {
    const updated =
      mixed.filter(
        (_, i) => i !== index
      );

    setMixed(updated);
  };

  /* ==============================
     CREATE SERVICE
  ============================== */

const handleAdd = async () => {
  if (!title) {
    setError(
          'Title is required'
        );

        return;
      }
      
      
      
      if (!category) {
        setError(
          'Category is required'
        );
        
        return;
      }
      
      if (!shortDesc) {
        setError(
          'Short description is required'
        );
        
        return;
      }
      
      if (!desc) {
        setError(
          'Description is required'
        );
        
        return;
      }
      
      try {
      setAddLoading(true);


      const formData =
        new FormData();
formData.append('status', status);
      formData.append(
        'title',
        title
      );

      formData.append(
        'icon',
        icon
      );

      formData.append(
        'shortDesc',
        shortDesc
      );

      formData.append(
        'desc',
        desc
      );

      formData.append(
        'category',
        category
      );

      formData.append(
        'mixed',
        JSON.stringify(mixed)
      );

      if (image) {
        formData.append(
          'image',
          image
        );
      }

      await onAdd(formData);

      setSuccess(
        'Service created successfully'
      );

      setAddOpen(false);

      setTitle('');
      setIcon('');
      setShortDesc('');
      setDesc('');
      setCategory('');
      setMixed([]);
      setImage(null);
    } 
    catch (error: any) {
      setError(
        error?.response?.data
          ?.message ||
          'Something went wrong'
      );
    }
    finally {
    setAddLoading(false);
  }
  };
  /* ==============================
     EDIT OPEN
  ============================== */

  const handleEditOpen = (
    row: Service
  ) => {
    setEditId(row._id);

    setStatus(row.status || 'active');

    setTitle(row.title);

    setIcon(row.icon);

    setShortDesc(
      row.shortDesc
    );

    setDesc(row.desc);

    setCategory(
      row.category?._id
    );

    setMixed(
      row.mixed?.length > 0
        ? row.mixed
        : [
            {
              title: '',
              value: '',
            },
          ]
    );

      setImagePreview(row.image?.url || null);
    setEditOpen(true);
  };

  /* ==============================
     UPDATE SERVICE
  ============================== */

const handleUpdate =
  async () => {
    try {
    setUpdateLoading(true);


      if (!category) {
        setError(
          'Category is required'
        );

        return;
      }

      const formData =
        new FormData();

        formData.append('status', status);

      formData.append(
        'title',
        title
      );

      formData.append(
        'icon',
        icon
      );

      formData.append(
        'shortDesc',
        shortDesc
      );

      formData.append(
        'desc',
        desc
      );

      formData.append(
        'category',
        category
      );

      formData.append(
        'mixed',
        JSON.stringify(mixed)
      );

      if (image) {
        formData.append(
          'image',
          image
        );
      }

      await onUpdate(
        editId,
        formData
      );

      setSuccess(
        'Service updated successfully'
      );

      setEditOpen(false);
    } catch (error: any) {
      setError(
        error?.response?.data
          ?.message ||
          'Update failed'
      );
    }
    finally {
    setUpdateLoading(false);
  }
  };

  /* ==============================
     DELETE SERVICE
  ============================== */

  const handleDelete =
    async (): Promise<void> => {
      await onDelete(deleteId);

      setDeleteOpen(false);
    };

  return (
    <>
      <Card>
        {/* HEADER */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">
            Services List
          </Typography>

          <Button
            variant="contained"
            startIcon={
              <PlusIcon size={18} />
            }
            onClick={() =>
              setAddOpen(true)
            }
          >
            Add Service
          </Button>
        </Box>

        <Divider />

        {/* TABLE */}
        <Box
          sx={{
            overflowX: 'auto',
          }}
        >
          <Table
            sx={{
              minWidth: '1200px',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      selectedAll
                    }
                    indeterminate={
                      selectedSome
                    }
                    onChange={(e) => {
                      if (
                        e.target.checked
                      ) {
                        selectAll();
                      } else {
                        deselectAll();
                      }
                    }}
                  />
                </TableCell>

                <TableCell>
                  Image
                </TableCell>

                <TableCell>
                  Service No
                </TableCell>

                <TableCell>
                  Title
                </TableCell>

                <TableCell>
                  Category
                </TableCell>

                <TableCell>
                  Icon
                </TableCell>

                <TableCell>
                  Created
                </TableCell>

                <TableCell>Status</TableCell>

                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => {
                const isSelected =
                  selected?.has(
                    row._id
                  );

                return (
                  <TableRow
                    hover
                    key={row._id}
                    selected={
                      isSelected
                    }
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          isSelected
                        }
                        onChange={(e) => {
                          if (
                            e.target
                              .checked
                          ) {
                            selectOne(
                              row._id
                            );
                          } else {
                            deselectOne(
                              row._id
                            );
                          }
                        }}
                      />
                    </TableCell>

                    {/* IMAGE */}
                    <TableCell>
                      <Avatar
                        src={
                          row.image?.url
                        }
                        variant="rounded"
                        sx={{
                          width: 60,
                          height: 60,
                        }}
                      />
                    </TableCell>

                    {/* SERVICE NO */}
                    <TableCell>
                      <Chip
                        label={
                          row.serviceNo
                        }
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>

                    {/* TITLE */}
                    <TableCell>
                      <Typography fontWeight={600}>
                        {row.title}
                      </Typography>
                    </TableCell>

                    {/* CATEGORY */}
                    <TableCell>
                      <Chip
                        label={
                          row.category
                            ?.title
                        }
                        color="success"
                      />
                    </TableCell>

                    {/* ICON */}
                    <TableCell>
                      {row.icon}
                    </TableCell>


                    {/* DATE */}
                    <TableCell>
                      {new Date(
                        row.createdAt
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
  <Chip
    label={row.status}
    color={row.status === 'active' ? 'success' : 'error'}
  />
</TableCell>

                    {/* ACTION */}
               {/* ACTION */}
<TableCell align="right">
  <Stack
    direction="row"
    spacing={1}
    justifyContent="flex-end"
  >
    {/* VIEW */}
    <IconButton
      color="info"
      onClick={() =>
        handleViewOpen(row)
      }
    >
      <Eye size={20} />
    </IconButton>

    {/* EDIT */}
    <IconButton
      color="primary"
      onClick={() =>
        handleEditOpen(row)
      }
    >
      <PencilSimple size={20} />
    </IconButton>

    {/* DELETE */}
    <IconButton
      color="error"
      onClick={() => {
        setDeleteId(row._id);

        setDeleteOpen(true);
      }}
    >
      <Trash size={20} />
    </IconButton>
  </Stack>
</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>

        {/* PAGINATION */}
        <TablePagination
          component="div"
          count={count}
          page={page}
          rowsPerPage={
            rowsPerPage
          }
          onPageChange={
            onPageChange
          }
          onRowsPerPageChange={
            onRowsPerPageChange
          }
          rowsPerPageOptions={[
            5,
            10,
            25,
          ]}
        />
      </Card>

      {/* ==============================
          FORM
      ============================== */}

      {[
        {
          open: addOpen,
          setOpen: setAddOpen,
          titleText:
            'Add Service',
          buttonText: 'Add',
          action: handleAdd,
        },

        {
          open: editOpen,
          setOpen: setEditOpen,
          titleText:
            'Update Service',
          buttonText:
            'Update',
          action:
            handleUpdate,
        },
      ].map((dialog, index) => (
        <Dialog
          key={index}
          open={dialog.open}
          onClose={() =>
            dialog.setOpen(false)
          }
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            {dialog.titleText}
          </DialogTitle>

          <DialogContent>
            <Stack
              spacing={3}
              sx={{ mt: 2 }}
            >
              <TextField
                label="Service Title"
                fullWidth
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
              />

              <TextField
                label="Icon"
                fullWidth
                value={icon}
                onChange={(e) =>
                  setIcon(
                    e.target.value
                  )
                }
              />

              <TextField
                label="Short Description"
                fullWidth
                multiline
                rows={3}
                value={shortDesc}
                onChange={(e) =>
                  setShortDesc(
                    e.target.value
                  )
                }
              />

              <TextField
                label="Description"
                fullWidth
                multiline
                rows={5}
                value={desc}
                onChange={(e) =>
                  setDesc(
                    e.target.value
                  )
                }
              />

              {/* CATEGORY */}
     <TextField
  select
  label="Category"
  fullWidth
  value={category}
  onChange={(e) =>
    setCategory(
      e.target.value
    )
  }
>
  {categories.map((cat) => (
    <MenuItem
      key={cat._id}
      value={cat._id}
    >
      {cat.title}
    </MenuItem>
  ))}
</TextField>

<TextField
  select
  label="Status"
  fullWidth
  value={status}
  onChange={(e) =>
    setStatus(e.target.value as 'active' | 'inactive')
  }
>
  <MenuItem value="active">Active</MenuItem>
  <MenuItem value="inactive">Inactive</MenuItem>
</TextField>

              {/* MIXED */}
              <Stack spacing={2}>
                <Typography variant="h6">
                  Mixed Fields
                </Typography>

                {mixed.map(
                  (
                    item,
                    index
                  ) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={2}
                    >
                      <TextField
                        label="Title"
                        fullWidth
                        value={
                          item.title
                        }
                        onChange={(
                          e
                        ) =>
                          handleMixedChange(
                            index,
                            'title',
                            e.target
                              .value
                          )
                        }
                      />

                      <TextField
                        label="Value"
                        fullWidth
                        value={
                          item.value
                        }
                        onChange={(
                          e
                        ) =>
                          handleMixedChange(
                            index,
                            'value',
                            e.target
                              .value
                          )
                        }
                      />

                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() =>
                          removeMixedField(
                            index
                          )
                        }
                      >
                        Remove
                      </Button>
                    </Stack>
                  )
                )}

                <Button
                  variant="contained"
                  onClick={
                    addMixedField
                  }
                >
                  Add More
                </Button>
              </Stack>

{/* IMAGE PREVIEW */}
{imagePreview && (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      mb: 2,
    }}
  >
    <Avatar
      src={imagePreview}
      variant="rounded"
      sx={{
        width: 120,
        height: 120,
      }}
    />
  </Box>
)}
              {/* IMAGE */}
              <Button
                component="label"
                variant="outlined"
              >
                Upload Image

                <input
                  hidden
                  type="file"
                  accept="image/*"
             onChange={(e) => {
  const file = e.target.files?.[0] || null;

  handleImageChange(file);
}}
                />
              </Button>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() =>
                dialog.setOpen(false)
              }
            >
              Cancel
            </Button>

            {/* <Button
              variant="contained"
              onClick={
                dialog.action
              }
            >
              {dialog.buttonText}
            </Button> */}
            <Button
  variant="contained"
  onClick={dialog.action}
  disabled={
    dialog.titleText === 'Add Service'
      ? addLoading
      : updateLoading
  }
>
  {(dialog.titleText === 'Add Service'
    ? addLoading
    : updateLoading)
    ? 'Processing...'
    : dialog.buttonText}
</Button>
          </DialogActions>
        </Dialog>
      ))}

      {/* ==============================
          DELETE DIALOG
      ============================== */}

      {/* ERROR */}
<Snackbar
  open={!!error}
  autoHideDuration={3000}
  onClose={() =>
    setError('')
  }
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
>
  <Alert
    severity="error"
    variant="filled"
    onClose={() =>
      setError('')
    }
  >
    {error}
  </Alert>
</Snackbar>

{/* SUCCESS */}
<Snackbar
  open={!!success}
  autoHideDuration={3000}
  onClose={() =>
    setSuccess('')
  }
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
>
  <Alert
    severity="success"
    variant="filled"
    onClose={() =>
      setSuccess('')
    }
  >
    {success}
  </Alert>
</Snackbar>

      <Dialog
        open={deleteOpen}
        onClose={() =>
          setDeleteOpen(false)
        }
      >
        <DialogTitle>
          Delete Service
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want
            to delete this
            service?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDeleteOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={
              handleDelete
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==============================
    VIEW DIALOG
============================== */}

<Dialog
  open={viewOpen}
  onClose={() =>
    setViewOpen(false)
  }
  fullWidth
  maxWidth="md"
>
  <DialogTitle>
    Service Details
  </DialogTitle>

  <DialogContent>
    {viewData && (
      <Stack spacing={3} sx={{ mt: 2 }}>
        
        {/* IMAGE */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Avatar
            src={viewData.image?.url}
            variant="rounded"
            sx={{
              width: 140,
              height: 140,
            }}
          />
        </Box>

        {/* SERVICE NO */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Service Number
          </Typography>

          <Chip
            label={viewData.serviceNo}
            color="primary"
          />
        </Box>

        {/* TITLE */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Title
          </Typography>

          <Typography variant="h6">
            {viewData.title}
          </Typography>
        </Box>

        {/* CATEGORY */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Category
          </Typography>

          <Chip
            label={
              viewData.category?.title
            }
            color="success"
          />
        </Box>

        {/* ICON */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Icon
          </Typography>

          <Typography>
            {viewData.icon}
          </Typography>
        </Box>

        {/* SHORT DESC */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Short Description
          </Typography>

          <Typography>
            {viewData.shortDesc}
          </Typography>
        </Box>

        {/* DESC */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Description
          </Typography>

          <Typography>
            {viewData.desc}
          </Typography>
        </Box>

        {/* MIXED */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Mixed Fields
          </Typography>

          <Stack spacing={2}>
            {viewData.mixed?.map(
              (item, index) => (
                <Card
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    fontWeight={700}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    {item.value}
                  </Typography>
                </Card>
              )
            )}
          </Stack>
        </Box>

        {/* CREATED */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Created At
          </Typography>

          <Typography>
            {new Date(
              viewData.createdAt
            ).toLocaleString()}
          </Typography>
        </Box>
      </Stack>
    )}
  </DialogContent>

  <DialogActions>
    <Button
      variant="contained"
      onClick={() =>
        setViewOpen(false)
      }
    >
      Close
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
}