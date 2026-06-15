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
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";
import type { ServiceFormValues } from "../../types/service";

export default function ProcessSection() {
  const { control, formState: { errors } } = useFormContext<ServiceFormValues>();

  const { fields: steps, append, remove } = useFieldArray({
    control,
    name: "processSection.steps",
  });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Process Section
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2} mb={3}>
            <Grid  size={{ md: 6,  xs: 12 }} >
            <Controller
              name="processSection.title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Section Title"
                  placeholder="e.g. Our Process"
                />
              )}
            />
          </Grid>

            <Grid  size={{ md: 6,  xs: 12 }} >
            <Controller
              name="processSection.title2Text"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Secondary Title Text"
                />
              )}
            />
          </Grid>

        <Grid  size={{   xs: 12 }} >
            <Controller
              name="processSection.description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={2}
                  label="Description"
                  placeholder="Brief description of the process section"
                />
              )}
            />
          </Grid>

         <Grid  size={{  xs: 12 }} >
            <Controller
              name="processSection.showTitle2"
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

        {/* Steps */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            Process Steps
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Plus size={16} />}
            onClick={() => append({ num: String(steps.length + 1), title: "", desc: "" })}
          >
            Add Step
          </Button>
        </Stack>

        {steps.length === 0 ? (
          <Box
            sx={{
              py: 3,
              textAlign: "center",
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography color="text.secondary" variant="body2">
              No steps added yet.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {steps.map((step, index) => (
              <Paper
                key={step.id}
                variant="outlined"
                sx={{ p: 2, borderRadius: 2 }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle2" fontWeight={600} color="primary">
                    Step {index + 1}
                  </Typography>
                  <Tooltip title="Remove step">
                    <IconButton size="small" color="error" onClick={() => remove(index)}>
                      <Trash size={16} />
                    </IconButton>
                  </Tooltip>
                </Stack>

                <Grid container spacing={2}>
                  <Grid  size={{ sm: 3,  xs: 12 }} >
                    <Controller
                      name={`processSection.steps.${index}.num`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
                          label="Step Number"
                          placeholder="e.g. 01"
                        />
                      )}
                    />
                  </Grid>

              <Grid  size={{ sm: 9,  xs: 12 }} >
                    <Controller
                      name={`processSection.steps.${index}.title`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
                          label="Step Title"
                          placeholder="e.g. Discovery & Planning"
                        />
                      )}
                    />
                  </Grid>

                <Grid  size={{  xs: 12 }} >
                    <Controller
                      name={`processSection.steps.${index}.desc`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          rows={2}
                          size="small"
                          label="Description"
                          placeholder="Brief description of this step"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}