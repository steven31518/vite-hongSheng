import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type { productType } from "@/components/ProductForm";

type imageResponseData = {
  success: boolean;
  imageUrl: string;
};

interface productDataWithId extends productType {
  readonly id: string;
}
type responseType = {
  success: boolean;
  products: {
    [key: string]: productDataWithId;
  };
};

export const getAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await api.products.getAllProducts();
    return response as unknown as responseType;
  }
);
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
    imgUrl: [] as string[],
    products: [] as productDataWithId[],
    loading: false,
    success: false,
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
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      const { products } = action.payload;
      if (products) state.products = Object.values(products);
      state.success = true;
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(updateImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateImage.fulfilled, (state, action) => {
      state.loading = false;
      state.files = [];
      state.success = action.payload.every((item) => item.success);
      state.imgUrl = [
        ...state.imgUrl,
        ...action.payload.map((item) => item.imageUrl),
      ];
    });
    builder.addCase(updateImage.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});
export const { setImgUrl } = productsSlice.actions;
export default productsSlice.reducer;
