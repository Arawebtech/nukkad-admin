import API from "./api";

/* =========================
   GET ALL CAREERS
========================= */

export const getAllCareers = async () => {
  const response = await API.get("/career/all");

  return response.data;
};

/* =========================
   GET SINGLE CAREER
========================= */

export const getSingleCareer = async (id: string) => {
  const response = await API.get(`/career/${id}`);

  return response.data;
};

/* =========================
   CREATE CAREER APPLICATION
========================= */

export const createCareer = async (data: FormData) => {
  const response = await API.post("/career/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* =========================
   UPDATE STATUS (ONLY STATUS)
========================= */

export const updateCareerStatus = async (
  id: string,
  status: string
) => {
  const response = await API.put(`/career/update/${id}`, {
    status,
  });

  return response.data;
};

/* =========================
   DELETE CAREER
========================= */

export const deleteCareer = async (id: string) => {
  const response = await API.delete(`/career/delete/${id}`);

  return response.data;
};

export const updateCareer = async (id: string, data: any) => {
  const response = await API.put(`/career/update/${id}`, data);
  return response.data;
};