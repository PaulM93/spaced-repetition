import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import collectionService from "./collectionService";
import dayjs from "dayjs";

const initialState = {
  collections: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  //Create
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
};

//Format Error
const errorMessage = (error) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
};

//Get Collections
export const getCollections = createAsyncThunk(
  "collections/getAll",
  //User the userID and the token to make the request
  //We dont need to pass a first argument so we can use an underscore
  async (_, thunkAPI) => {
    try {
      //Get collections here -- token stored here in localStorage
      const accessToken = thunkAPI.getState().auth.user.accessToken;
      const data = await collectionService.getCollections(accessToken);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

//Create Collection
export const createCollection = createAsyncThunk(
  "collections/create",
  async (collectionData, thunkAPI) => {
    try {
      //Thunk api has a getState method
      const accessToken = thunkAPI.getState().auth.user.accessToken;
      return await collectionService.createNewCollection(
        collectionData,
        accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

//Edit Collection
export const editCollection = createAsyncThunk(
  "collections/edit",
  async (collectionData, thunkAPI) => {
    try {
      console.log("CollectionData", collectionData);
      const accessToken = thunkAPI.getState().auth.user.accessToken;
      return await collectionService.editCollection(
        collectionData,
        accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

//Delete Collection
export const deleteCollection = createAsyncThunk(
  "collections/delete",
  async (collectionData, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.user.accessToken;
      return await collectionService.deleteCollection(
        collectionData,
        accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.message = false;
      state.isUpdated = false;
    },
    resetUpdate: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.message = false;
      state.isUpdated = false;
      state.isCreated = false;
      state.isDeleted = false;
    },
    // reset: (state) => {
    //   state.isLoading = false;
    //   state.isError = false;
    //   state.isSuccess = false;
    //   state.message = "";
    // },
  },
  extraReducers: (builder) => {
    builder
      //Get
      .addCase(getCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        // console.log("action", action.payload);
        state.isLoading = false;
        // state.isSuccess = true;
        state.collections = action.payload;
      })
      .addCase(getCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Create
      .addCase(createCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        // console.log("action", action.payload);
        state.isLoading = false;
        state.isCreated = true;
        state.isSuccess = true;
        //Send the new collection back so we can push into state
        state.collections.push(action.payload.collection);
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      //Edit
      .addCase(editCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.isSuccess = true;
      })
      .addCase(editCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      //Delete
      .addCase(deleteCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.isSuccess = true;
        //Filter from collection
        state.collections.filter((val) => val !== action.payload.id);
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.isError = action.payload;
        state.message = action.payload;
      });
  },
});

// console.log("Collectionslice", collectionSlice);

export const { reset, resetUpdate } = collectionSlice.actions;
export default collectionSlice.reducer;
