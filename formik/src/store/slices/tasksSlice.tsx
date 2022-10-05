import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";


const TASKS_URL = "http://142.93.224.186:3000/tasks";
export const axiosApi = axios.create({
    baseURL: "http://142.93.224.186:3000/",
 
      withCredentials: true,
  
  });

  interface Task {
    id: string;
    title: string;
    description: string;
}
export const fetchTasksByUsedId = createAsyncThunk("tasks/fetchTasks", async () => {
    try {
      const response = await axiosApi.get('tasks');
      return response.data.tasks;
    //   console.log(response);

    } catch (err: any | undefined) {
      return err.masssage;
    }
});  
export const createTasks = createAsyncThunk("tasks/createTasks", async ({title,description} : Task, thunkAPI) => {
    try {
      const response = await axiosApi.post('tasks', ({title, description}));
      thunkAPI.dispatch(fetchTasksByUsedId());
      return response.data.tasks;
    //   console.log(response);

    } catch (err: any | undefined) {
      return err.masssage;
    }
});  
export const updateTasks = createAsyncThunk("tasks/updateTasks", async ({id,title,description}: Task, thunkAPI) => {
    try {
      const response = await axiosApi.put(`tasks/${id}`, ({title, description}));
      thunkAPI.dispatch(fetchTasksByUsedId());
      return response.data.tasks;
    //   console.log(response);

    } catch (err: any | undefined) {
      return err.masssage;
    }
}); 

export const deleteTasks = createAsyncThunk("tasks/deleteTasks", async (id:string, thunkAPI) => {
    try {
      const response = await axiosApi.delete(`tasks/${id}`);
      thunkAPI.dispatch(fetchTasksByUsedId());
      return response.data.tasks;
    //   console.log(response);

    } catch (err: any | undefined) {
      return err.masssage;
    }
});  

// deleteTask: ( state, {payload}: PayloadAction<string>) => {    
//     state.tasks = state.tasks.filter((task) => payload !== task.id);    
// },



interface tasksState {
    tasks: [];
    statusFetch:  'loading' | 'succeeded' | 'failed' | 'idle' ;
    statusUpdate:  'loading' | 'succeeded' | 'failed' | 'idle' ;
    statusDelete :  'loading' | 'succeeded' | 'failed' | 'idle';
    statusCreate :  'loading' | 'succeeded' | 'failed' | 'idle';
}

const initialState : tasksState = {
    tasks: [],
    statusFetch:  'idle',
    statusDelete: 'idle',
    statusUpdate: 'idle',
    statusCreate : 'idle'
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
        .addCase(updateTasks.pending, (state,action) => {
            state.statusUpdate = 'loading'
        })
        .addCase(updateTasks.fulfilled, (state, action) => {
            state.statusUpdate = "succeeded"
        })
        .addCase(updateTasks.rejected, (state, action) => {
            state.statusUpdate = 'failed'
            
        })
        .addCase(createTasks.pending, (state,action) => {
            state.statusCreate = 'loading'
        })
        .addCase(createTasks.fulfilled, (state, action) => {
            state.statusCreate = "succeeded"
        })
        .addCase(createTasks.rejected, (state, action) => {
            state.statusCreate = 'failed'
            
        })
    }
});

export default tasksSlice.reducer;