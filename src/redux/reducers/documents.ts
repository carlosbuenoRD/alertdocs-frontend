import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import documentService from "@/services/documents";
import { toast } from "react-toastify";
import { toastConfig } from "@/utils/data";

const {
  addDocument,
  getDocuments,
  getOneDocument,
  getDocumentsByArea,
  getDocumentsByDireccion,
  getDocumentsByDepartment,
  getCompletedDocumentsByArea,
  getCompletedDocumentsByDepartment,
  getCompletedDocumentsByDireccion,
} = documentService();

const initialState: InitialState = {
  documents: [],
  historyDocuments: [],
  document: {},
  loading: false,
  errors: null,
};

export const fetchAllDocuments = createAsyncThunk(
  "documents/getAll",
  async (_, thunkApi) => {
    try {
      const data = await getDocuments();
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchDocumentsByArea = createAsyncThunk(
  "documents/getDocumentsByArea",
  async (id: any, thunkApi) => {
    try {
      const data = await getDocumentsByArea(id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchDocumentsByDireccion = createAsyncThunk(
  "documents/getDocumentsByDireccion",
  async (id: any, thunkApi) => {
    try {
      const data = await getDocumentsByDireccion(id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchDocumentsByDepartments = createAsyncThunk(
  "documents/getDocumentsByDepartments",
  async (id: any, thunkApi) => {
    try {
      const data = await getDocumentsByDepartment(id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCompletedDocumentsByArea = createAsyncThunk(
  "documents/getCompletedDocumentsByArea",
  async (id: any, thunkApi) => {
    try {
      const data = await getCompletedDocumentsByArea(id);
      thunkApi.dispatch(setHistoryDocumentsList(data));
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCompletedDocumentsByDireccion = createAsyncThunk(
  "documents/getCompletedDocumentsByDireccion",
  async (id: any, thunkApi) => {
    try {
      const data = await getCompletedDocumentsByDireccion(id);
      thunkApi.dispatch(setHistoryDocumentsList(data));
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCompletedDocumentsByDepartments = createAsyncThunk(
  "documents/getCompletedDocumentsByDepartments",
  async (id: any, thunkApi) => {
    try {
      const data = await getCompletedDocumentsByDepartment(id);
      thunkApi.dispatch(setHistoryDocumentsList(data));
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchOneDocument = createAsyncThunk(
  "documents/getOne",
  async (id: any, thunkApi) => {
    try {
      const data = await getOneDocument(id);
      thunkApi.dispatch(setDocument(data));
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const createdocument = createAsyncThunk(
  "documents/createOne",
  async (document: any, thunkApi) => {
    try {
      await addDocument(document);
      toast.success("Has creado un documento!", toastConfig);
    } catch (error: any) {
      toast.success(error.message, toastConfig);
      thunkApi.rejectWithValue(error);
    }
  }
);

// export const deletedocument = createAsyncThunk(
//   "documents/deleteOne",
//   async (id: any, thunkApi) => {
//     try {
//       await removedocument(id);
//       thunkApi.dispatch(fetchAlldocuments());
//     } catch (error) {
//       thunkApi.rejectWithValue(error);
//     }
//   }
// );

export const documentslice = createSlice({
  name: "documents",
  initialState: initialState,
  reducers: {
    setDocumentsList: (state, action) => {
      state.documents = action.payload;
    },
    setHistoryDocumentsList: (state, action) => {
      state.historyDocuments = action.payload;
    },
    setDocument: (state, action) => {
      state.document = action.payload;
    },
    clearDocument: (state, action) => {
      state.document = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllDocuments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = action.payload;
    });
    builder.addCase(fetchAllDocuments.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    // Get One
    builder.addCase(fetchOneDocument.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOneDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.document = action.payload;
    });
    builder.addCase(fetchOneDocument.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    // GET BY AREAS
    builder.addCase(fetchDocumentsByArea.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDocumentsByArea.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = action.payload;
    });
    builder.addCase(fetchDocumentsByArea.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    // ADD document
    builder.addCase(createdocument.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createdocument.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export const {
  setDocumentsList,
  setDocument,
  clearDocument,
  setHistoryDocumentsList,
} = documentslice.actions;

interface InitialState {
  documents: any[];
  historyDocuments: any[];
  document: any;
  loading: boolean;
  errors: any;
}

// export const { finddocuments } = documentslice.actions;

export default documentslice.reducer;
