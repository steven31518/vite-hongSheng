import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

export const getAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await api.products.getAllProducts();
    return response;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      const { products } = action.payload;
      state.products = Object.values(products);
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default productsSlice.reducer;
