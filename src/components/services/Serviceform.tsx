// "use client";

// import * as React from "react";
// import {
//   Alert,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Checkbox,
//   Chip,
//   Divider,
//   FormControlLabel,
//   Grid,
//   InputAdornment,
//   Snackbar,
//   Stack,
//   Switch,
//   TextField,
//   Typography,
// } from "@mui/material";
// import {
//   Controller,
//   FormProvider,
//   useForm,
// } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { FloppyDisk } from "@phosphor-icons/react/dist/ssr/FloppyDisk";
// import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";



// import { createService, updateService } from "@/api/services.Api";
// import { ServiceDocument, ServiceFormValues } from "@/types/service";
// import HeroSection from "./HeroSection";
// import HeadingDescSection from "./HeadingDescSection";
// import ProcessSection from "./ProcessSection";
// import FaqSection from "./FaqSection";
// import SeoSection from "./SeoSection";

// interface ServiceFormProps {
//   mode: "add" | "edit";
//   defaultValues?: Partial<ServiceDocument>;
//   serviceId?: string;
// }

// function generateSlug(name: string): string {
//   return name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
// }

// const EMPTY_DEFAULTS: ServiceFormValues = {
//   name: "",
//   slug: "",
//   active: true,
//   heroBanner: { heading: "", description: "", text: "" },
//   headingDesc: [],
//   processSection: {
//     title: "",
//     title2Text: "",
//     showTitle2: true,
//     description: "",
//     steps: [],
//   },
//   faqSection: {
//     title: "",
//     title2Text: "",
//     showTitle2: true,
//     faqs: [],
//   },
//   seo: {
//     metaTitle: "",
//     metaDescription: "",
//     keywords: [],
//   },
// };

// export default function ServiceForm({
//   mode,
//   defaultValues,
//   serviceId,
// }: ServiceFormProps) {
//   const router = useRouter();

//   const methods = useForm<ServiceFormValues>({
//     defaultValues: defaultValues
//       ? {
//           name: defaultValues.name || "",
//           slug: defaultValues.slug || "",
//           active: defaultValues.active ?? true,
//           heroBanner: {
//             heading: defaultValues.heroBanner?.heading || "",
//             description: defaultValues.heroBanner?.description || "",
//             text: defaultValues.heroBanner?.text || "",
//           },
//           headingDesc: defaultValues.headingDesc || [],
//           processSection: defaultValues.processSection || EMPTY_DEFAULTS.processSection,
//           faqSection: defaultValues.faqSection || EMPTY_DEFAULTS.faqSection,
//           seo: defaultValues.seo || EMPTY_DEFAULTS.seo,
//         }
//       : EMPTY_DEFAULTS,
//   });

//   const {
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors, isDirty, isSubmitting },
//   } = methods;

//   const [imageFile, setImageFile] = React.useState<File | null>(null);
//   const [imagePreview, setImagePreview] = React.useState<string | null>(
//     defaultValues?.heroBanner?.image || null
//   );
//   const [keepExistingImage, setKeepExistingImage] = React.useState(true);

//   const [snackbar, setSnackbar] = React.useState({
//     open: false,
//     message: "",
//     severity: "success" as "success" | "error",
//   });

//   const [slugManuallyEdited, setSlugManuallyEdited] = React.useState(
//     mode === "edit"
//   );

//   const nameValue = watch("name");

//   // Auto-generate slug from name (only if not manually edited)
//   React.useEffect(() => {
//     if (!slugManuallyEdited && nameValue) {
//       setValue("slug", generateSlug(nameValue), { shouldDirty: true });
//     }
//   }, [nameValue, slugManuallyEdited, setValue]);

//   // Warn on unsaved changes when navigating away
//   React.useEffect(() => {
//     const handler = (e: BeforeUnloadEvent) => {
//       if (isDirty || imageFile) {
//         e.preventDefault();
//         e.returnValue = "";
//       }
//     };
//     window.addEventListener("beforeunload", handler);
//     return () => window.removeEventListener("beforeunload", handler);
//   }, [isDirty, imageFile]);

