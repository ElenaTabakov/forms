import React , {useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksByUsedId } from "../store/slices/tasksSlice";
import { RootState } from "../store/store";

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasksSlice.tasks);
  const status = useSelector((state: RootState) => state.tasksSlice.status);

  useEffect(() => {
    dispatch(fetchTasksByUsedId());
        console.log(tasks);
  }, [tasks ])

  interface Task {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
}

  return <div>{tasks.map((task : Task) => {return <p>{task.id}</p>})}
          </div>;
};

export default Tasks;
