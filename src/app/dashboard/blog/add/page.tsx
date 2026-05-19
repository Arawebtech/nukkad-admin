// app/dashboard/blog/add/page.tsx

'use client';

import * as React from 'react';

import axios from 'axios';

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


export default function AddBlogPage() {
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

  const [form, setForm] =
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
    });

  /* =========================
     AUTO SLUG
  ========================= */

  React.useEffect(() => {
    if (!form.title) return;

    const slug =
      form.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(
          /[^a-z0-9-]/g,
          ''
        );

    setForm((prev: any) => ({
      ...prev,
      slug,
    }));
  }, [form.title]);

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     COVER IMAGE
  ========================= */

  const handleCoverImage = (
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
     MULTIPLE IMAGES
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
     REMOVE IMAGE
  ========================= */

  const removeImage = (
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
     SUBMIT
  ========================= */

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          'title',
          form.title
        );

        formData.append(
          'slug',
          form.slug
        );

        formData.append(
          'shortDesc',
          form.shortDesc
        );

        formData.append(
          'desc',
          form.desc
        );

        formData.append(
          'author',
          form.author
        );

        formData.append(
          'seoTitle',
          form.seoTitle
        );

        formData.append(
          'seoDesc',
          form.seoDesc
        );

        formData.append(
          'readTime',
          form.readTime
        );

        formData.append(
          'status',
          form.status
        );

        formData.append(
          'featured',
          String(
            form.featured
          )
        );

        /* TAGS */

        formData.append(
          'tags',
          JSON.stringify(
            form.tags
          )
        );

        /* SEO KEYWORDS */

        formData.append(
          'seoKeywords',
          JSON.stringify(
            form.seoKeywords
          )
        );

        /* COVER IMAGE */

        if (coverImage) {
          formData.append(
            'coverImage',
            coverImage
          );
        }

        /* MULTIPLE IMAGES */

        images.forEach((img) => {
          formData.append(
            'images',
            img
          );
        });

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blog/create`,
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data',
            },
          }
        );

        setSuccess(
          'Blog created successfully'
        );

        /* RESET */

        setForm({
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
        });

        setCoverImage(
          null
        );

        setCoverPreview('');

        setImages([]);

        setPreviewImages([]);
      } catch (error: any) {
        setError(
          error?.response?.data
            ?.message ||
            'Create failed'
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
            Add Blog
          </Typography>

          <Stack spacing={3}>
            {/* TITLE */}
            <TextField
              label="Title"
              name="title"
              value={
                form.title
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
                form.slug
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
                form.shortDesc
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
                form.desc
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
                {form.tags.map(
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
                              ...form.tags,
                            ];

                          updated[
                            index
                          ].name =
                            e.target.value;

                          setForm(
                            {
                              ...form,
                              tags:
                                updated,
                            }
                          );
                        }}
                      />

                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          const updated =
                            form.tags.filter(
                              (
                                _: any,
                                i: number
                              ) =>
                                i !==
                                index
                            );

                          setForm({
                            ...form,
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
                    setForm({
                      ...form,
                      tags: [
                        ...form.tags,
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
                form.seoTitle
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
                form.seoDesc
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
                {form.seoKeywords.map(
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
                              ...form.seoKeywords,
                            ];

                          updated[
                            index
                          ].name =
                            e.target.value;

                          setForm(
                            {
                              ...form,
                              seoKeywords:
                                updated,
                            }
                          );
                        }}
                      />

                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          const updated =
                            form.seoKeywords.filter(
                              (
                                _: any,
                                i: number
                              ) =>
                                i !==
                                index
                            );

                          setForm({
                            ...form,
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
                    setForm({
                      ...form,
                      seoKeywords:
                        [
                          ...form.seoKeywords,
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
                form.readTime
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
                form.status
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
                    form.featured
                  }
                  onChange={(e) =>
                    setForm(
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
                    handleCoverImage(
                      e.target
                        .files?.[0] ||
                        null
                    )
                  }
                />
              </Button>
            </Box>

            {/* MULTIPLE IMAGES */}
            <Box>
              <Typography mb={2}>
                Blog Images
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
                            removeImage(
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
                handleSubmit
              }
            >
              {loading
                ? 'Creating...'
                : 'Create Blog'}
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