//   const handleImageChange = (file: File | null) => {
//     setImageFile(file);
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImagePreview(url);
//       setKeepExistingImage(false);
//     } else {
//       setImagePreview(null);
//       setKeepExistingImage(false);
//     }
//   };

//   const onSubmit = async (data: ServiceFormValues) => {
//     try {
//       const formData = new FormData();

//       formData.append("name", data.name);
//       formData.append("slug", data.slug);
//       formData.append("active", String(data.active));

//       const heroBannerData = { ...data.heroBanner };
//       // If editing and no new image, keep existing image/publicId
//       if (mode === "edit" && keepExistingImage && defaultValues?.heroBanner?.image) {
//         (heroBannerData as any).image = defaultValues.heroBanner.image;
//         (heroBannerData as any).publicId = defaultValues.heroBanner.publicId;
//       }
//       formData.append("heroBanner", JSON.stringify(heroBannerData));
//       formData.append("headingDesc", JSON.stringify(data.headingDesc));
//       formData.append("processSection", JSON.stringify(data.processSection));
//       formData.append("faqSection", JSON.stringify(data.faqSection));
//       formData.append("seo", JSON.stringify(data.seo));

//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       if (mode === "add") {
//         await createService(formData);
//         setSnackbar({ open: true, message: "Service created successfully!", severity: "success" });
//         setTimeout(() => router.push("/dashboard/services"), 1200);
//       } else if (mode === "edit" && serviceId) {
//         await updateService(serviceId, formData);
//         setSnackbar({ open: true, message: "Service updated successfully!", severity: "success" });
//       }
//     } catch (error: any) {
//       setSnackbar({
//         open: true,
//         message: error?.message || "Something went wrong",
//         severity: "error",
//       });
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
//         {/* Header */}
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           justifyContent="space-between"
//           alignItems={{ xs: "flex-start", sm: "center" }}
//           spacing={2}
//           mb={3}
//         >
//           <Stack direction="row" alignItems="center" spacing={1}>
//             <Button
//               variant="text"
//               startIcon={<ArrowLeft size={16} />}
//               onClick={() => router.push("/dashboard/services")}
//               sx={{ minWidth: "auto", px: 1 }}
//             >
//               Back
//             </Button>
//             <Divider orientation="vertical" flexItem />
//             <Typography variant="h5" fontWeight={700}>
//               {mode === "add" ? "Add New Service" : "Edit Service"}
//             </Typography>
//           </Stack>

//           {/* Sticky save button area */}
//           <Stack direction="row" spacing={2} alignItems="center">
//             <Controller
//               name="active"
//               control={control}
//               render={({ field }) => (
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={field.value}
//                       onChange={(e) => field.onChange(e.target.checked)}
//                       color="success"
//                     />
//                   }
//                   label={field.value ? "Active" : "Inactive"}
//                   labelPlacement="start"
//                 />
//               )}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               disabled={isSubmitting}
//               startIcon={<FloppyDisk size={16} />}
//               sx={{ whiteSpace: "nowrap" }}
//             >
//               {isSubmitting
//                 ? "Saving..."
//                 : mode === "add"
//                 ? "Create Service"
//                 : "Save Changes"}
//             </Button>
//           </Stack>
//         </Stack>

//         <Grid container spacing={3}>
//           {/* LEFT: Main fields */}
//           <Grid  size={{ lg: 8,  xs: 12 }} >
//             <Stack spacing={3}>
//               {/* Basic Info */}
//               <Card variant="outlined">
//                 <CardContent>
//                   <Typography variant="h6" fontWeight={600} mb={2}>
//                     Basic Information
//                   </Typography>
//                   <Divider sx={{ mb: 3 }} />

