import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
//Save token to localstorage
//Get user form localstorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null, //aif user in local storage we set it
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Signup user
export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      //make request here
      return await authService.signup(user);
      //Handle error
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// signin user
export const signin = createAsyncThunk(
  "auth/signin",
  async (user, thunkAPI) => {
    try {
      //make request here
      return await authService.signin(user);
      //Handle error
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    }, // reset the state to default values
  },
  extraReducers: (builder) => {
    builder
      //Signup case
      .addCase(signup.pending, (state) => {
        //When signup is fired and is pending we can set loading
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        //When fulfilled we set loading to false
        //We also want to set the userdata and token
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; //returned data from signup function
      })
      //we get data returned from signup function in action.payload
      .addCase(signup.rejected, (state, action) => {
        //if error we set here
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      //Logout case -- if logout is completed we set user to null
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(signin.pending, (state) => {
        //When signin is fired and is pending we can set loading
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        //When fulfilled we set loading to false
        //We also want to set the userdata and token
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; //returned data from signin function
      })
      //we get data returned from signin function in action.payload
      .addCase(signin.rejected, (state, action) => {
        //if error we set here
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

//export so we can use in auth.tsx
export const { reset } = authSlice.actions;
export default authSlice.reducer;
