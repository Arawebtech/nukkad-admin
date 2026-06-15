"use client";

// app/dashboard/services/view/[id]/page.tsx

import * as React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,

  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr/PencilSimple";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { getServiceById } from "@/api/services.Api";
import type { ServiceDocument } from "@/types/service";

// ─── Skeleton ───────────────────────────────────────────────────────────────

function ViewSkeleton() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Skeleton variant="text" width={180} height={40} />
        <Skeleton variant="rounded" width={120} height={40} />
      </Stack>
      <Grid container spacing={3}>
  <Grid  size={{ lg: 8,  xs: 12 }} >
          <Stack spacing={3}>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} variant="outlined">
                <CardContent>
                  <Skeleton variant="text" width="35%" height={28} sx={{ mb: 2 }} />
                  <Skeleton variant="rounded" height={120} />
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
  <Grid  size={{ lg: 4,  xs: 12 }} >
          <Skeleton variant="rounded" height={200} />
        </Grid>
      </Grid>
    </Box>
  );
}

// ─── Field display helpers ───────────────────────────────────────────────────

function LabeledField({ label, value }: { label: string; value?: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.8}>
        {label}
      </Typography>
      <Typography variant="body1" mt={0.25}>
        {value || <Box component="span" color="text.disabled">—</Box>}
      </Typography>
    </Box>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          {title}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {children}
      </CardContent>
    </Card>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ViewServicePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [service, setService] = React.useState<ServiceDocument | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await getServiceById(id);
        setService(res.data);
      } catch (err: any) {
        setError(err?.message || "Failed to load service");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <ViewSkeleton />;
  if (error || !service) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error || "Service not found"}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            variant="text"
            startIcon={<ArrowLeft size={16} />}
            onClick={() => router.push("/dashboard/services")}
            sx={{ px: 1 }}
          >
            Back
          </Button>
          <Divider orientation="vertical" flexItem />
          <Typography variant="h5" fontWeight={700}>
            {service.name}
          </Typography>
          <Chip
            label={service.active ? "Active" : "Inactive"}
            color={service.active ? "success" : "error"}
            size="small"
          />
        </Stack>

        <Button
          variant="contained"
          startIcon={<PencilSimple size={16} />}
          onClick={() => router.push(`/dashboard/services/edit/${service._id}`)}
        >
          Edit Service
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {/* LEFT: Main content */}
         <Grid  size={{ lg: 8,  xs: 12 }} >
          <Stack spacing={3}>
            {/* Basic Info */}
            <SectionCard title="Basic Information">
              <Grid container spacing={3}>
                 <Grid  size={{ sm: 6,  xs: 12 }} >
                  <LabeledField label="Name" value={service.name} />
                </Grid>
            <Grid size={{ sm: 6,  xs: 12 }} >
                  <LabeledField label="Slug" value={`/services/${service.slug}`} />
                </Grid>
                 <Grid  size={{ sm: 6,  xs: 12 }} >
                  <LabeledField
                    label="Created"
                    value={new Date(service.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  />
                </Grid>
                  <Grid  size={{ sm: 6,  xs: 12 }} >
                  <LabeledField
                    label="Last Updated"
                    value={new Date(service.updatedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  />
                </Grid>
              </Grid>
            </SectionCard>

            {/* Hero Banner */}
            <SectionCard title="Hero Banner">
              {service.heroBanner?.image && (
                <Box mb={3}>
                  <Box
                    component="img"
                    src={service.heroBanner.image}
                    alt="Hero banner"
                    sx={{
                      width: "100%",
                      maxHeight: 260,
                      objectFit: "cover",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                </Box>
              )}
              <Grid container spacing={3}>
                <Grid  size={{   xs: 12 }} >
                  <LabeledField label="Heading" value={service.heroBanner?.heading} />
                </Grid>
                  <Grid  size={{ sm: 6,  xs: 12 }} >
                  <LabeledField label="Description" value={service.heroBanner?.description} />
                </Grid>
                  <Grid  size={{ sm: 6,  xs: 12 }} >
                  <LabeledField label="Text" value={service.heroBanner?.text} />
                </Grid>
              </Grid>
            </SectionCard>

            {/* Heading & Description Sections */}
            {service.headingDesc && service.headingDesc.length > 0 && (
              <SectionCard title="Heading & Description Sections">
                <Stack spacing={3}>
                  {service.headingDesc.map((section, i) => (
                    <Paper key={i} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                        <Chip label={`Section ${i + 1}`} size="small" color="primary" variant="outlined" />
                      </Stack>
                      <Grid container spacing={2}>
                          <Grid  size={{ sm: 6,  xs: 12 }} >
                          <LabeledField label="Title" value={section.title} />
                        </Grid>
                        {section.showTitle2 && (
                            <Grid  size={{ sm: 6,  xs: 12 }} >
                            <LabeledField label="Secondary Title" value={section.title2Text} />
                          </Grid>
                        )}
                      </Grid>
                      {section.paragraphs && section.paragraphs.length > 0 && (
                        <Box mt={2}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.8}>
                            Paragraphs
                          </Typography>
                          <Stack spacing={1} mt={0.5}>
                            {section.paragraphs.map((p, pi) => (
                              <Typography key={pi} variant="body2" color="text.secondary">
                                {p.text}
                              </Typography>
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Paper>
                  ))}
                </Stack>
              </SectionCard>
            )}

            {/* Process Section */}
            {(service.processSection?.title || service.processSection?.steps?.length > 0) && (
              <SectionCard title="Process Section">
                <Grid container spacing={2} mb={3}>
                    <Grid  size={{ sm: 6,  xs: 12 }} >
                    <LabeledField label="Title" value={service.processSection.title} />
                  </Grid>
                  {service.processSection.showTitle2 && (
                      <Grid  size={{ sm: 6,  xs: 12 }} >
                      <LabeledField label="Secondary Title" value={service.processSection.title2Text} />
                    </Grid>
                  )}
              <Grid  size={{  xs: 12 }} >
                    <LabeledField label="Description" value={service.processSection.description} />
                  </Grid>
                </Grid>

                {service.processSection.steps?.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} mb={2}>
                      Steps
                    </Typography>
                    <Stack spacing={2}>
                      {service.processSection.steps.map((step, i) => (
                        <Paper key={i} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                          <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Box
                              sx={{
                                minWidth: 40,
                                height: 40,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                fontSize: 14,
                                flexShrink: 0,
                              }}
                            >
                              {step.num || i + 1}
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {step.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" mt={0.5}>
                                {step.desc}
                              </Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                )}
              </SectionCard>
            )}

            {/* FAQ Section */}
            {(service.faqSection?.title || service.faqSection?.faqs?.length > 0) && (
              <SectionCard title="FAQ Section">
                <Grid container spacing={2} mb={3}>
                    <Grid  size={{ sm: 6,  xs: 12 }} >
                    <LabeledField label="Title" value={service.faqSection.title} />
                  </Grid>
                  {service.faqSection.showTitle2 && (
                      <Grid  size={{ sm: 6,  xs: 12 }} >
                      <LabeledField label="Secondary Title" value={service.faqSection.title2Text} />
                    </Grid>
                  )}
                </Grid>

                {service.faqSection.faqs?.length > 0 && (
                  <Stack spacing={2}>
                    {service.faqSection.faqs.map((faq, i) => (
                      <Paper key={i} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle2" fontWeight={600} mb={1}>
                          Q{i + 1}: {faq.question}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {faq.answer}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </SectionCard>
            )}
          </Stack>
        </Grid>

        {/* RIGHT: Sidebar */}
 <Grid  size={{ lg: 4,  xs: 12 }} >
          <Box sx={{ position: { lg: "sticky" }, top: { lg: 80 } }}>
            <Stack spacing={3}>
              {/* Status */}
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Status
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Chip
                    label={service.active ? "Active" : "Inactive"}
                    color={service.active ? "success" : "error"}
                  />
                </CardContent>
              </Card>

              {/* Thumbnail */}
              {service.heroBanner?.image && (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                      Banner Image
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Avatar
                      src={service.heroBanner.image}
                      variant="rounded"
                      sx={{ width: "100%", height: 140 }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* SEO */}
              {(service.seo?.metaTitle || service.seo?.metaDescription) && (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                      SEO
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack spacing={2}>
                      <LabeledField label="Meta Title" value={service.seo.metaTitle} />
                      <LabeledField label="Meta Description" value={service.seo.metaDescription} />
                      {service.seo.keywords?.length > 0 && (
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.8} display="block" mb={1}>
                            Keywords
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {service.seo.keywords.map((kw) => (
                              <Chip key={kw} label={kw} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              )}

              {/* Stats */}
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Content Summary
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={1.5}>
                    {[
                      { label: "Heading Sections", value: service.headingDesc?.length || 0 },
                      { label: "Process Steps", value: service.processSection?.steps?.length || 0 },
                      { label: "FAQs", value: service.faqSection?.faqs?.length || 0 },
                      { label: "Keywords", value: service.seo?.keywords?.length || 0 },
                    ].map(({ label, value }) => (
                      <Stack key={label} direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          {label}
                        </Typography>
                        <Chip label={value} size="small" variant="outlined" />
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}