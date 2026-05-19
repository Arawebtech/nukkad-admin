"use client";

import * as React from "react";

import EnquiryTable from "@/components/website/EnquirySection";
// import {
//   Box,
//   Typography,
//   Card,
//   Divider,
// } from "@mui/material";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function Page() {
  return (
    <Box sx={{ p: 2 }}>
      {/* HEADER */}
      <Card sx={{ mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" fontWeight={700}>
            Enquiry Management
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage all campaign enquiries, track status and follow-ups
          </Typography>
        </Box>

        <Divider />
      </Card>

      {/* TABLE */}
      <EnquiryTable />
    </Box>
  );
}