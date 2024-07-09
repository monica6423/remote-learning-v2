import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { API } from './api';

export interface Profile {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  company: string;
  location: string;
  status: string;
  skills: string[];
  interests: string;
  photo: string;
  date: string;
  education: any[];
  experience: any[];
}

export interface ProfileState {
  profile: Profile | null;
  profiles: Profile[];
  loading: boolean;
  error: { msg: string; status: number } | null;
}

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  loading: true,
  error: null,
};


// Async thunks
export const getCurrentProfile: AsyncThunk<any, void, any> = createAsyncThunk('profile/getCurrentProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/api/profile/me');
    return res.data;
  } catch (err: any) {
    return rejectWithValue({
      msg: err.response.statusText,
      status: err.response.status,
    });
  }
});

export const getCurrentProfileToEdit: AsyncThunk<any, void, any>  = createAsyncThunk('profile/getCurrentProfileToEdit', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/api/profile/me');
    return res.data;
  } catch (err: any) {
    return rejectWithValue({
      msg: err.response.statusText,
      status: err.response.status,
    });
  }
});

export const getProfiles: AsyncThunk<any, void, any> = createAsyncThunk('profile/getProfiles', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/api/profile');
    return res.data;
  } catch (err:any) {
    return rejectWithValue({
      msg: err.response.statusText,
      status: err.response.status,
    });
  }
});

export const getProfilesLoad: AsyncThunk<any, any, any> = createAsyncThunk('profile/getProfilesLoad', async (variables: any, { rejectWithValue }) => {
  try {
    const res = await API.post('/api/profile/postload', variables);
    return res.data;
  } catch (err: any) {
    return rejectWithValue({
      msg: err.response.statusText,
      status: err.response.status,
    });
  }
});

// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(getCurrentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ProfileState['error'];
      })
      .addCase(getCurrentProfileToEdit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentProfileToEdit.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(getCurrentProfileToEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ProfileState['error'];
      })
      .addCase(getProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
        state.loading = false;
      })
      .addCase(getProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ProfileState['error'];
      })
      .addCase(getProfilesLoad.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfilesLoad.fulfilled, (state, action) => {
        state.profiles = action.payload;
        state.loading = false;
      })
      .addCase(getProfilesLoad.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ProfileState['error'];
      });
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
