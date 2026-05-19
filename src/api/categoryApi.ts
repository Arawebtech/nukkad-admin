import API from "./api";



export const getCategories =
  async () => {
    const response =
      await API.get(
        "/category"
      );

    return response.data;
  };



export const createCategory =
  async (data:any) => {
    const response =
      await API.post(
        "/category/create",
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



export const updateCategory =
  async (
    id: string,
    data: FormData
  ) => {
    const response =
      await API.put(
        `/category/update/${id}`,
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



export const deleteCategory =
  async (id: string) => {
    const response =
      await API.delete(
        `/category/delete/${id}`
      );

    return response.data;
  };