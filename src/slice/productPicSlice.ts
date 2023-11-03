import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/lib/api";

type ResponseData = {
  success: boolean;
  imageUrl: string;
};

export const updateImage = createAsyncThunk(
  "updateImageResponse/fetchupdateImageResponse",
  async (files: File[]) => {
    const promise = files.map(async (file) => {
      const response = await api.products.addPicture(file);
      return response as ResponseData;
    });
    const result = await Promise.all(promise);
    return result;
  }
);

export const productPicSlice = createSlice({
  name: "productPic",
  initialState: {
    files: [],
    imgUrl: [] as ResponseData[],
    message: "",
    loading: false,
    error: false,
  },
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setImgUrl: (state, action) => {
      state.imgUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateImage.fulfilled, (state, action) => {
      state.loading = false;
      state.files = [];
      state.imgUrl = [...state.imgUrl, ...action.payload];
    });
    builder.addCase(updateImage.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default productPicSlice.reducer;
