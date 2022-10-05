import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";


const TASKS_URL = "http://142.93.224.186:3000/tasks";
export const axiosApi = axios.create({
    baseURL: "http://142.93.224.186:3000/",
 
      withCredentials: true,
  
  });

export const fetchTasksByUsedId = createAsyncThunk("tasks/fetchTasks", async () => {
    try {
      const response = await axiosApi.get('tasks');
      return response.data.tasks;
    //   console.log(response);

    } catch (err: any | undefined) {
      return err.masssage;
    }
});  
export const deleteTasks = createAsyncThunk("tasks/deleteTasks", async (id:string, thunkAPI) => {
    try {
      const response = await axiosApi.delete(`tasks/${id}`);
      thunkAPI.dispatch(fetchTasksByUsedId);
      return response.data.tasks;
    //   console.log(response);

    } catch (err: any | undefined) {
      return err.masssage;
    }
});  

// deleteTask: ( state, {payload}: PayloadAction<string>) => {    
//     state.tasks = state.tasks.filter((task) => payload !== task.id);    
// },

interface Task {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
}

interface tasksState {
    tasks: [];
    statusFetch:  'loading' | 'succeeded' | 'failed' | 'idle' ;
    statusDelete :  'loading' | 'succeeded' | 'failed' | 'idle';
}

const initialState : tasksState = {
    tasks: [],
    statusFetch:  'idle',
    statusDelete: 'idle',
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder 
        .addCase(fetchTasksByUsedId.pending, ( state, action) => {
            state.statusFetch = 'loading'
        })
        .addCase(fetchTasksByUsedId.fulfilled, (state, action) => {
            state.statusFetch = 'succeeded'
            state.tasks = action.payload
        })
        .addCase(fetchTasksByUsedId.rejected, (state, action) => {
            state.statusFetch = 'failed'
        })
        .addCase(deleteTasks.pending, (state,action) => {
            state.statusDelete = 'loading'
        })
        .addCase(deleteTasks.fulfilled, (state, action) => {
            state.statusDelete= "succeeded"
        })
        .addCase(deleteTasks.rejected, (state, action) => {
            state.statusDelete = 'failed'
            
        })
    }
});

export default tasksSlice.reducer;