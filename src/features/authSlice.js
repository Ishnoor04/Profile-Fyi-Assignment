
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch user data from API(/api/auth/me) using token stored in local storage
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const response = await fetch('/api/auth/me', {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  const data = await response.json();
  if (response.ok) {
    return data; // Return user data if successful
  } else {
    throw new Error(data.message); // Throw error if response is not OK
  }
});

// Handle user signup by sending user details to the API
export const signup = createAsyncThunk('auth/signup', async (userDetails) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userDetails),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    return data; // Return the signup response, including token and user data
  } else {
    throw new Error(data.message);
  }
});

// Handle user login by sending credentials to the API
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token); // Save token to local storage
    return data;
  } else {
    throw new Error(data.message);
  }
});

// Handle user logout by removing token from local storage
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token'); // Remove token from local storage
  return;
});

// Create the auth slice with initial state and reducers
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token:  null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;
