import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'));

//the intiale state
const initialState = {
  user: null,
  isSuccess: false,
  isError: false,

  isLoading: false,
  message: '',
};
//Register user
export const register =createAsyncThunk('auth/register',async (user,thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message=(error.responce && error.responce.data && error.responce.message) || error.message || error.toSting()
        return thunkAPI.rejectWithValue(message)
    }
})
//login
export const login  =createAsyncThunk('auth login ',async (user,thunkAPI)=>{
  try {
      return await authService.login(user)
  } catch (error) {
      const message=(error.responce && error.responce.data && error.responce.message) || error.message || error.toSting()
      return thunkAPI.rejectWithValue(message)
  }
})
//logout 
export const logout = createAsyncThunk('auth/logout',async()=>{
  await authService.Logout()
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder 
    //register
    .addCase(register.pending,(state)=>{
        state.isLoading=true
    })
    .addCase(register.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.user=action.payload
    }
    )
    .addCase(register.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message= action.payload
        state.user=null 
    })
//login
    .addCase(login.pending,(state)=>{
      state.isLoading=true
  })
  .addCase(login.fulfilled,(state,action)=>{
      state.isLoading=false
      state.isSuccess=true
      state.user=action.payload
  }
  )
  .addCase(login.rejected,(state,action)=>{
      state.isLoading=false
      state.isError=true
      state.message= action.payload
      state.user=null 
  })
  //logout
    .addCase(logout.fulfilled,(state)=>{
      state.user=null
    })
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
