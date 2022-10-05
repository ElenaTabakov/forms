import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdateTask from "../Components/Forms/UpdateTask";
import { fetchTasksByUsedId, deleteTasks, updateTasks } from "../store/slices/tasksSlice";
import { RootState } from "../store/store";

const Tasks = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
  const tasks = useSelector((state: RootState) => state.tasksSlice.tasks);
  const statusDelete = useSelector(
    (state: RootState) => state.tasksSlice.statusDelete
  );

  const [editFormOpen, setEditFormOpen] = useState<boolean>(false);
 
  useEffect(() => {
    dispatch(fetchTasksByUsedId());
    console.log(tasks);
  }, []);

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTasks(id));
  };

  //   useEffect(() => {
  //     statusDelete === "succeeded" && dispatch(fetchTasksByUsedId());
  //   }, [statusDelete]);

  const hadleLogout = () => {};

  interface Task {
    id: string;
    title: string;
    description: string;
  }

  const [editTaskValue , setEditTaskValue] = useState<Task>({ id: '', title: '', description: ''})

  const handleOpenForm = ({id , title, description} : Task ) => {
     setEditFormOpen(true)
     setEditTaskValue({id,title,description})
  }
  const handleChangeTaskValue = (e : React.ChangeEvent<HTMLInputElement>) => {
    
        setEditTaskValue({
            ...editTaskValue,
            [e.target.name] : e.target.value
        })
  };
  const hadleEditTask = (e : any) => {
    e.preventDefault();
    console.log(editTaskValue)
    dispatch(updateTasks({
        id: editTaskValue.id, title: editTaskValue.title, description: editTaskValue.description,
    }))
  };

  
  return (
    <div>
      <button onClick={hadleLogout}>Logout</button>

      {editFormOpen && (
        <UpdateTask
          taskId={editTaskValue.id}
          valueTitle={editTaskValue.title}
          valueDescription={editTaskValue.description}
          onChangeHandler={handleChangeTaskValue}
          onSubmitHandler={hadleEditTask}
        />
      )}
      {tasks.map((task: Task) => {
        return (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => handleDeleteTask(task.id)}>X</button>
            <button onClick={() => handleOpenForm({id: task.id, title: task.title, description: task.description})}>
              Edit Task
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
