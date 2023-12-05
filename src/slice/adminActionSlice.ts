import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type { newDataType } from "@/pages/admin/admin product/ProductForm";

type responseType = {
  success: boolean;
  message: string;
};
type messageData = {
  variant: "default" | "destructive";
  title: string;
  description: string;
};
type deleteMessagePayload = "clean";
export const addNewProduct = createAsyncThunk(
  "adminAction/addNewProduct",
  async (product: newDataType) => {
    const response = await api.products.addProduct(product);
    return response as responseType;
  }
);
export const updateProduct = createAsyncThunk(
  "adminAction/updateProduct",
  async (product: newDataType & { id: string }) => {
    const response = await api.products.updateProduct(product);
    return response as responseType;
  }
);

export const deleteProduct = createAsyncThunk(
  "adminAction/deleteProduct",
  async (id: string) => {
    const response = await api.products.deleteProduct(id);
    return response as responseType;
  }
);

export const deleteMessage = createAsyncThunk(
  "adminSystem/deleteMessage",
  async (payload: deleteMessagePayload, { dispatch }) => {
    setTimeout(() => {
      dispatch(adminActionSlice.actions.deleteMessage(payload));
    }, 6000);
  }
);

const adminActionSlice = createSlice({
  name: "adminAction",
  initialState: {
    loading: false,
    message: [] as messageData[],
  },
  reducers: {
    deleteMessage: (state, action) => {
      if (action.payload === "clean") state.message = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addNewProduct.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.loading = false;
    });
    builder.addMatcher(
      (action) =>
        action.type.startsWith("adminAction") &&
        action.type.endsWith("/fulfilled"),
      (state, action) => {
        if (action.payload.success) {
          state.message.push({
            variant: "default",
            title: "Success",
            description: action.payload.message,
          });
        } else {
          state.message.push({
            variant: "destructive",
            title: "Failed",
            description: action.payload.message,
          });
        }
      }
    );
  },
});

export default adminActionSlice.reducer;
