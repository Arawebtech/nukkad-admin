import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";



interface Admin {
  _id: string;

  name: string;

  email: string;

  phone: string;

  address: string;

  companyName: string;

  role: string;

  comment: string;

  companyLogo: {
    url: string;

    public_id: string;
  };

  userDp: {
    url: string;

    public_id: string;
  };
}



interface AuthState {
  admin: Admin | null;

  token: string | null;

  isLoggedIn: boolean;
}



const initialState: AuthState =
  {
    admin: null,

    token: null,

    isLoggedIn: false,
  };



const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        admin: Admin;

        token: string;
      }>
    ) => {
      state.admin =
        action.payload.admin;

      state.token =
        action.payload.token;

      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.admin = null;

      state.token = null;

      state.isLoggedIn = false;
    },

    updateProfile: (
      state,
      action
    ) => {
      state.admin =
        action.payload;
    },
  },
});



export const {
  loginSuccess,
  logout,
  updateProfile,
} = authSlice.actions;

export default authSlice.reducer;