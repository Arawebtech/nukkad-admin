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

export default function FaqSection() {
  const { control, formState: { errors } } = useFormContext<ServiceFormValues>();

  const { fields: faqs, append, remove } = useFieldArray({
    control,
    name: "faqSection.faqs",
  });

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          FAQ Section
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2} mb={3}>
           <Grid  size={{ md: 6,  xs: 12 }} >
            <Controller
              name="faqSection.title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Section Title"
                  placeholder="e.g. Frequently Asked Questions"
                />
              )}
            />
          </Grid>

  <Grid  size={{ md: 6,  xs: 12 }} >
            <Controller
              name="faqSection.title2Text"
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

    <Grid  size={{  xs: 12 }} >
            <Controller
              name="faqSection.showTitle2"
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

        {/* FAQs */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            FAQs
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Plus size={16} />}
            onClick={() => append({ question: "", answer: "" })}
          >
            Add FAQ
          </Button>
        </Stack>

        {faqs.length === 0 ? (
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
              No FAQs added yet.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {faqs.map((faq, index) => (
              <Paper
                key={faq.id}
                variant="outlined"
                sx={{ p: 2, borderRadius: 2 }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle2" fontWeight={600} color="primary">
                    FAQ {index + 1}
                  </Typography>
                  <Tooltip title="Remove FAQ">
                    <IconButton size="small" color="error" onClick={() => remove(index)}>
                      <Trash size={16} />
                    </IconButton>
                  </Tooltip>
                </Stack>

                <Grid container spacing={2}>
                  <Grid  size={{  xs: 12 }} >
                    <Controller
                      name={`faqSection.faqs.${index}.question`}
                      control={control}
                      rules={{ required: "Question is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
                          label="Question"
                          placeholder="e.g. How long does the project take?"
                          error={!!errors.faqSection?.faqs?.[index]?.question}
                          helperText={errors.faqSection?.faqs?.[index]?.question?.message}
                        />
                      )}
                    />
                  </Grid>

              <Grid  size={{   xs: 12 }} >
                    <Controller
                      name={`faqSection.faqs.${index}.answer`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          rows={3}
                          size="small"
                          label="Answer"
                          placeholder="Provide a detailed answer..."
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