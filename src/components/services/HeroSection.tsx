"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";
import { UploadSimple } from "@phosphor-icons/react/dist/ssr/UploadSimple";
import type { ServiceFormValues } from "../../types/service";

interface HeroSectionProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
}

export default function HeroSection({ imagePreview, onImageChange }: HeroSectionProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ServiceFormValues>();

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageChange(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) onImageChange(file);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Hero Banner
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Image Upload */}
        <Box mb={3}>
        <Typography variant="subtitle2" mb={1} color="text.secondary">
  Banner Image (Recommended Size: 1800 × 700 px)
</Typography>

          {imagePreview ? (
            <Box position="relative" display="inline-block">
              <Box
                component="img"
                src={imagePreview}
                alt="Hero preview"
                sx={{
                  width: "100%",
                  maxWidth: 480,
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                  display: "block",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => onImageChange(null)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  "&:hover": { bgcolor: "error.lighter" },
                }}
              >
                <Trash size={16} />
              </IconButton>
            </Box>
          ) : (
            <Box
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                border: "2px dashed",
                borderColor: isDragOver ? "primary.main" : "divider",
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: isDragOver ? "primary.50" : "action.hover",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "primary.50",
                },
              }}
            >
              <UploadSimple size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                Drag & drop an image here, or <strong>click to browse</strong>
              </Typography>
              <Typography variant="caption" color="text.disabled">
                PNG, JPG, WEBP up to 5MB
              </Typography>
            </Box>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileInput}
          />
        </Box>

        <Grid container spacing={2}>
        <Grid  size={{  xs: 12 }} >
            <Controller
              name="heroBanner.heading"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Heading"
                  placeholder="e.g. Professional Web Development Services"
                  error={!!errors.heroBanner?.heading}
                  helperText={errors.heroBanner?.heading?.message}
                />
              )}
            />
          </Grid>

        <Grid  size={{   xs: 12 }} >
            <Controller
              name="heroBanner.description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={2}
                  label="Description"
                  placeholder="Short description shown in the hero area"
                  error={!!errors.heroBanner?.description}
                  helperText={errors.heroBanner?.description?.message}
                />
              )}
            />
          </Grid>
  <Grid  size={{   xs: 12 }} >
            <Controller
              name="heroBanner.text"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={2}
                  label="Text"
                  placeholder="Additional text shown in the hero area"
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}