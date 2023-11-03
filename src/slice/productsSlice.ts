import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type { productDataType } from "@/components/ProductForm";

type productDataWithId = productDataType & {
  id: string;
};

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
export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (product: productDataType) => {
    const response = await api.products.addProduct(product);

    return response as { success: boolean; message: string };
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    const response = await api.products.deleteProduct(id);
    return response as { success: boolean; message: string };
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [] as productDataWithId[],
    loading: false,
    message: "",
    success: false,
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
      state.success = true;
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(addNewProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.loading = false;
      const { success, message } = action.payload;
      state.message = message;
      state.success = success;
    });
    builder.addCase(addNewProduct.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      const { success, message } = action.payload;
      state.message = message;
      state.success = success;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});

export default productsSlice.reducer;
