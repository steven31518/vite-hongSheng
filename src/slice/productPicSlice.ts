import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/lib/api";

type ResponseData = {
  success: boolean;
  imgUrl: string;
};

export const addPicture = createAsyncThunk(
  "addPictureResponse/fetchAddPictureResponse",
  async (files: File[]) => {
    const arr = [];
    for (let i = 0; i < files.length; i++) {
      const response = await api.products.addPicture(files[i]);
      arr.push((response.data as unknown as ResponseData).imgUrl);
    }
  }
);

export const productPicSlice = createSlice({
  name: "productPic",
  initialState: {
    imgUrl: [] as string[],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPicture.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPicture.fulfilled, (state, action) => {
      state.loading = false;
      state.imgUrl = action.payload;
    });
    builder.addCase(addPicture.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});
