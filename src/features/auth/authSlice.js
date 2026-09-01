import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/*
 * REGISTER USER
 */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return rejectWithValue(
          data.message || "Failed to register"
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        "Unable to connect to the server. Please try again."
      );
    }
  }
);

/*
 * LOGIN USER
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return rejectWithValue(
          data.message || "Invalid email or password"
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        "Unable to connect to the server. Please try again."
      );
    }
  }
);

/*
 * Read saved authentication data
 */
const savedToken = localStorage.getItem("shopease_token");
const savedUser = localStorage.getItem("shopease_user");

let parsedUser = null;

if (savedUser && savedUser !== "undefined") {
  try {
    parsedUser = JSON.parse(savedUser);
  } catch (error) {
    console.error("Invalid saved user data. Clearing localStorage.");

    localStorage.removeItem("shopease_user");
    localStorage.removeItem("shopease_token");
  }
}

const initialState = {
  user: parsedUser,
  token: savedToken || null,
  status: "idle",
  error: null,
};

/*
 * AUTH SLICE
 */
const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;

      localStorage.removeItem("shopease_token");
      localStorage.removeItem("shopease_user");
    },
  },

  extraReducers: (builder) => {
    builder

      /*
       * REGISTER
       */
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem(
          "shopease_token",
          action.payload.token
        );

        localStorage.setItem(
          "shopease_user",
          JSON.stringify(action.payload.user)
        );
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "Failed to register";
      })

      /*
       * LOGIN
       */
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem(
          "shopease_token",
          action.payload.token
        );

        localStorage.setItem(
          "shopease_user",
          JSON.stringify(action.payload.user)
        );
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "Invalid email or password";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
