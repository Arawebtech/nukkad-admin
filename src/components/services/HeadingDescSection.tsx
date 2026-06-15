"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Controller,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";
import { PlusCircle } from "@phosphor-icons/react/dist/ssr/PlusCircle";
import type { ServiceFormValues } from "../../types/service";

export default function HeadingDescSection() {
  const { control, register, watch, formState: { errors } } =
    useFormContext<ServiceFormValues>();

  const { fields: sections, append: appendSection, remove: removeSection } =
    useFieldArray({ control, name: "headingDesc" });

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Heading & Description Sections
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Plus size={16} />}
            onClick={() =>
              appendSection({
                title: "",
                title2Text: "",
                showTitle2: true,
                paragraphs: [{ text: "" }],
              })
            }
          >
            Add Section
          </Button>
        </Stack>
        <Divider sx={{ mb: 3 }} />

        {sections.length === 0 ? (
          <Box
            sx={{
              py: 4,
              textAlign: "center",
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography color="text.secondary" variant="body2">
              No sections added yet. Click "Add Section" to get started.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={3}>
            {sections.map((section, sIndex) => (
              <SectionItem
                key={section.id}
                sIndex={sIndex}
                control={control}
                onRemove={() => removeSection(sIndex)}
                errors={errors}
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

function SectionItem({
  sIndex,
  control,
  onRemove,
  errors,
}: {
  sIndex: number;
  control: any;
  onRemove: () => void;
  errors: any;
}) {
  const { fields: paragraphs, append: appendPara, remove: removePara } =
    useFieldArray({ control, name: `headingDesc.${sIndex}.paragraphs` });

  const showTitle2 = control._formValues?.headingDesc?.[sIndex]?.showTitle2 ?? true;

  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, borderRadius: 2, position: "relative" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" fontWeight={600} color="primary">
          Section {sIndex + 1}
        </Typography>
        <Tooltip title="Remove section">
          <IconButton size="small" color="error" onClick={onRemove}>
            <Trash size={16} />
          </IconButton>
        </Tooltip>
      </Stack>

      <Grid container spacing={2}>
        <Grid  size={{ md: 6,  xs: 12 }} >
               
          <Controller
            name={`headingDesc.${sIndex}.title`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Title"
                size="small"
                error={!!errors.headingDesc?.[sIndex]?.title}
                helperText={errors.headingDesc?.[sIndex]?.title?.message}
              />
            )}
          />
        </Grid>

         <Grid  size={{ md: 6,  xs: 12 }} >
          <Controller
            name={`headingDesc.${sIndex}.title2Text`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Secondary Title Text"
                size="small"
              />
            )}
          />
        </Grid>

  <Grid  size={{ xs: 12 }} >
          <Controller
            name={`headingDesc.${sIndex}.showTitle2`}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    size="small"
                  />
                }
                label="Show Secondary Title"
              />
            )}
          />
        </Grid>
      </Grid>

      {/* Paragraphs */}
      <Box mt={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Paragraphs
          </Typography>
          <Button
            size="small"
            startIcon={<PlusCircle size={14} />}
            onClick={() => appendPara({ text: "" })}
          >
            Add Paragraph
          </Button>
        </Stack>

        <Stack spacing={1}>
          {paragraphs.map((para, pIndex) => (
            <Stack key={para.id} direction="row" spacing={1} alignItems="flex-start">
              <Controller
                name={`headingDesc.${sIndex}.paragraphs.${pIndex}.text`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={2}
                    size="small"
                    placeholder={`Paragraph ${pIndex + 1}`}
                  />
                )}
              />
              <Tooltip title="Remove paragraph">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => removePara(pIndex)}
                  disabled={paragraphs.length === 1}
                >
                  <Trash size={14} />
                </IconButton>
              </Tooltip>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}