import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import axios from 'axios';

const USERS_URL = 'http://142.93.224.186:3000/users/'

const fetchUserById = createAsyncThunk(
    'users/fetchUsers' , 
     async function (){
         const response = await axios.get(USERS_URL);
         console.log(response);
     }
    )

// const axiosApi = axios.create({
//     baseURL: "http://142.93.224.186:3000/",
//     headers: {
//       withCredentials: true,
//     },
//   });

  interface User {
        id: string;
        name: string;
        email:string;
        password:string;
    } 

  interface userState {
    users: [] ;
    isAuth: boolean;
  }
  // Define the initial state using that type
  const initialState: userState = {
    users: [],
    isAuth: false
  }
  
  export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

       createUser: ( state, {payload} : PayloadAction <Omit<User , 'id'>>) => {
  
        const res = async () => {

        
        try {
            const response = await axios.post("register",
              {
                email: payload.email,
                password: payload.password,
                name: payload.name,
              }
            );
            console.log(response);
            console.log(response?.data);
          } catch (err) {
            console.log(err);
          }
        }

        // console.log(payload);

       },
       
       setUser: ( state, {payload}) =>{

       }
    },

    extraReducers : {
        [fetchUserById.pending]: (state) =>{
            state.status= "loading"
        }
    }
  })
  
  export const { createUser, setUser } = usersSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
//   export const selectCount = (state: RootState) => state.counter.value
  
  export default usersSlice.reducer

