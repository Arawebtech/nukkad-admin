import API from "./api";



/* =========================
   GET ALL SERVICES
========================= */

export const getAllServices =
  async () => {
    const response =
      await API.get("/services");

    return response.data;
  };



/* =========================
   GET SINGLE SERVICE
========================= */

export const getSingleService =
  async (id: string) => {
    const response =
      await API.get(
        `/services/${id}`
      );

    return response.data;
  };



/* =========================
   CREATE SERVICE
========================= */

export const createService = async (data: FormData) => {
    const response =
      await API.post(
        "/services/create",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };



/* =========================
   UPDATE SERVICE
========================= */

export const updateService = async (
    id: string,
    data: FormData
  ) => {
    const response =
      await API.put(
        `/services/update/${id}`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };



/* =========================
   DELETE SERVICE
========================= */

export const deleteService =
  async (id: string) => {
    const response =
      await API.delete(
        `/services/delete/${id}`
      );

    return response.data;
  };