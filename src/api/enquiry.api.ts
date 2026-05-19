import API from "./api";

/* =========================
   GET ALL ENQUIRIES
========================= */

export const getAllEnquiries = async () => {
  const response = await API.get("/enquiry/all");

  return response.data;
};

/* =========================
   GET SINGLE ENQUIRY
========================= */

export const getSingleEnquiry = async (id: string) => {
  const response = await API.get(`/enquiry/${id}`);

  return response.data;
};

/* =========================
   CREATE ENQUIRY (FRONTEND FORM)
========================= */

export const createEnquiry = async (data: any) => {
  const response = await API.post("/enquiry/create", data);

  return response.data;
};

/* =========================
   UPDATE ENQUIRY STATUS
========================= */

export const updateEnquiryStatus = async (
  id: string,
  status: string
) => {
  const response = await API.put(`/enquiry/update/${id}`, {
    status,
  });

  return response.data;
};

/* =========================
   DELETE ENQUIRY
========================= */

export const deleteEnquiry = async (id: string) => {
  const response = await API.delete(`/enquiry/delete/${id}`);

  return response.data;
};