// app/dashboard/blog/edit/[id]/page.tsx

'use client';

import * as React from 'react';

import axios from 'axios';

import {
  useParams,
  useRouter,
} from 'next/navigation';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Trash } from '@phosphor-icons/react';


export default function EditBlogPage() {
  const { id } =
    useParams();

  const router =
    useRouter();

  const [loading, setLoading] =
    React.useState(false);

  const [success, setSuccess] =
    React.useState('');

  const [error, setError] =
    React.useState('');

  const [coverImage, setCoverImage] =
    React.useState<File | null>(
      null
    );

  const [coverPreview, setCoverPreview] =
    React.useState('');

  const [images, setImages] =
    React.useState<File[]>([]);

  const [previewImages, setPreviewImages] =
    React.useState<string[]>(
      []
    );

  const [data, setData] =
    React.useState<any>({
      title: '',
      slug: '',
      shortDesc: '',
      desc: '',
      author: 'Admin',

      tags: [
        {
          name: '',
        },
      ],

      seoTitle: '',

      seoDesc: '',

      seoKeywords: [
        {
          name: '',
        },
      ],

      readTime:
        '5 min read',

      status: 'draft',

      featured: false,

      images: [],
    });

  /* =========================
     FETCH BLOG
  ========================= */

  const fetchBlog =
    async () => {
      try {
        const res =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`
          );

        const blog =
          res.data.data;

        setData({
          ...blog,

          tags:
            blog.tags?.length
              ? blog.tags
              : [
                  {
                    name:
                      '',
                  },
                ],

          seoKeywords:
            blog.seoKeywords
              ?.length
              ? blog.seoKeywords
              : [
                  {
                    name:
                      '',
                  },
                ],
        });

        setCoverPreview(
          blog.coverImage
            ?.url || ''
        );
      } catch (error) {
        console.log(error);
      }
    };

  React.useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  /* =========================
     AUTO SLUG
  ========================= */

  React.useEffect(() => {
    if (!data.title) return;

    const slug =
      data.title
        ?.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(
          /[^a-z0-9-]/g,
          ''
        );

    setData(
      (prev: any) => ({
        ...prev,
        slug,
      })
    );
  }, [data.title]);

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (
    e: any
  ) => {
    const {
      name,
      value,
    } = e.target;

    setData(
      (prev: any) => ({
        ...prev,
        [name]: value,
      })
    );
  };

  /* =========================
     COVER IMAGE
  ========================= */

  const handleCoverChange = (
    file: File | null
  ) => {
    setCoverImage(file);

    if (file) {
      setCoverPreview(
        URL.createObjectURL(
          file
        )
      );
    }
  };

  /* =========================
     NEW IMAGES
  ========================= */

  const handleImages = (
    files: FileList | null
  ) => {
    if (!files) return;

    const fileArray =
      Array.from(files);

    setImages(fileArray);

    const previews =
      fileArray.map((file) =>
        URL.createObjectURL(file)
      );

    setPreviewImages(previews);
  };

  /* =========================
     REMOVE NEW IMAGE
  ========================= */

  const removeNewImage = (
    index: number
  ) => {
    const updatedImages =
      [...images];

    updatedImages.splice(
      index,
      1
    );

    setImages(updatedImages);

    const updatedPreview =
      [...previewImages];

    updatedPreview.splice(
      index,
      1
    );

    setPreviewImages(
      updatedPreview
    );
  };

  /* =========================
     REMOVE OLD IMAGE
  ========================= */

  const removeOldImage = (
    index: number
  ) => {
    const updated =
      [...data.images];

    updated.splice(
      index,
      1
    );

    setData({
      ...data,
      images: updated,
    });
  };

  /* =========================
     UPDATE BLOG
  ========================= */

  const handleUpdate =
    async () => {
      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          'title',
          data.title
        );

        formData.append(
          'slug',
          data.slug
        );

        formData.append(
          'shortDesc',
          data.shortDesc
        );

        formData.append(
          'desc',
          data.desc
        );

        formData.append(
          'author',
          data.author
        );

        formData.append(
          'seoTitle',
          data.seoTitle
        );

        formData.append(
          'seoDesc',
          data.seoDesc
        );

        formData.append(
          'readTime',
          data.readTime
        );

        formData.append(
          'status',
          data.status
        );

        formData.append(
          'featured',
          String(
            data.featured
          )
        );

        /* TAGS */

        formData.append(
          'tags',
          JSON.stringify(
            data.tags
          )
        );

        /* SEO KEYWORDS */

        formData.append(
          'seoKeywords',
          JSON.stringify(
            data.seoKeywords
          )
        );

        /* OLD IMAGES */

        formData.append(
          'oldImages',
          JSON.stringify(
            data.images
          )
        );

        /* COVER IMAGE */

        if (coverImage) {
          formData.append(
            'coverImage',
            coverImage
          );
        }

        /* NEW IMAGES */

        images.forEach((img) => {
          formData.append(
            'images',
            img
          );
        });

        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog/update/${id}`,
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data',
            },
          }
        );

        setSuccess(
          'Blog updated successfully'
        );

        setTimeout(() => {
          router.push(
            '/dashboard/blog'
          );
        }, 1000);
      } catch (error: any) {
        setError(
          error?.response?.data
            ?.message ||
            'Update failed'
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <Card
        sx={{
          maxWidth: 1000,
          mx: 'auto',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            mb={3}
            fontWeight={700}
          >
            Edit Blog
          </Typography>

          <Stack spacing={3}>
            {/* TITLE */}
            <TextField
              label="Title"
              name="title"
              value={
                data.title
              }
              onChange={
                handleChange
              }
              fullWidth
            />

            {/* SLUG */}
            <TextField
              label="Slug"
              name="slug"
              value={
                data.slug
              }
              onChange={
                handleChange
              }
              fullWidth
            />

            {/* AUTHOR */}
            <TextField
              label="Author"
              name="author"
              value={
                data.author
              }
              onChange={
                handleChange
              }
              fullWidth
            />

            {/* SHORT DESC */}
            <TextField
              label="Short Description"
              name="shortDesc"
              value={
                data.shortDesc
              }
              onChange={
                handleChange
              }
              multiline
              rows={3}
              fullWidth
            />

            {/* DESC */}
            <TextField
              label="Description"
              name="desc"
              value={
                data.desc
              }
              onChange={
                handleChange
              }
              multiline
              rows={8}
              fullWidth
            />

            {/* TAGS */}
            <Box>
              <Typography mb={1}>
                Tags
              </Typography>

              <Stack spacing={2}>
                {data.tags?.map(
                  (
                    tag: any,
                    index: number
                  ) => (
                    <Stack
                      direction="row"
                      spacing={2}
                      key={
                        index
                      }
                    >
                      <TextField
                        fullWidth
                        label={`Tag ${index + 1}`}
                        value={
                          tag.name
                        }
                        onChange={(
                          e
                        ) => {
                          const updated =
                            [
                              ...data.tags,
                            ];

                          updated[
                            index
                          ].name =
                            e.target.value;

                          setData({
                            ...data,
                            tags:
                              updated,
                          });
                        }}
                      />

                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          const updated =
                            data.tags.filter(
                              (
                                _: any,
                                i: number
                              ) =>
                                i !==
                                index
                            );

                          setData({
                            ...data,
                            tags:
                              updated,
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  )
                )}

                <Button
                  variant="contained"
                  onClick={() =>
                    setData({
                      ...data,
                      tags: [
                        ...data.tags,
                        {
                          name:
                            '',
                        },
                      ],
                    })
                  }
                >
                  Add Tag
                </Button>
              </Stack>
            </Box>

            {/* SEO TITLE */}
            <TextField
              label="SEO Title"
              name="seoTitle"
              value={
                data.seoTitle
              }
              onChange={
                handleChange
              }
              fullWidth
            />

            {/* SEO DESC */}
            <TextField
              label="SEO Description"
              name="seoDesc"
              value={
                data.seoDesc
              }
              onChange={
                handleChange
              }
              multiline
              rows={3}
              fullWidth
            />

            {/* SEO KEYWORDS */}
            <Box>
              <Typography mb={1}>
                SEO Keywords
              </Typography>

              <Stack spacing={2}>
                {data.seoKeywords?.map(
                  (
                    item: any,
                    index: number
                  ) => (
                    <Stack
                      direction="row"
                      spacing={2}
                      key={
                        index
                      }
                    >
                      <TextField
                        fullWidth
                        label={`Keyword ${index + 1}`}
                        value={
                          item.name
                        }
                        onChange={(
                          e
                        ) => {
                          const updated =
                            [
                              ...data.seoKeywords,
                            ];

                          updated[
                            index
                          ].name =
                            e.target.value;

                          setData({
                            ...data,
                            seoKeywords:
                              updated,
                          });
                        }}
                      />

                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          const updated =
                            data.seoKeywords.filter(
                              (
                                _: any,
                                i: number
                              ) =>
                                i !==
                                index
                            );

                          setData({
                            ...data,
                            seoKeywords:
                              updated,
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  )
                )}

                <Button
                  variant="contained"
                  onClick={() =>
                    setData({
                      ...data,
                      seoKeywords:
                        [
                          ...data.seoKeywords,
                          {
                            name:
                              '',
                          },
                        ],
                    })
                  }
                >
                  Add Keyword
                </Button>
              </Stack>
            </Box>

            {/* READ TIME */}
            <TextField
              label="Read Time"
              name="readTime"
              value={
                data.readTime
              }
              onChange={
                handleChange
              }
              fullWidth
            />

            {/* STATUS */}
            <TextField
              select
              label="Status"
              name="status"
              value={
                data.status
              }
              onChange={
                handleChange
              }
              fullWidth
            >
              <MenuItem value="draft">
                Draft
              </MenuItem>

              <MenuItem value="published">
                Published
              </MenuItem>
            </TextField>

            {/* FEATURED */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    data.featured
                  }
                  onChange={(e) =>
                    setData(
                      (
                        prev: any
                      ) => ({
                        ...prev,
                        featured:
                          e.target
                            .checked,
                      })
                    )
                  }
                />
              }
              label="Featured Blog"
            />

            {/* COVER IMAGE */}
            <Box>
              <Typography mb={1}>
                Cover Image
              </Typography>

              {coverPreview && (
                <Avatar
                  src={
                    coverPreview
                  }
                  variant="rounded"
                  sx={{
                    width: 250,
                    height: 150,
                    mb: 2,
                  }}
                />
              )}

              <Button
                component="label"
                variant="outlined"
              >
                Upload Cover Image

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleCoverChange(
                      e.target
                        .files?.[0] ||
                        null
                    )
                  }
                />
              </Button>
            </Box>

            {/* OLD IMAGES */}
            <Box>
              <Typography mb={2}>
                Existing Images
              </Typography>

              <Grid
                container
                spacing={2}
              >
                {data.images?.map(
                  (
                    img: any,
                    index: number
                  ) => (
                    <Grid
                      key={index}
                      size={{
                        xs: 6,
                        md: 3,
                      }}
                    >
                      <Box
                        sx={{
                          position:
                            'relative',
                        }}
                      >
                        <Avatar
                          src={
                            img.url
                          }
                          variant="rounded"
                          sx={{
                            width:
                              '100%',
                            height: 150,
                          }}
                        />

                        <IconButton
                          color="error"
                          onClick={() =>
                            removeOldImage(
                              index
                            )
                          }
                          sx={{
                            position:
                              'absolute',
                            top: 5,
                            right: 5,
                            bgcolor:
                              '#fff',
                          }}
                        >
                          <Trash />
                        </IconButton>
                      </Box>
                    </Grid>
                  )
                )}
              </Grid>
            </Box>

            {/* NEW IMAGES */}
            <Box>
              <Typography mb={2}>
                Add New Images
              </Typography>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  handleImages(
                    e.target.files
                  )
                }
              />

              <Grid
                container
                spacing={2}
                mt={1}
              >
                {previewImages.map(
                  (
                    img,
                    index
                  ) => (
                    <Grid
                      key={index}
                      size={{
                        xs: 6,
                        md: 3,
                      }}
                    >
                      <Box
                        sx={{
                          position:
                            'relative',
                        }}
                      >
                        <Avatar
                          src={img}
                          variant="rounded"
                          sx={{
                            width:
                              '100%',
                            height: 150,
                          }}
                        />

                        <IconButton
                          color="error"
                          onClick={() =>
                            removeNewImage(
                              index
                            )
                          }
                          sx={{
                            position:
                              'absolute',
                            top: 5,
                            right: 5,
                            bgcolor:
                              '#fff',
                          }}
                        >
                          <Trash />
                        </IconButton>
                      </Box>
                    </Grid>
                  )
                )}
              </Grid>
            </Box>

            {/* BUTTON */}
            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={
                handleUpdate
              }
            >
              {loading
                ? 'Updating...'
                : 'Update Blog'}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* SUCCESS */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() =>
          setSuccess('')
        }
      >
        <Alert severity="success">
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
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}