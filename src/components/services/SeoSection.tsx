"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { ServiceFormValues } from "../../types/service";

const META_TITLE_MAX = 60;
const META_DESC_MAX = 160;

export default function SeoSection() {
  const { control, watch, setValue, formState: { errors } } =
    useFormContext<ServiceFormValues>();

  const metaTitle = watch("seo.metaTitle") || "";
  const metaDesc = watch("seo.metaDescription") || "";
  const keywords = watch("seo.keywords") || [];

  const [keywordInput, setKeywordInput] = React.useState("");

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && keywordInput.trim()) {
      e.preventDefault();
      const newKw = keywordInput.trim().replace(/,$/, "");
      if (newKw && !keywords.includes(newKw)) {
        setValue("seo.keywords", [...keywords, newKw], { shouldDirty: true });
      }
      setKeywordInput("");
    } else if (e.key === "Backspace" && !keywordInput && keywords.length > 0) {
      setValue("seo.keywords", keywords.slice(0, -1), { shouldDirty: true });
    }
  };

  const removeKeyword = (kw: string) => {
    setValue(
      "seo.keywords",
      keywords.filter((k) => k !== kw),
      { shouldDirty: true }
    );
  };

  const titleColor =
    metaTitle.length > META_TITLE_MAX ? "error.main" : "text.secondary";
  const descColor =
    metaDesc.length > META_DESC_MAX ? "error.main" : "text.secondary";

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          SEO Settings
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
        <Grid  size={{   xs: 12 }} >
            <Controller
              name="seo.metaTitle"
              control={control}
              rules={{ maxLength: { value: META_TITLE_MAX, message: `Max ${META_TITLE_MAX} characters` } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Meta Title"
                  placeholder="Page title for search engines"
                  error={!!errors.seo?.metaTitle}
                  helperText={
                    <Box component="span" display="flex" justifyContent="space-between">
                      <span>{errors.seo?.metaTitle?.message || "Shown in search results tab"}</span>
                      <Box component="span" color={titleColor}>
                        {metaTitle.length}/{META_TITLE_MAX}
                      </Box>
                    </Box>
                  }
                />
              )}
            />
          </Grid>

      <Grid  size={{   xs: 12 }} >
            <Controller
              name="seo.metaDescription"
              control={control}
              rules={{ maxLength: { value: META_DESC_MAX, message: `Max ${META_DESC_MAX} characters` } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={3}
                  label="Meta Description"
                  placeholder="Brief page description for search engines"
                  error={!!errors.seo?.metaDescription}
                  helperText={
                    <Box component="span" display="flex" justifyContent="space-between">
                      <span>{errors.seo?.metaDescription?.message || "Displayed in search result snippets"}</span>
                      <Box component="span" color={descColor}>
                        {metaDesc.length}/{META_DESC_MAX}
                      </Box>
                    </Box>
                  }
                />
              )}
            />
          </Grid>

          {/* Keyword chips input */}
         <Grid  size={{   xs: 12 }} >
            <Typography variant="subtitle2" mb={1} color="text.secondary">
              Keywords
            </Typography>
            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 1,
                minHeight: 56,
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                alignItems: "center",
                "&:focus-within": {
                  borderColor: "primary.main",
                  boxShadow: "0 0 0 2px rgba(var(--mui-palette-primary-mainChannel) / 0.2)",
                },
              }}
            >
              {keywords.map((kw) => (
                <Chip
                  key={kw}
                  label={kw}
                  size="small"
                  onDelete={() => removeKeyword(kw)}
                />
              ))}
              <Box
                component="input"
                value={keywordInput}
                onChange={(e: any) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
                placeholder={keywords.length === 0 ? "Type keyword and press Enter or comma..." : "Add more..."}
                sx={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "text.primary",
                  fontSize: "0.875rem",
                  flex: 1,
                  minWidth: 120,
                  p: 0.5,
                }}
              />
            </Box>
            <Typography variant="caption" color="text.disabled" mt={0.5} display="block">
              Press Enter or comma to add a keyword. Backspace to remove the last one.
            </Typography>
          </Grid>
        </Grid>

        {/* SERP Preview */}
        {(metaTitle || metaDesc) && (
          <Box mt={3}>
            <Typography variant="subtitle2" mb={1} color="text.secondary">
              Search Preview
            </Typography>
            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="body1"
                color="primary.main"
                sx={{ fontFamily: "Arial, sans-serif", fontSize: 18, mb: 0.5 }}
              >
                {metaTitle || "Page Title"}
              </Typography>
              <Typography
                variant="body2"
                color="success.dark"
                sx={{ fontFamily: "Arial, sans-serif", fontSize: 13, mb: 0.5 }}
              >
                https://yoursite.com/services/...
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "Arial, sans-serif", fontSize: 13 }}
              >
                {metaDesc || "Page description will appear here..."}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}