import API from "./api";

/* =========================
   GET ALL GALLERY
========================= */

export const getAllGallery = async () => {
  const response = await API.get("/gallery");
  return response.data;
};

/* =========================
   GET SINGLE GALLERY
========================= */

export const getSingleGallery = async (id: string) => {
  const response = await API.get(`/gallery/${id}`);
  return response.data;
};

/* =========================
   CREATE GALLERY
========================= */

export const createGallery = async (data: FormData) => {
  const response = await API.post("/gallery/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* =========================
   UPDATE GALLERY
========================= */

export const updateGallery = async (
  id: string,
  data: FormData
) => {
  const response = await API.put(
    `/gallery/update/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/* =========================
   DELETE GALLERY
========================= */

export const deleteGallery = async (id: string) => {
  const response = await API.delete(`/gallery/${id}`);
  return response.data;
};

export const toggleGalleryStatus = async (id: string) => {
  const response = await API.patch(`/gallery/toggle/${id}`);
  return response.data;
};