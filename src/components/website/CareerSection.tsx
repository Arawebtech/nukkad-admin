'use client';

import * as React from 'react';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Eye } from '@phosphor-icons/react/dist/ssr/Eye';
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Trash } from '@phosphor-icons/react/dist/ssr/Trash';
import { deleteCareer, getAllCareers, updateCareerStatus } from '@/api/career.api';

interface Career {
  _id: string;

  fullName: string;

  phone: string;

  email: string;

  position: string;

  experience: string;

  location: string;

  availability: string;

  about: string;

  status: string;

  resume?: {
    url?: string;

    public_id?: string;
  };

  createdAt: string;
}

export default function CareersTable(): React.JSX.Element {
  const [rows, setRows] =
    React.useState<Career[]>([]);

  const [loading, setLoading] =
    React.useState(false);

  const [page, setPage] =
    React.useState(0);

  const [rowsPerPage, setRowsPerPage] =
    React.useState(10);

  const [viewOpen, setViewOpen] =
    React.useState(false);

  const [editOpen, setEditOpen] =
    React.useState(false);

  const [deleteOpen, setDeleteOpen] =
    React.useState(false);

  const [selectedData, setSelectedData] =
    React.useState<Career | null>(
      null
    );

  const [deleteId, setDeleteId] =
    React.useState('');

  const [status, setStatus] =
    React.useState('');

  const [success, setSuccess] =
    React.useState('');

  const [error, setError] =
    React.useState('');

  /* =========================
      GET CAREERS
  ========================= */

const getCareers = async (): Promise<void> => {
  try {
    setLoading(true);

    const data = await getAllCareers();

    setRows(data.careers || []);
  } catch (error: any) {
    setError(error?.message || "Failed to load careers");
  } finally {
    setLoading(false);
  }
};

  React.useEffect(() => {
    getCareers();
  }, []);

  /* =========================
      VIEW
  ========================= */

  const handleView = (
    row: Career
  ) => {
    setSelectedData(row);

    setViewOpen(true);
  };

  /* =========================
      EDIT STATUS
  ========================= */

  const handleEdit = (
    row: Career
  ) => {
    setSelectedData(row);

    setStatus(row.status);

    setEditOpen(true);
  };

const handleUpdateStatus = async (): Promise<void> => {
  try {
    await updateCareerStatus(selectedData?._id!, status);

    setSuccess("Status updated successfully");

    setEditOpen(false);

    getCareers();
  } catch (error: any) {
    setError(error?.message || "Update failed");
  }
};

  /* =========================
      DELETE
  ========================= */

const handleDelete = async (): Promise<void> => {
  try {
    await deleteCareer(deleteId);

    setSuccess("Career deleted successfully");

    setDeleteOpen(false);

    getCareers();
  } catch (error: any) {
    setError(error?.message || "Delete failed");
  }
};

  return (
    <>
      <Card>
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
            Career Applications
          </Typography>
        </Box>

        <Divider />

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
                <TableCell>
                  Resume
                </TableCell>

                <TableCell>
                  Name
                </TableCell>

                <TableCell>
                  Email
                </TableCell>

                <TableCell>
                  Phone
                </TableCell>

                <TableCell>
                  Position
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

                <TableCell>
                  Created
                </TableCell>

                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage +
                    rowsPerPage
                )
                .map((row) => (
                  <TableRow
                    hover
                    key={row._id}
                  >
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src="/pdf.png"
                        sx={{
                          width: 55,
                          height: 55,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={700}>
                        {row.fullName}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {row.email}
                    </TableCell>

                    <TableCell>
                      {row.phone}
                    </TableCell>

                    <TableCell>
                      {row.position}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={
                          row.status
                        }
                        color={
                          row.status ===
                          'approved'
                            ? 'success'
                            : row.status ===
                                'rejected'
                              ? 'error'
                              : 'warning'
                        }
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(
                        row.createdAt
                      ).toLocaleDateString()}
                    </TableCell>

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
                            handleView(
                              row
                            )
                          }
                        >
                          <Eye size={20} />
                        </IconButton>

                        {/* EDIT */}
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleEdit(
                              row
                            )
                          }
                        >
                          <PencilSimple size={20} />
                        </IconButton>

                        {/* DELETE */}
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
                          <Trash size={20} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>

        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          rowsPerPage={
            rowsPerPage
          }
          onPageChange={(
            _,
            newPage
          ) =>
            setPage(newPage)
          }
          onRowsPerPageChange={(
            e
          ) => {
            setRowsPerPage(
              parseInt(
                e.target.value,
                10
              )
            );

            setPage(0);
          }}
          rowsPerPageOptions={[
            5,
            10,
            25,
          ]}
        />
      </Card>

      {/* =========================
          VIEW DIALOG
      ========================= */}

      <Dialog
        open={viewOpen}
        onClose={() =>
          setViewOpen(false)
        }
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Career Details
        </DialogTitle>

        <DialogContent>
          {selectedData && (
            <Stack
              spacing={3}
              sx={{ mt: 2 }}
            >
              <Box>
                <Typography fontWeight={700}>
                  Full Name
                </Typography>

                <Typography>
                  {
                    selectedData.fullName
                  }
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={700}>
                  Email
                </Typography>

                <Typography>
                  {
                    selectedData.email
                  }
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={700}>
                  Phone
                </Typography>

                <Typography>
                  {
                    selectedData.phone
                  }
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={700}>
                  Position
                </Typography>

                <Typography>
                  {
                    selectedData.position
                  }
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={700}>
                  Experience
                </Typography>

                <Typography>
                  {
                    selectedData.experience
                  }{' '}
                  Years
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={700}>
                  Location
                </Typography>

                <Typography>
                  {
                    selectedData.location
                  }
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={700}>
                  Availability
                </Typography>

                <Typography>
                  {
                    selectedData.availability
                  }
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={700}>
                  About
                </Typography>

                <Typography>
                  {
                    selectedData.about
                  }
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={700}>
                  Resume
                </Typography>

                {selectedData.resume?.url && (
  <Button
    variant="contained"
    href={selectedData.resume.url}
    target="_blank"
  >
    View Resume
  </Button>
)}
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

      {/* =========================
          STATUS UPDATE
      ========================= */}

      <Dialog
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Update Status
        </DialogTitle>

        <DialogContent>
          <Stack
            spacing={3}
            sx={{ mt: 2 }}
          >
            <TextField
              select
              label="Status"
              fullWidth
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >
              <MenuItem value="pending">
                Pending
              </MenuItem>

              <MenuItem value="approved">
                Approved
              </MenuItem>

              <MenuItem value="rejected">
                Rejected
              </MenuItem>
            </TextField>
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
              handleUpdateStatus
            }
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* =========================
          DELETE
      ========================= */}

      <Dialog
        open={deleteOpen}
        onClose={() =>
          setDeleteOpen(false)
        }
      >
        <DialogTitle>
          Delete Career
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want
            to delete this
            application?
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

      {/* =========================
          ERROR
      ========================= */}

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

      {/* =========================
          SUCCESS
      ========================= */}

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
    </>
  );
}