//                   <Grid container spacing={2}>
//                  <Grid  size={{   xs: 12 }} >
//                       <Controller
//                         name="name"
//                         control={control}
//                         rules={{
//                           required: "Service name is required",
//                           minLength: { value: 3, message: "Minimum 3 characters" },
//                         }}
//                         render={({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label="Service Name"
//                             placeholder="e.g. Web Development"
//                             error={!!errors.name}
//                             helperText={errors.name?.message}
//                             inputProps={{ "aria-label": "Service name" }}
//                           />
//                         )}
//                       />
//                     </Grid>

//                     <Grid  size={{  xs: 12 }} >
//                       <Controller
//                         name="slug"
//                         control={control}
//                         rules={{
//                           required: "Slug is required",
//                           pattern: {
//                             value: /^[a-z0-9-]+$/,
//                             message: "Only lowercase letters, numbers, and hyphens",
//                           },
//                         }}
//                         render={({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label="Slug"
//                             placeholder="e.g. web-development"
//                             error={!!errors.slug}
//                             helperText={
//                               errors.slug?.message ||
//                               "URL-friendly identifier — auto-generated from name"
//                             }
//                             onChange={(e) => {
//                               field.onChange(e);
//                               setSlugManuallyEdited(true);
//                             }}
//                             InputProps={{
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <Typography variant="body2" color="text.disabled">
//                                     /services/
//                                   </Typography>
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                         )}
//                       />
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>

//               {/* Hero Banner */}
//               <HeroSection
//                 imagePreview={imagePreview}
//                 onImageChange={handleImageChange}
//               />

//               {/* Heading & Description */}
//               <HeadingDescSection />

//               {/* Process */}
//               <ProcessSection />

//               {/* FAQ */}
//               <FaqSection />

//               {/* SEO */}
//               <SeoSection/>
//             </Stack>
//           </Grid>

//           {/* RIGHT: Sidebar */}
//           <Grid  size={{ lg: 4,  xs: 12 }} >
//             <Box
//               sx={{
//                 position: { lg: "sticky" },
//                 top: { lg: 80 },
//               }}
//             >
//               <Stack spacing={3}>
//                 {/* Status card */}
//                 <Card variant="outlined">
//                   <CardContent>
//                     <Typography variant="h6" fontWeight={600} mb={2}>
//                       Status & Visibility
//                     </Typography>
//                     <Divider sx={{ mb: 2 }} />
//                     <Controller
//                       name="active"
//                       control={control}
//                       render={({ field }) => (
//                         <Stack spacing={1}>
//                           <FormControlLabel
//                             control={
//                               <Switch
//                                 checked={field.value}
//                                 onChange={(e) => field.onChange(e.target.checked)}
//                                 color="success"
//                               />
//                             }
//                             label="Service is active"
//                           />
//                           <Typography variant="caption" color="text.secondary">
//                             {field.value
//                               ? "This service is publicly visible."
//                               : "This service is hidden from the public."}
//                           </Typography>
//                         </Stack>
//                       )}
//                     />
//                   </CardContent>
//                 </Card>

//                 {/* Summary card */}
//                 <Card variant="outlined">
//                   <CardContent>
//                     <Typography variant="h6" fontWeight={600} mb={2}>
//                       Summary
//                     </Typography>
//                     <Divider sx={{ mb: 2 }} />
//                     <Stack spacing={1}>
//                       <SummaryRow label="Name" value={watch("name") || "—"} />
//                       <SummaryRow label="Slug" value={watch("slug") || "—"} />
//                       <SummaryRow
//                         label="Sections"
//                         value={String(watch("headingDesc")?.length || 0)}
//                       />
//                       <SummaryRow
//                         label="Process Steps"
//                         value={String(watch("processSection.steps")?.length || 0)}
//                       />
//                       <SummaryRow
//                         label="FAQs"
//                         value={String(watch("faqSection.faqs")?.length || 0)}
//                       />
//                       <SummaryRow
//                         label="Keywords"
//                         value={String(watch("seo.keywords")?.length || 0)}
//                       />
//                     </Stack>
//                   </CardContent>
//                 </Card>

