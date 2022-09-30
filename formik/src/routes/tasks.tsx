import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksByUsedId, deleteTasks } from "../store/slices/tasksSlice";
import { RootState } from "../store/store";

const Tasks = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
  const tasks = useSelector((state: RootState) => state.tasksSlice.tasks);
  const status = useSelector((state: RootState) => state.tasksSlice.status);

  useEffect(() => {
    dispatch(fetchTasksByUsedId());
    console.log(tasks);
  }, []);

  const handleDeleteTask = (id:string) => {
   
        dispatch(deleteTasks(id));
        if(status === 'deleted'){
            dispatch(fetchTasksByUsedId());
       }  
  }

  const hadleLogout = () => {
    
  }

  interface Task {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
  }

  return (
    <div>
       <button onClick={hadleLogout}>Logout</button>
      {tasks.map((task: Task) => {
        return (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => handleDeleteTask(task.id)}>X</button>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
