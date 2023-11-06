import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type { newDataType, productType } from "@/components/ProductForm";

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
  "updateImageResponse/fetchupdateImageResponse",
  async (files: File[]) => {
    const promise = files.map(async (file) => {
      const response = await api.products.addPicture(file);
      return response as imageResponseData;
    });
    const result = await Promise.all(promise);
    return result;
  }
);
export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (product: newDataType) => {
    const response = await api.products.addProduct(product);

    return response as { success: boolean; message: string };
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: newDataType & { id: string }) => {
    const response = await api.products.updateProduct(product);
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
    files: [],
    imgUrl: [] as string[],
    products: [] as productDataWithId[],
    loading: false,
    message: "",
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
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const { success, message } = action.payload;
      state.message = message;
      state.success = success;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});
export const { setImgUrl } = productsSlice.actions;
export default productsSlice.reducer;
