// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";

// import {
//   Alert,
//   Avatar,
//   Box,
//   Button,
//   Card,
//   Chip,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   InputAdornment,
//   Snackbar,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";

// import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
// import { Eye } from "@phosphor-icons/react/dist/ssr/Eye";
// import { PencilSimple } from "@phosphor-icons/react/dist/ssr/PencilSimple";
// import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";
// import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";

// import {
//   deleteService,
//   getAllServices,
// } from "@/api/services.Api";

// interface Service {
//   _id: string;
//   name: string;
//   slug: string;
//   active: boolean;

//   heroBanner?: {
//     image?: string;
//   };

//   createdAt: string;
// }

// export default function ServicesPage() {
//   const router = useRouter();

//   const [services, setServices] = React.useState<Service[]>([]);
//   const [loading, setLoading] = React.useState(false);

//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] =
//     React.useState(10);

//   const [total, setTotal] = React.useState(0);

//   const [search, setSearch] =
//     React.useState("");

//   const [deleteId, setDeleteId] =
//     React.useState<string | null>(null);

//   const [snackbar, setSnackbar] =
//     React.useState({
//       open: false,
//       message: "",
//       severity: "success" as
//         | "success"
//         | "error",
//     });

//   const fetchServices = async () => {
//     try {
//       setLoading(true);

//       const res = await getAllServices(
//         page + 1,
//         rowsPerPage,
//         search
//       );

//       setServices(res.data || []);
//       setTotal(
//         res.pagination?.total || 0
//       );
//     } catch (error: any) {
//       setSnackbar({
//         open: true,
//         message:
//           error.message ||
//           "Failed to fetch services",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     fetchServices();
//   }, [page, rowsPerPage]);

//   const handleSearch = () => {
//     setPage(0);
//     fetchServices();
//   };

//   const handleDelete = async () => {
//     try {
//       if (!deleteId) return;

//       await deleteService(deleteId);

//       setSnackbar({
//         open: true,
//         message:
//           "Service deleted successfully",
//         severity: "success",
//       });

//       setDeleteId(null);

//       fetchServices();
//     } catch (error: any) {
//       setSnackbar({
//         open: true,
//         message:
//           error.message ||
//           "Failed to delete service",
//         severity: "error",
//       });
//     }
//   };

//   return (
//     <>
//       <Card sx={{ p: 3 }}>
//         <Stack
//           direction={{
//             xs: "column",
//             md: "row",
//           }}
//           justifyContent="space-between"
//           spacing={2}
//           mb={3}
//         >
//           <Typography variant="h5">
//             Services
//           </Typography>

//           <Button
//             variant="contained"
//             startIcon={<PlusIcon />}
//             onClick={() =>
//               router.push(
//                 "/dashboard/services/add"
//               )
//             }
//           >
//             Add Service
//           </Button>
//         </Stack>

//         <Stack
//           direction={{
//             xs: "column",
//             md: "row",
//           }}
//           spacing={2}
//           mb={3}
//         >
//           <TextField
//             fullWidth
//             size="small"
//             placeholder="Search service..."
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <MagnifyingGlass />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Button
//             variant="outlined"
//             onClick={handleSearch}
//           >
//             Search
//           </Button>
//         </Stack>

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   Image
//                 </TableCell>

//                 <TableCell>
//                   Service Name
//                 </TableCell>

//                 <TableCell>
//                   Slug
//                 </TableCell>

//                 <TableCell>
//                   Status
//                 </TableCell>

//                 <TableCell>
//                   Created
//                 </TableCell>

//                 <TableCell align="right">
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell
//                     colSpan={6}
//                     align="center"
//                   >
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//               ) : services.length ===
//                 0 ? (
//                 <TableRow>
//                   <TableCell
//                     colSpan={6}
//                     align="center"
//                   >
//                     No services found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 services.map((service) => (
//                   <TableRow
//                     key={service._id}
//                     hover
//                   >
//                     <TableCell>
//                       <Avatar
//                         src={
//                           service.heroBanner
//                             ?.image
//                         }
//                         variant="rounded"
//                         sx={{
//                           width: 60,
//                           height: 60,
//                         }}
//                       />
//                     </TableCell>

//                     <TableCell>
//                       {service.name}
//                     </TableCell>

//                     <TableCell>
//                       {service.slug}
//                     </TableCell>

//                     <TableCell>
//                       <Chip
//                         label={
//                           service.active
//                             ? "Active"
//                             : "Inactive"
//                         }
//                         color={
//                           service.active
//                             ? "success"
//                             : "error"
//                         }
//                         size="small"
//                       />
//                     </TableCell>

//                     <TableCell>
//                       {new Date(
//                         service.createdAt
//                       ).toLocaleDateString()}
//                     </TableCell>