//                 {/* Bottom save button */}
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   fullWidth
//                   disabled={isSubmitting}
//                   startIcon={<FloppyDisk size={18} />}
//                 >
//                   {isSubmitting
//                     ? "Saving..."
//                     : mode === "add"
//                     ? "Create Service"
//                     : "Save Changes"}
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   onClick={() => router.push("/dashboard/services")}
//                 >
//                   Cancel
//                 </Button>
//               </Stack>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity={snackbar.severity} variant="filled">
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </FormProvider>
//   );
// }

// function SummaryRow({ label, value }: { label: string; value: string }) {
//   return (
//     <Stack direction="row" justifyContent="space-between" alignItems="center">
//       <Typography variant="body2" color="text.secondary">
//         {label}
//       </Typography>
//       <Typography variant="body2" fontWeight={500}>
//         {value}
//       </Typography>
//     </Stack>
//   );
// }


"use client";

import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Controller,
  FormProvider,
  useForm,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { FloppyDisk } from "@phosphor-icons/react/dist/ssr/FloppyDisk";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";
import { UploadSimple } from "@phosphor-icons/react/dist/ssr/UploadSimple";

import { createService, updateService } from "@/api/services.Api";
import { ServiceDocument, ServiceFormValues } from "@/types/service";
import HeroSection from "./HeroSection";
import HeadingDescSection from "./HeadingDescSection";
import ProcessSection from "./ProcessSection";
import FaqSection from "./FaqSection";
import SeoSection from "./SeoSection";

interface ServiceFormProps {
  mode: "add" | "edit";
  defaultValues?: Partial<ServiceDocument>;
  serviceId?: string;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const EMPTY_DEFAULTS: ServiceFormValues = {
  name: "",
  slug: "",
  active: true,
  heroBanner: { heading: "", description: "", text: "" },
  headingDesc: [],
  processSection: {
    title: "",
    title2Text: "",
    showTitle2: true,
    description: "",
    steps: [],
  },
  faqSection: {
    title: "",
    title2Text: "",
    showTitle2: true,
    faqs: [],
  },
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
  },
};

