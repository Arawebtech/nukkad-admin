// app/dashboard/services/add/page.tsx
import * as React from "react";
import { Box } from "@mui/material";
import ServiceForm from "@/components/services/Serviceform";

export const metadata = {
  title: "Add Service | Dashboard",
};

export default function AddServicePage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <ServiceForm mode="add" />
    </Box>
  );
}