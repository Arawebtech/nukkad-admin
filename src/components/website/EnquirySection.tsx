"use client";

import * as React from "react";

import {
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "@/api/enquiry.api";

import {
  Card,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Stack,
  Chip,
  MenuItem,
  TextField,
  Divider,
} from "@mui/material";

import { Eye, PencilSimple, Trash } from "@phosphor-icons/react";

interface Enquiry {
  _id: string;
  fullName: string;
  designation?: string;
  company?: string;
  email: string;
  phone: string;
  city?: string;

  inquiryType?: string;
  objective?: string;

  locations?: string;
  duration?: string;
  audience?: string;
  budget?: string;

  requirements?: string;

  terms?: boolean;

  status: string;
  createdAt: string;
}

export default function EnquiryTable() {
  const [rows, setRows] = React.useState<Enquiry[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [viewOpen, setViewOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [selectedData, setSelectedData] = React.useState<Enquiry | null>(null);
  const [deleteId, setDeleteId] = React.useState("");
  const [status, setStatus] = React.useState("");

  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");

  /* =========================
      GET ALL ENQUIRIES
  ========================= */

  const getEnquiries = async () => {
    try {
      const data = await getAllEnquiries();
      setRows(data.enquiries || []);
    } catch (err: any) {
      setError(err.message || "Failed to load enquiries");
    }
  };

  React.useEffect(() => {
    getEnquiries();
  }, []);

  /* =========================
      VIEW
  ========================= */

  const handleView = (row: Enquiry) => {
    setSelectedData(row);
    setViewOpen(true);
  };

  /* =========================
      EDIT STATUS
  ========================= */

  const handleEdit = (row: Enquiry) => {
    setSelectedData(row);
    setStatus(row.status);
    setEditOpen(true);
  };

  const handleUpdateStatus = async () => {
    try {
      await updateEnquiryStatus(selectedData?._id!, status);

      setSuccess("Status updated successfully");
      setEditOpen(false);
      getEnquiries();
    } catch (err: any) {
      setError(err.message || "Update failed");
    }
  };

  /* =========================
      DELETE
  ========================= */

  const handleDelete = async () => {
    try {
      await deleteEnquiry(deleteId);

      setSuccess("Deleted successfully");
      setDeleteOpen(false);
      getEnquiries();
    } catch (err: any) {
      setError(err.message || "Delete failed");
    }
  };

  return (
    <>
      <Card>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">
            Enquiry Applications
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Inquiry Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row) => (
                  <TableRow hover key={row._id}>
                    <TableCell>
                      <Typography fontWeight={700}>
                        {row.fullName}
                      </Typography>
                    </TableCell>

                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.inquiryType}</TableCell>

                    <TableCell>
                      <Chip
                        label={row.status}
                        color={
                          row.status === "approved"
                            ? "success"
                            : row.status === "rejected"
                            ? "error"
                            : row.status === "contacted"
                            ? "info"
                            : "warning"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(row.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={1}>
                        <IconButton onClick={() => handleView(row)}>
                          <Eye />
                        </IconButton>

                        <IconButton onClick={() => handleEdit(row)}>
                          <PencilSimple />
                        </IconButton>

                        <IconButton
                          onClick={() => {
                            setDeleteId(row._id);
                            setDeleteOpen(true);
                          }}
                        >
                          <Trash />
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
          rowsPerPage={rowsPerPage}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Card>

      {/* =========================
          VIEW DIALOG
      ========================= */}

      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Enquiry Details</DialogTitle>

        <DialogContent>
          {selectedData && (
            <Stack spacing={2} mt={2}>
              <div><b>Name:</b> {selectedData.fullName}</div>
              <div><b>Email:</b> {selectedData.email}</div>
              <div><b>Phone:</b> {selectedData.phone}</div>
              <div><b>Company:</b> {selectedData.company}</div>
              <div><b>City:</b> {selectedData.city}</div>
              <div><b>Objective:</b> {selectedData.objective}</div>
              <div><b>Requirements:</b> {selectedData.requirements}</div>
              <div><b>Budget:</b> {selectedData.budget}</div>
            </Stack>
          )}
        </DialogContent>
      </Dialog>

      {/* =========================
          STATUS UPDATE
      ========================= */}

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update Status</DialogTitle>

        <DialogContent>
          <TextField
            select
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="contacted">Contacted</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateStatus} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* =========================
          DELETE
      ========================= */}

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Enquiry</DialogTitle>
        <DialogContent>Are you sure you want to delete?</DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* SUCCESS */}
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess("")}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      {/* ERROR */}
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError("")}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
}