export default function ServiceForm({
  mode,
  defaultValues,
  serviceId,
}: ServiceFormProps) {
  const router = useRouter();

  const methods = useForm<ServiceFormValues>({
    defaultValues: defaultValues
      ? {
          name: defaultValues.name || "",
          slug: defaultValues.slug || "",
          active: defaultValues.active ?? true,
          heroBanner: {
            heading: defaultValues.heroBanner?.heading || "",
            description: defaultValues.heroBanner?.description || "",
            text: defaultValues.heroBanner?.text || "",
          },
          headingDesc: defaultValues.headingDesc || [],
          processSection:
            defaultValues.processSection || EMPTY_DEFAULTS.processSection,
          faqSection:
            defaultValues.faqSection || EMPTY_DEFAULTS.faqSection,
          seo: defaultValues.seo || EMPTY_DEFAULTS.seo,
        }
      : EMPTY_DEFAULTS,
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = methods;

  // ── Hero banner image state ──
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    defaultValues?.heroBanner?.image || null
  );
  const [keepExistingImage, setKeepExistingImage] = React.useState(true);

  // ── Thumbnail image state ──
  const [thumbnailFile, setThumbnailFile] = React.useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = React.useState<string | null>(
    defaultValues?.thumbnail?.imageUrl || null
  );
  const [clearThumbnail, setClearThumbnail] = React.useState(false);

  const thumbnailInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragOverThumb, setIsDragOverThumb] = React.useState(false);

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [slugManuallyEdited, setSlugManuallyEdited] = React.useState(
    mode === "edit"
  );

  const nameValue = watch("name");

  React.useEffect(() => {
    if (!slugManuallyEdited && nameValue) {
      setValue("slug", generateSlug(nameValue), { shouldDirty: true });
    }
  }, [nameValue, slugManuallyEdited, setValue]);

  React.useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty || imageFile || thumbnailFile) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, imageFile, thumbnailFile]);

  // ── Hero image handlers ──
  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setKeepExistingImage(false);
    } else {
      setImagePreview(null);
      setKeepExistingImage(false);
    }
  };

  // ── Thumbnail handlers ──
  const handleThumbnailFile = (file: File | null) => {
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
    setClearThumbnail(false);
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setClearThumbnail(true);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
  };

  const onSubmit = async (data: ServiceFormValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("active", String(data.active));

      // Hero banner
      const heroBannerData = { ...data.heroBanner };
      if (mode === "edit" && keepExistingImage && defaultValues?.heroBanner?.image) {
        (heroBannerData as any).image = defaultValues.heroBanner.image;
        (heroBannerData as any).publicId = defaultValues.heroBanner.publicId;
      }
      formData.append("heroBanner", JSON.stringify(heroBannerData));

      console.log(data.heroBanner);

      // Thumbnail clear flag (for edit mode)
      if (mode === "edit" && clearThumbnail) {
        formData.append("clearThumbnail", "true");
      }

      formData.append("headingDesc", JSON.stringify(data.headingDesc));
      formData.append("processSection", JSON.stringify(data.processSection));
      formData.append("faqSection", JSON.stringify(data.faqSection));
      formData.append("seo", JSON.stringify(data.seo));

      if (imageFile) formData.append("image", imageFile);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

      if (mode === "add") {
        await createService(formData);
        setSnackbar({
          open: true,
          message: "Service created successfully!",
          severity: "success",
        });
        setTimeout(() => router.push("/dashboard/services"), 1200);
      } else if (mode === "edit" && serviceId) {
        await updateService(serviceId, formData);
        setSnackbar({
          open: true,
          message: "Service updated successfully!",
          severity: "success",
        });
        setTimeout(() => router.push("/dashboard/services"), 1200);
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error?.message || "Something went wrong",
        severity: "error",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* ── Header ── */}
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
              sx={{ minWidth: "auto", px: 1 }}
            >
              Back
            </Button>
            <Divider orientation="vertical" flexItem />
            <Typography variant="h5" fontWeight={700}>
              {mode === "add" ? "Add New Service" : "Edit Service"}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="success"
                    />
                  }
                  label={field.value ? "Active" : "Inactive"}
                  labelPlacement="start"
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={<FloppyDisk size={16} />}
              sx={{ whiteSpace: "nowrap" }}
            >
              {isSubmitting
                ? "Saving..."
                : mode === "add"
                ? "Create Service"
                : "Save Changes"}
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {/* ── LEFT: Main fields ── */}
          <Grid size={{ lg: 8, xs: 12 }}>
            <Stack spacing={3}>
              {/* Basic Info */}
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Basic Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: "Service name is required",
                          minLength: { value: 3, message: "Minimum 3 characters" },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Service Name"
                            placeholder="e.g. Web Development"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            inputProps={{ "aria-label": "Service name" }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Controller
                        name="slug"
                        control={control}
                        rules={{
                          required: "Slug is required",
                          pattern: {
                            value: /^[a-z0-9-]+$/,
                            message:
                              "Only lowercase letters, numbers, and hyphens",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Slug"
                            placeholder="e.g. web-development"
                            error={!!errors.slug}
                            helperText={
                              errors.slug?.message ||
                              "URL-friendly identifier — auto-generated from name"
                            }
                            onChange={(e) => {
                              field.onChange(e);
                              setSlugManuallyEdited(true);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography
                                    variant="body2"
                                    color="text.disabled"
                                  >
                                    /services/
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <HeroSection
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
              />
              <HeadingDescSection />
              <ProcessSection />
              <FaqSection />
              <SeoSection />
            </Stack>
          </Grid>

          {/* ── RIGHT: Sidebar ── */}
          <Grid size={{ lg: 4, xs: 12 }}>
            <Box sx={{ position: { lg: "sticky" }, top: { lg: 80 } }}>
              <Stack spacing={3}>
                {/* ── THUMBNAIL CARD ── */}
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} mb={1}>
                      Thumbnail <span style={{
                        fontSize:"10px"
                      }}>( Recommended: 377 × 341 px )</span>
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={2}
                    >
                      Shown in service listing cards
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {thumbnailPreview ? (
                      /* ── Preview with remove button ── */
                      <Box position="relative">
                        <Box
                          component="img"
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          sx={{
                            width: "100%",
                            height: 160,
                            objectFit: "cover",
                            borderRadius: 1.5,
                            display: "block",
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        />
                        <Tooltip title="Remove thumbnail">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={handleRemoveThumbnail}
                            sx={{
                              position: "absolute",
                              top: 6,
                              right: 6,
                              bgcolor: "background.paper",
                              boxShadow: 2,
                              "&:hover": { bgcolor: "error.lighter" },
                            }}
                          >
                            <Trash size={14} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      /* ── Drag & drop upload zone ── */
                      <Box
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragOverThumb(true);
                        }}
                        onDragLeave={() => setIsDragOverThumb(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragOverThumb(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file?.type.startsWith("image/"))
                            handleThumbnailFile(file);
                        }}
                        onClick={() => thumbnailInputRef.current?.click()}
                        sx={{
                          border: "2px dashed",
                          borderColor: isDragOverThumb
                            ? "primary.main"
                            : "divider",
                          borderRadius: 1.5,
                          p: 3,
                          textAlign: "center",
                          cursor: "pointer",
                          bgcolor: isDragOverThumb
                            ? "primary.50"
                            : "action.hover",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "primary.main",
                            bgcolor: "primary.50",
                          },
                        }}
                      >
                        <UploadSimple
                          size={28}
                          style={{ marginBottom: 6, opacity: 0.45 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Drag & drop or{" "}
                          <Box
                            component="span"
                            color="primary.main"
                            fontWeight={600}
                          >
                            browse
                          </Box>
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          PNG, JPG, WEBP · recommended 377×341
                        </Typography>
                      </Box>
                    )}

                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        handleThumbnailFile(e.target.files?.[0] || null)
                      }
                    />
                  </CardContent>
                </Card>

                {/* Status card */}
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                      Status & Visibility
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Controller
                      name="active"
                      control={control}
                      render={({ field }) => (
                        <Stack spacing={1}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                                color="success"
                              />
                            }
                            label="Service is active"
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {field.value
                              ? "This service is publicly visible."
                              : "This service is hidden from the public."}
                          </Typography>
                        </Stack>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Summary card */}
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                      Summary
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack spacing={1}>
                      <SummaryRow label="Name" value={watch("name") || "—"} />
                      <SummaryRow label="Slug" value={watch("slug") || "—"} />
                      <SummaryRow
                        label="Sections"
                        value={String(watch("headingDesc")?.length || 0)}
                      />
                      <SummaryRow
                        label="Process Steps"
                        value={String(
                          watch("processSection.steps")?.length || 0
                        )}
                      />
                      <SummaryRow
                        label="FAQs"
                        value={String(watch("faqSection.faqs")?.length || 0)}
                      />
                      <SummaryRow
                        label="Keywords"
                        value={String(watch("seo.keywords")?.length || 0)}
                      />
                    </Stack>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                  startIcon={<FloppyDisk size={18} />}
                >
                  {isSubmitting
                    ? "Saving..."
                    : mode === "add"
                    ? "Create Service"
                    : "Save Changes"}
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => router.push("/dashboard/services")}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </FormProvider>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value}
      </Typography>
    </Stack>
  );
}