import API from "./api";

/* =========================
   GET ALL SERVICES
========================= */
export const getAllServices = async (
  page = 1,
  limit = 10,
  search = "",
  active?: boolean
) => {
  try {
    const response = await API.get("/services", {
      params: {
        page,
        limit,
        search,
        ...(active !== undefined && { active }),
      },
    });

    return response.data;
  } catch (error: any) {
    throw (
      error?.response?.data || {
        success: false,
        message: "Failed to fetch services",
      }
    );
  }
};

/* =========================
   GET SERVICE BY ID
========================= */
export const getServiceById = async (
  id: string
) => {
  try {
    const response = await API.get(
      `/services/${id}`
    );

    return response.data;
  } catch (error: any) {
    throw (
      error?.response?.data || {
        success: false,
        message: "Failed to fetch service",
      }
    );
  }
};

/* =========================
   GET SERVICE BY SLUG
========================= */
export const getServiceBySlug = async (
  slug: string
) => {
  try {
    const response = await API.get(
      `/services/slug/${slug}`
    );

    return response.data;
  } catch (error: any) {
    throw (
      error?.response?.data || {
        success: false,
        message: "Failed to fetch service",
      }
    );
  }
};

/* =========================
   CREATE SERVICE
========================= */
export const createService = async (
  formData: FormData
) => {
  try {
    const response = await API.post(
      "/services/create",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw (
      error?.response?.data || {
        success: false,
        message: "Failed to create service",
      }
    );
  }
};

/* =========================
   UPDATE SERVICE
========================= */
export const updateService = async (
  id: string,
  formData: FormData
) => {
  try {
    const response = await API.put(
      `/services/${id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw (
      error?.response?.data || {
        success: false,
        message: "Failed to update service",
      }
    );
  }
};

/* =========================
   DELETE SERVICE
========================= */
export const deleteService = async (
  id: string
) => {
  try {
    const response = await API.delete(
      `/services/${id}`
    );

    return response.data;
  } catch (error: any) {
    throw (
      error?.response?.data || {
        success: false,
        message: "Failed to delete service",
      }
    );
  }
};

/* =========================
   UPDATE STATUS
========================= */
export const updateServiceStatus =
  async (
    id: string,
    active: boolean
  ) => {
    try {
      const response = await API.patch(
        `/services/${id}/status`,
        {
          active,
        }
      );

      return response.data;
    } catch (error: any) {
      throw (
        error?.response?.data || {
          success: false,
          message:
            "Failed to update status",
        }
      );
    }
  };