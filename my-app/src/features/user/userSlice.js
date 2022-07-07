import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { handleErrorMessage } from "../utilFunctions";

const initialState = {
  isSuccessUser: {
    val: false,
    type: "",
  },
  userLoading: {
    val: false,
    type: "",
  },
  userMessage: "",
  isErrorUser: false,
};

//Change Email
export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async (user: any, thunkAPI) => {
    try {
      console.log("slice", user);
      //make request here
      const accessToken = thunkAPI.getState().auth.user.accessToken;
      return await userService.changeEmail(user, accessToken);
      //Handle error
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrorMessage(error));
    }
  }
);

//Change Password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (user: any, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.user.accessToken;
      return await userService.changePassword(user, accessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrorMessage(error));
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.isSuccessUser = {
        val: false,
        type: "",
      };
      state.userLoading = {
        val: false,
        type: "",
      };
      state.userMessage = "";
      state.isErrorUser = false;
      state.emailLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //Change Email
      .addCase(changeEmail.pending, (state) => {
        state.userLoading = {
          val: true,
          type: "email",
        };
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        console.log("Fulfilled", action);
        state.userLoading = {
          val: false,
          type: "email",
        };
        state.isSuccessUser = {
          val: true,
          type: "email",
        };
        console.log("Action", action.payload);
        state.userMessage = action.payload.message;
      })
      .addCase(changeEmail.rejected, (state, action) => {
        console.log("rejected", action);
        state.userLoading = {
          val: false,
          type: "email",
        };
        state.isErrorUser = true;
        state.userMessage = action.payload;
      })
      //Change Password
      .addCase(changePassword.pending, (state) => {
        state.userLoading = {
          val: true,
          type: "password",
        };
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        console.log("changePass action", action);
        state.userLoading = {
          val: false,
          type: "password",
        };
        state.isSuccessUser = {
          val: true,
          type: "password",
        };
        state.userMessage = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        console.log("rejected", action);
        state.userLoading = {
          val: false,
          type: "password",
        };
        state.isErrorUser = true;
        state.userMessage = action.payload;
      });
  },
});

//export so we can use in auth.tsx
export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