//                     <TableCell align="right">
//                       <Stack
//                         direction="row"
//                         justifyContent="flex-end"
//                         spacing={1}
//                       >
//                         <IconButton
//                           color="primary"
//                           onClick={() =>
//                             router.push(
//                               `/dashboard/services/view/${service._id}`
//                             )
//                           }
//                         >
//                           <Eye />
//                         </IconButton>

//                         <IconButton
//                           color="warning"
//                           onClick={() =>
//                             router.push(
//                               `/dashboard/services/edit/${service._id}`
//                             )
//                           }
//                         >
//                           <PencilSimple />
//                         </IconButton>

//                         <IconButton
//                           color="error"
//                           onClick={() =>
//                             setDeleteId(
//                               service._id
//                             )
//                           }
//                         >
//                           <Trash />
//                         </IconButton>
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           component="div"
//           count={total}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={(
//             _,
//             newPage
//           ) => setPage(newPage)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(
//               Number(e.target.value)
//             );
//             setPage(0);
//           }}
//         />
//       </Card>

//       {/* Delete Dialog */}

//       <Dialog
//         open={Boolean(deleteId)}
//         onClose={() =>
//           setDeleteId(null)
//         }
//       >
//         <DialogTitle>
//           Delete Service
//         </DialogTitle>

//         <DialogContent>
//           Are you sure you want to delete
//           this service?
//         </DialogContent>

//         <DialogActions>
//           <Button
//             onClick={() =>
//               setDeleteId(null)
//             }
//           >
//             Cancel
//           </Button>

//           <Button
//             color="error"
//             variant="contained"
//             onClick={handleDelete}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() =>
//           setSnackbar((prev) => ({
//             ...prev,
//             open: false,
//           }))
//         }
//       >
//         <Alert
//           severity={snackbar.severity}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }


"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Eye } from "@phosphor-icons/react/dist/ssr/Eye";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr/PencilSimple";
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";

import { deleteService, getAllServices } from "@/api/services.Api";

interface Service {
  _id: string;
  name: string;
  slug: string;
  active: boolean;

  // thumbnail is the dedicated listing image; fall back to heroBanner if absent
  thumbnail?: {
    imageUrl?: string;
  };
  heroBanner?: {
    image?: string;
  };

  createdAt: string;
}

export default function ServicesPage() {
  const router = useRouter();

  const [services, setServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [total, setTotal] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await getAllServices(page + 1, rowsPerPage, search);
      setServices(res.data || []);
      setTotal(res.pagination?.total || 0);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to fetch services",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchServices();
  }, [page, rowsPerPage]);

  const handleSearch = () => {
    setPage(0);
    fetchServices();
  };

  const handleDelete = async () => {
    try {
      if (!deleteId) return;
      await deleteService(deleteId);
      setSnackbar({
        open: true,
        message: "Service deleted successfully",
        severity: "success",
      });
      setDeleteId(null);
      fetchServices();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to delete service",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={2}
          mb={3}
        >
          <Typography variant="h5">Services</Typography>

          <Button
            variant="contained"
            startIcon={<PlusIcon />}
            onClick={() => router.push("/dashboard/services/add")}
          >
            Add Service
          </Button>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          mb={3}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlass />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" onClick={handleSearch}>
            Search
          </Button>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No services found
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => {
                  // Use thumbnail if available, fall back to hero banner image
                  const avatarSrc =
                    service.thumbnail?.imageUrl ||
                    service.heroBanner?.image ||
                    undefined;

                  return (
                    <TableRow key={service._id} hover>
                      <TableCell>
                        <Avatar
                          src={avatarSrc}
                          variant="rounded"
                          sx={{ width: 60, height: 60 }}
                        />
                      </TableCell>

                      <TableCell>{service.name}</TableCell>

                      <TableCell>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontFamily: "monospace" }}
                        >
                          {service.slug}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={service.active ? "Active" : "Inactive"}
                          color={service.active ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>

                      <TableCell>
                        {new Date(service.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell align="right">
                        <Stack
                          direction="row"
                          justifyContent="flex-end"
                          spacing={1}
                        >
                          <IconButton
                            color="primary"
                            onClick={() =>
                              router.push(
                                `/dashboard/services/view/${service._id}`
                              )
                            }
                          >
                            <Eye />
                          </IconButton>

                          <IconButton
                            color="warning"
                            onClick={() =>
                              router.push(
                                `/dashboard/services/edit/${service._id}`
                              )
                            }
                          >
                            <PencilSimple />
                          </IconButton>

                          <IconButton
                            color="error"
                            onClick={() => setDeleteId(service._id)}
                          >
                            <Trash />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
        />
      </Card>

      {/* Delete Dialog */}
      <Dialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
      >
        <DialogTitle>Delete Service</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this service?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}