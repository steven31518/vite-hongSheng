import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";


type imageResponseData = {
  success: boolean;
  imageUrl: string;
};

export const updateImage = createAsyncThunk(
  "products/fetchupdateImageResponse",
  async (files: File[]) => {
    const promise = files.map(async (file) => {
      const response = await api.products.addPicture(file);
      return response as imageResponseData;
    });
    const result = await Promise.all(promise);
    return result;
  }
);
export const productsSlice = createSlice({
  name: "products",
  initialState: {
    files: [],
    imgsUrl: [] as string[],
    loading: false,
    success: false,
  },
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setimgsUrl: (state, action) => {
      state.imgsUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateImage.fulfilled, (state, action) => {
      state.loading = false;
      state.files = [];
      state.success = action.payload.every((item) => item.success);
      state.imgsUrl = [
        ...state.imgsUrl,
        ...action.payload.map((item) => item.imageUrl),
      ];
    });
    builder.addCase(updateImage.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});
export const { setimgsUrl } = productsSlice.actions;
export default productsSlice.reducer;
