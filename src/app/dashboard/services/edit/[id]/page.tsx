"use client";

// app/dashboard/services/edit/[id]/page.tsx

import * as React from "react";
import { Box, Card, CardContent, Grid, Skeleton, Stack } from "@mui/material";
import { useParams } from "next/navigation";

import { getServiceById } from "@/api/services.Api";
import type { ServiceDocument } from "@/types/service";
import ServiceForm from "@/components/services/Serviceform";

function EditPageSkeleton() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rounded" width={140} height={40} />
      </Stack>
      <Grid container spacing={3}>
   <Grid  size={{ lg: 8,  xs: 12 }} >
          <Stack spacing={3}>
            {[1, 2, 3].map((i) => (
              <Card key={i} variant="outlined">
                <CardContent>
                  <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
                  <Skeleton variant="rounded" height={56} sx={{ mb: 2 }} />
                  <Skeleton variant="rounded" height={56} />
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid  size={{ lg: 4,  xs: 12 }} >
          <Card variant="outlined">
            <CardContent>
              <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="text" height={24} sx={{ mb: 1 }} />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function EditServicePage() {
  const params = useParams();
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

  if (loading) return <EditPageSkeleton />;

  if (error || !service) {
    return (
      <Box sx={{ p: 3 }}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2} alignItems="center" py={4}>
              <Skeleton variant="circular" width={48} height={48} />
              <Box color="error.main" fontWeight={600}>
                {error || "Service not found"}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <ServiceForm
        mode="edit"
        defaultValues={service}
        serviceId={id}
      />
    </Box>
  );
}