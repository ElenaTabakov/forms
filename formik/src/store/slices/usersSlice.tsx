import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";
import { stringify } from "querystring";

const USERS_URL = "http://142.93.224.186:3000/users/";
const axiosApi = axios.create({
  baseURL: "http://142.93.224.186:3000/users/",
  headers: {
    withCredentials: true,
  },
});


export const registerUser = createAsyncThunk("users/register", async ({email , password, name} : RegisterUserPost ) => {
  try {
    const response = await axiosApi.post( "/register" , { email , password, name}  );
    console.log(response.data);
  } catch (err: any | undefined){
    return err.message;
  }
});
export const loginUser = createAsyncThunk("users/login", async ({email,password} : LoginUserPost) => {
    try {
      const response = await axiosApi.post( "/login", ({email,password}) );
      return [...response.data];
      console.log(response.data.id);

    } catch (err: any | undefined) {
      return err.masssage;
    }
});

interface LoginUserPost{
    email: string;
    password: string;
}

interface  RegisterUserPost extends LoginUserPost{
    name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface userState {
  users: [];
  status: 'loading' | 'succeeded' | 'failed' ;
  isAuth: boolean;
}
// Define the initial state using that type
const initialState: userState = {
  users: [],
  status: 'loading',
  isAuth: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
//   {
//     createUser: (state, { payload }: PayloadAction<Omit<User, "id">>) => {
//       const res = async () => {
//         try {
//           const response = await axios.post("register", {
//             email: payload.email,
//             password: payload.password,
//             name: payload.name,
//           });
//           console.log(response);
//           console.log(response?.data);
//         } catch (err) {
//           console.log(err);
//         }
//       };

//       // console.log(payload);
//     },

//     setUser: (state, { payload }) => {},
//   },

  extraReducers(builder) {
    builder 
    .addCase(registerUser.pending, (state, action) => {
        state.status = 'loading'
    })
    .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
    })
    .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
    })
    .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading'
    })
    .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuth = true;       
    })
    .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
    })
  },
});
// 
// export const { registerUser, loginUser } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//   export const selectCount = (state: RootState) => state.counter.value

export default usersSlice.reducer;

