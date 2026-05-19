import API from "./api";



/* =========================
   LOGIN
========================= */

export const loginAdmin =
  async (data: {
    email: string;
    password: string;
  }) => {
    const response =
      await API.post(
        "/admin/login",
        data
      );

    return response.data;
  };



/* =========================
   CREATE ADMIN
========================= */

export const createAdmin =  async (data: FormData) => {
    const response =
      await API.post(
        "/admin/create",
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





export const updateAdmin =async (data: FormData) => {
    const response =
      await API.put(
        "/admin/update/details-all",
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


export const updatePassword = async (data: {
  email: string;
  oldPassword: string;
  newPassword: string;
}) => {
  const response = await API.put("/admin/update-password", data);

  return response.data;
};


export const getAdminProfile =async () => {
    const response =
      await API.get(
        "/admin/profile"
      );

    return response.data;
  };