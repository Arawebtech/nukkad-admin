import axios from "axios";

import { store } from "@/redux/store";

// const API = axios.create({
//   baseURL:
//     process.env.NEXT_PUBLIC_API_URL,

//   headers: {
//     "Content-Type":
//       "application/json",
//   },
// });

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL,

  headers: {
    "Content-Type":
      "application/json",
  },

});

/* ==============================
   TOKEN AUTO ADD FROM REDUX
============================== */

API.interceptors.request.use(
  (config) => {
    const state =
      store.getState();

    const token =
      state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

export default API;