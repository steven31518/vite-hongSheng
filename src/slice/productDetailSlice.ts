import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "@/lib/api";

type productDataWithId = {
  success: boolean;
  product: {
    category: string;
    content: string;
    description: string;
    id: string;
    imageUrl: string;
    imagesUrl: string[];
    is_enabled: number;
    num: number;
    origin_price: number;
    price: number;
    title: string;
    unit: string;
  };
};

export const getProductWithId = createAsyncThunk(
  "onSales/fetchProductWithId",
  async (id: string) => {
    const response = await api.onSales.getProductWithId(id);
    return response as unknown as productDataWithId;
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    product: {} as productDataWithId["product"],
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductWithId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductWithId.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        const { product, success } = action.payload;
        state.product = product;
        state.success = success;
      }
    });
  },
});

export default productDetailSlice.reducer;
