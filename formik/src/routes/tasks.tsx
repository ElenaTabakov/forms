import React , {useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksByUsedId } from "../store/slices/tasksSlice";
import { RootState } from "../store/store";

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasksSlice.tasks);
  const status = useSelector((state: RootState) => state.tasksSlice.status);

//   useEffect(() => {
//         console.log(tasks);
//   }, [])

//   dispatch(fetchTasksByUsedId());

  return <div>{status == "succeeded" && tasks.map((task) => {return <p>{task}</p>}) }</div>;
};

export default Tasks;
