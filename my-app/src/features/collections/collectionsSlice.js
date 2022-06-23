import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import collectionService from "./collectionService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  collections: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Collections
export const getCollections = createAsyncThunk(
  "user/collections",
  //User the userID and the token to make the request
  async (user, thunkAPI) => {
    try {
      //Get collections here
    } catch (err) {
      console.log(err);
    }
  }
);
