import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
type productDataWithId = {
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
type responseType = {
  success: boolean;
  products: productDataWithId[];
  messages: [];
  pagination: {
    total_pages: number;
    current_page: number;
    has_pre: boolean;
    has_next: boolean;
    category: string;
  };
};

export const getProductsInPage = createAsyncThunk(
  "onSales/fetchProductsInPage",
  async (payload: { page: string; category: string }) => {
    const { page, category } = payload;
    const response = await api.onSales.getProductsInPage(page, category);
    return response as unknown as responseType;
  }
);

export const onSalesSlice = createSlice({
  name: "onSales",
  initialState: {
    products: [] as productDataWithId[],
    totalPage: 0,
    currentPage: 0,
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsInPage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductsInPage.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        const { pagination, products, success } = action.payload;
        state.products = products;
        state.success = success;
        state.totalPage = pagination.total_pages;
        state.currentPage = pagination.current_page;
      } else {
        state.products = [];
        state.success = false;
      }
    });
    builder.addCase(getProductsInPage.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default onSalesSlice.reducer;
