// app/dashboard/blog/page.tsx

'use client';

import * as React from 'react';

import Link from 'next/link';

import axios from 'axios';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
  DialogActions,
} from '@mui/material';

import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple';

import { Trash } from '@phosphor-icons/react/dist/ssr/Trash';

import { Eye } from '@phosphor-icons/react/dist/ssr/Eye';
import { X } from '@phosphor-icons/react';

interface Blog {
  _id: string;

  blogNo: string;

  title: string;
  seoTitle: string;
  seoDesc: string;

  slug: string;

  shortDesc: string;

  desc: string;

  status: 'draft' | 'published';

  featured: boolean;

  views: number;

  author: string;

  createdAt: string;

  tags?: {
    value: string;
  }[];

  seoKeywords?: {
    value: string;
  }[];

  coverImage?: {
    url?: string;
  };

  images?: {
    url?: string;
  }[];
}

export default function BlogPage() {
  const [rows, setRows] =
    React.useState<Blog[]>([]);

  const [loading, setLoading] =
    React.useState(false);

    const [deleteOpen, setDeleteOpen] =
  React.useState(false);

const [deleteId, setDeleteId] =
  React.useState('');

  const [page, setPage] =
    React.useState(0);

  const [rowsPerPage, setRowsPerPage] =
    React.useState(10);

  const [count, setCount] =
    React.useState(0);

  const [search, setSearch] =
    React.useState('');

  const [statusFilter, setStatusFilter] =
    React.useState('');

  const [success, setSuccess] =
    React.useState('');

  const [error, setError] =
    React.useState('');

  const [openView, setOpenView] =
    React.useState(false);

  const [selectedBlog, setSelectedBlog] =
    React.useState<Blog | null>(null);

  /* ==============================
     FETCH BLOGS
  ============================== */

  const fetchBlogs =
    async () => {
      try {
        setLoading(true);

        const res =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/blog/all`,
            {
              params: {
                page: page + 1,
                limit: rowsPerPage,
                search,
                status:
                  statusFilter,
              },
            }
          );

        setRows(
          res.data.data
        );

        setCount(
          res.data.total
        );
      } catch (error: any) {
        setError(
          error?.response?.data
            ?.message ||
            'Failed to fetch blogs'
        );
      } finally {
        setLoading(false);
      }
    };

  React.useEffect(() => {
    fetchBlogs();
  }, [
    page,
    rowsPerPage,
    search,
    statusFilter,
  ]);

  /* ==============================
     DELETE BLOG
  ============================== */

  const handleDelete =
    async (
      id: string
    ) => {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog/delete/${id}`
        );

        setSuccess(
          'Blog deleted successfully'
        );

        fetchBlogs();
      } catch (error: any) {
        setError(
          error?.response?.data
            ?.message ||
            'Delete failed'
        );
      }
    };

  /* ==============================
     UPDATE STATUS
  ============================== */

  const handleStatusChange =
    async (
      id: string,
      status:
        | 'draft'
        | 'published'
    ) => {
      try {
      await axios.put(
  `${process.env.NEXT_PUBLIC_API_URL}/api/blog/status/${id}`,
          {
            status,
          }
        );

        setSuccess(
          'Status updated successfully'
        );

        fetchBlogs();
      } catch (error: any) {
        setError(
          error?.response?.data
            ?.message ||
            'Status update failed'
        );
      }
    };

  /* ==============================
     VIEW BLOG
  ============================== */

  const handleViewBlog =
    async (
      id: string
    ) => {
      try {
        const res =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`
          );

        setSelectedBlog(
          res.data.data
        );

        setOpenView(true);
      } catch (error: any) {
        setError(
          error?.response?.data
            ?.message ||
            'Failed to fetch blog'
        );
      }
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
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Blog List
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
          >
            {/* SEARCH */}
            <TextField
              size="small"
              placeholder="Search blog..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            {/* FILTER */}
            <TextField
              select
              size="small"
              label="Status"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              sx={{
                minWidth: 150,
              }}
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="draft">
                Draft
              </MenuItem>

              <MenuItem value="published">
                Published
              </MenuItem>
            </TextField>

            {/* ADD */}
            <Button
              component={Link}
              href="/dashboard/blog/add"
              variant="contained"
              startIcon={
                <PlusIcon size={18} />
              }
            >
              Add Blog
            </Button>
          </Stack>
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
              minWidth: 1200,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  Image
                </TableCell>

                <TableCell>
                  Blog No
                </TableCell>

                <TableCell>
                  Title
                </TableCell>

                <TableCell>
                  Author
                </TableCell>

                <TableCell>
                  Views
                </TableCell>

                <TableCell>
                  Featured
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
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    align="center"
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : rows.length ===
                0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    align="center"
                  >
                    No Blogs Found
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow
                    hover
                    key={row._id}
                  >
                    {/* IMAGE */}
                    <TableCell>
                      <Avatar
                        src={
                          row
                            .coverImage
                            ?.url
                        }
                        variant="rounded"
                        sx={{
                          width: 70,
                          height: 70,
                        }}
                      />
                    </TableCell>

                    {/* BLOG NO */}
                    <TableCell>
                      <Chip
                        label={
                          row.blogNo
                        }
                        color="primary"
                      />
                    </TableCell>

                    {/* TITLE */}
                    <TableCell>
                      <Typography fontWeight={700}>
                        {row.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {
                          row.slug
                        }
                      </Typography>
                    </TableCell>

                    {/* AUTHOR */}
                    <TableCell>
                      {
                        row.author
                      }
                    </TableCell>

                    {/* VIEWS */}
                    <TableCell>
                      <Chip
                        label={`${row.views} Views`}
                        color="info"
                      />
                    </TableCell>

                    {/* FEATURED */}
                    <TableCell>
                      <Chip
                        label={
                          row.featured
                            ? 'Yes'
                            : 'No'
                        }
                        color={
                          row.featured
                            ? 'success'
                            : 'default'
                        }
                      />
                    </TableCell>

                    {/* STATUS */}
                    <TableCell>
                      <TextField
                        select
                        size="small"
                        value={
                          row.status
                        }
                        onChange={(
                          e
                        ) =>
                          handleStatusChange(
                            row._id,
                            e
                              .target
                              .value as
                              | 'draft'
                              | 'published'
                          )
                        }
                        sx={{
                          minWidth: 140,
                        }}
                      >
                        <MenuItem value="draft">
                          Draft
                        </MenuItem>

                        <MenuItem value="published">
                          Published
                        </MenuItem>
                      </TextField>
                    </TableCell>

                    {/* CREATED */}
                    <TableCell>
                      {new Date(
                        row.createdAt
                      ).toLocaleDateString()}
                    </TableCell>

                    {/* ACTIONS */}
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
                            handleViewBlog(
                              row._id
                            )
                          }
                        >
                          <Eye size={20} />
                        </IconButton>

                        {/* EDIT */}
                        <IconButton
                          component={Link}
                          href={`/dashboard/blog/edit/${row._id}`}
                          color="primary"
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

    setDeleteOpen(true);
  }}
>
                          <Trash size={20} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
                e.target.value
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

      {/* VIEW BLOG DIALOG */}
 <Dialog
  open={openView}
  onClose={() =>
    setOpenView(false)
  }
  fullWidth
  maxWidth="md"
  scroll="paper"
  PaperProps={{
    sx: {
      borderRadius: '20px',
      maxHeight: '90vh',
    },
  }}
>
  {/* HEADER */}
<DialogTitle
  sx={{
    pb: 1,
    borderBottom:
      '1px solid #eee',
    position: 'sticky',
    top: 0,
    bgcolor: '#fff',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent:
      'space-between',
  }}
>
  <Typography
    variant="h5"
    fontWeight={700}
  >
    Blog Details
  </Typography>

  {/* CLOSE BUTTON */}
  <IconButton
    onClick={() =>
      setOpenView(false)
    }
    sx={{
      bgcolor: '#f5f5f5',
      '&:hover': {
        bgcolor: '#e0e0e0',
      },
    }}
  >
    <X size={20} />
  </IconButton>
</DialogTitle>

  <DialogContent
    dividers
    sx={{
      p: 3,
    }}
  >
    {selectedBlog && (
      <Stack spacing={4}>
        {/* COVER IMAGE */}
        {selectedBlog
          ?.coverImage?.url && (
          <Box>
            <img
              src={
                selectedBlog
                  ?.coverImage
                  ?.url
              }
              alt="blog"
              style={{
                width: '100%',
                height: '350px',
                objectFit:
                  'cover',
                borderRadius:
                  '16px',
              }}
            />
          </Box>
        )}

        {/* TITLE */}
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            mb={1}
          >
            {
              selectedBlog.title
            }
          </Typography>

          <Chip
            label={
              selectedBlog.status
            }
            color={
              selectedBlog.status ===
              'published'
                ? 'success'
                : 'warning'
            }
          />

          <Typography
            mt={1}
            color="text.secondary"
          >
            Slug:{' '}
            {
              selectedBlog.slug
            }
          </Typography>
        </Box>

        {/* AUTHOR DETAILS */}
        <Box>
          <Typography
            fontWeight={700}
            mb={2}
          >
            Author Details
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
          >
            <Chip
              label={`Author: ${selectedBlog.author}`}
            />

            <Chip
              color="info"
              label={`Views: ${selectedBlog.views}`}
            />

            <Chip
              color={
                selectedBlog.featured
                  ? 'success'
                  : 'default'
              }
              label={
                selectedBlog.featured
                  ? 'Featured'
                  : 'Normal'
              }
            />

            <Chip
              label={`Created: ${new Date(
                selectedBlog.createdAt
              ).toLocaleDateString()}`}
            />
          </Stack>
        </Box>

        {/* SHORT DESC */}
        <Box>
          <Typography
            fontWeight={700}
            mb={1}
          >
            Short Description
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.8,
            }}
          >
            {
              selectedBlog.shortDesc
            }
          </Typography>
        </Box>

        {/* FULL DESC */}
        <Box>
          <Typography
            fontWeight={700}
            mb={1}
          >
            Description
          </Typography>

          <Typography
            sx={{
              whiteSpace:
                'pre-line',
              lineHeight: 1.9,
            }}
          >
            {
              selectedBlog.desc
            }
          </Typography>
        </Box>

        {/* TAGS */}
        {(selectedBlog?.tags
          ?.length ?? 0) >
          0 && (
          <Box>
            <Typography
              fontWeight={700}
              mb={2}
            >
              Tags
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
            >
              {selectedBlog?.tags?.map(
                (
                  item,
                  index
                ) => (
                  <Chip
                    key={
                      index
                    }
                    label={
                      item.value
                    }
                  />
                )
              )}
            </Stack>
          </Box>
        )}

        {/* SEO */}
        <Box>
          <Typography
            fontWeight={700}
            mb={2}
          >
            SEO Details
          </Typography>

          <Stack spacing={2}>
            <Box>
              <Typography fontWeight={600}>
                SEO Title
              </Typography>

              <Typography color="text.secondary">
                {
                  selectedBlog?.seoTitle
                }
              </Typography>
            </Box>

            <Box>
              <Typography fontWeight={600}>
                SEO Description
              </Typography>

              <Typography color="text.secondary">
                {
                  selectedBlog?.seoDesc
                }
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* SEO KEYWORDS */}
        {(selectedBlog
          ?.seoKeywords
          ?.length ?? 0) >
          0 && (
          <Box>
            <Typography
              fontWeight={700}
              mb={2}
            >
              SEO Keywords
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
            >
              {selectedBlog?.seoKeywords?.map(
                (
                  item,
                  index
                ) => (
                  <Chip
                    key={
                      index
                    }
                    color="success"
                    label={
                      item.value
                    }
                  />
                )
              )}
            </Stack>
          </Box>
        )}

        {/* GALLERY */}
        {(selectedBlog?.images
          ?.length ?? 0) >
          0 && (
          <Box>
            <Typography
              fontWeight={700}
              mb={2}
            >
              Gallery Images
            </Typography>

            <Box
              sx={{
                display:
                  'grid',
                gridTemplateColumns:
                  'repeat(auto-fill,minmax(180px,1fr))',
                gap: 2,
              }}
            >
              {selectedBlog?.images?.map(
                (
                  item,
                  index
                ) => (
                  <img
                    key={
                      index
                    }
                    src={
                      item.url
                    }
                    alt=""
                    style={{
                      width:
                        '100%',
                      height:
                        '180px',
                      objectFit:
                        'cover',
                      borderRadius:
                        '12px',
                    }}
                  />
                )
              )}
            </Box>
          </Box>
        )}
      </Stack>
    )}
  </DialogContent>
</Dialog>

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
        >
          {success}
        </Alert>
      </Snackbar>

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
        >
          {error}
        </Alert>
      </Snackbar>
      {/* DELETE DIALOG */}

<Dialog
  open={deleteOpen}
  onClose={() =>
    setDeleteOpen(false)
  }
>
  <DialogTitle>
    Delete Blog
  </DialogTitle>

  <DialogContent>
    <Typography>
      Are you sure you want
      to delete this blog?
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
      onClick={async () => {
        await handleDelete(
          deleteId
        );

        setDeleteOpen(false);
      }}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
}