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
import { MenuItem } from '@mui/material';

interface Category {
  _id: string;
  categoryNo: string;
  title: string;
  icon?: string;
    status: "active" | "inactive"; // 👈 ADD THIS


  image?: {
    url?: string;
  };

  createdAt: Date;
}

interface Props {
  rows: Category[];

  count: number;

  page: number;

  rowsPerPage: number;

  onPageChange: any;

  onRowsPerPageChange: any;

  onAdd: (
    formData: FormData
  ) => void;

  onUpdate: (
    id: string,
    formData: FormData
  ) => void;

  onDelete: (
    id: string
  ) => void;
}

export default function CategoriesTable({
  rows,
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

  const selectedSome =
    (selected?.size ?? 0) > 0 &&
    (selected?.size ?? 0) <
      rows.length;

  const selectedAll =
    rows.length > 0 &&
    selected?.size ===
      rows.length;

  /* ==============================
     STATES
  ============================== */

  const [addOpen, setAddOpen] =
    React.useState(false);

  const [editOpen, setEditOpen] =
    React.useState(false);
    const [status, setStatus] = React.useState<'active' | 'inactive'>('active');

  const [deleteOpen, setDeleteOpen] =
    React.useState(false);

  const [deleteId, setDeleteId] =
    React.useState('');

  const [editId, setEditId] =
    React.useState('');

  const [title, setTitle] =
    React.useState('');

  const [icon, setIcon] =
    React.useState('');

  const [image, setImage] =
    React.useState<File | null>(
      null
    );

  /* ==============================
     ADD
  ============================== */

  const handleAdd =
    async () => {
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

      if (image) {
        formData.append(
          'image',
          image
        );
      }

     const addCategory =  await onAdd(formData);

      setAddOpen(false);
setStatus('active');
      setTitle('');

      setIcon('');

      setImage(null);
    };

  /* ==============================
     EDIT OPEN
  ============================== */

 const handleEditOpen = (row: Category) => {
  setEditId(row._id);
  setTitle(row.title);
  setIcon(row.icon || '');
  setStatus(row.status || 'active'); // 👈 ADD THIS
  setEditOpen(true);
};

  /* ==============================
     UPDATE
  ============================== */

  const handleUpdate =
    async () => {
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

      setEditOpen(false);

      setTitle('');

      setIcon('');
setStatus('active');
      setImage(null);
    };

  /* ==============================
     DELETE
  ============================== */

  const handleDelete =
    async () => {
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
            Categories List
          </Typography>

          <Button
            variant="contained"
            startIcon={
              <PlusIcon
                size={18}
              />
            }
            onClick={() =>
              setAddOpen(true)
            }
          >
            Add Category
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
              minWidth: '900px',
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
                    onChange={(
                      e
                    ) => {
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
                  Category No
                </TableCell>

                <TableCell>
                  Title
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
                        onChange={(
                          e
                        ) => {
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
                          row.image
                            ?.url
                        }
                        variant="rounded"
                        sx={{
                          width: 60,
                          height: 60,
                        }}
                      />
                    </TableCell>

                    {/* CATEGORY NO */}
                    <TableCell>
                      <Chip
                        label={
                          row.categoryNo
                        }
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>

                    {/* TITLE */}
                    <TableCell>
                      <Typography
                        fontWeight={600}
                        textTransform="capitalize"
                      >
                        {row.title}
                      </Typography>
                    </TableCell>

                    {/* ICON */}
                    <TableCell>
                      {row.icon ||
                        '-'}
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

                    {/* ACTIONS */}
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleEditOpen(
                              row
                            )
                          }
                        >
                          <PencilSimple
                            size={20}
                          />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => {
                            setDeleteId(
                              row._id
                            );

                            setDeleteOpen(
                              true
                            );
                          }}
                        >
                          <Trash
                            size={20}
                          />
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
          ADD DIALOG
      ============================== */}

      <Dialog
        open={addOpen}
        onClose={() =>
          setAddOpen(false)
        }
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Add Category
        </DialogTitle>

        <DialogContent>
          <Stack
            spacing={3}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />
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
                  if (
                    e.target
                      .files?.[0]
                  ) {
                    setImage(
                      e.target
                        .files[0]
                    );
                  }
                }}
              />
            </Button>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setAddOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleAdd}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* ==============================
          EDIT DIALOG
      ============================== */}

      <Dialog
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Update Category
        </DialogTitle>

        <DialogContent>
          <Stack
            spacing={3}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />

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
                  if (
                    e.target
                      .files?.[0]
                  ) {
                    setImage(
                      e.target
                        .files[0]
                    );
                  }
                }}
              />
            </Button>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setEditOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={
              handleUpdate
            }
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* ==============================
          DELETE DIALOG
      ============================== */}

      <Dialog
        open={deleteOpen}
        onClose={() =>
          setDeleteOpen(false)
        }
      >
        <DialogTitle>
          Delete Category
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want
            to delete this
            category?
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
    </>
  );
}