import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdateTask from "../Components/Forms/UpdateTask";
import { fetchTasksByUsedId, deleteTasks, updateTasks, createTasks } from "../store/slices/tasksSlice";
import { RootState } from "../store/store";

const Tasks = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
  const tasks = useSelector((state: RootState) => state.tasksSlice.tasks);
  const statusDelete = useSelector(
    (state: RootState) => state.tasksSlice.statusDelete
  );

  const [editFormOpen, setEditFormOpen] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(false);
 
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
    // shortDescription: string;
    // dueDate: 
  }
  interface TaskFromProps extends Task {
    editForm?: boolean;
  }
  const [editTaskValue , setEditTaskValue] = useState<Task>({ id: '', title: '', description: ''})

  const handleOpenForm = ({id , title, description, editForm} : TaskFromProps ) => {
     setEditFormOpen(true);
     editForm ?  setEditForm(true) : setEditForm(false);
     setEditTaskValue({id,title,description})
  }
  const handleChangeTaskValue = (e : React.ChangeEvent<HTMLInputElement>) => {
    
        setEditTaskValue({
            ...editTaskValue,
            [e.target.name] : e.target.value
        })
  };

  const handleCreateTask = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(editTaskValue)
    dispatch(createTasks({
        id: '', title: editTaskValue.title, description: editTaskValue.description,
    }))
    setEditFormOpen(false)
    setEditTaskValue({ id: '', title: '', description: ''})
  };
  const hadleEditTask = (e:  React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    console.log(editTaskValue)
    dispatch(updateTasks({
        id: editTaskValue.id, title: editTaskValue.title, description: editTaskValue.description,
    }))
    setEditFormOpen(false)
    setEditTaskValue({ id: '', title: '', description: ''})
  };

  
  return (
    <div>
      <button onClick={hadleLogout}>Logout</button><br/>
      
      <button onClick={() => handleOpenForm({id:editTaskValue.id, title:editTaskValue.title, description: editTaskValue.description, editForm : false})}>Create Task</button>
 
      {editFormOpen && (
        <UpdateTask
          taskId={editTaskValue.id}
          valueTitle={editTaskValue.title}
          valueDescription={editTaskValue.description}
          onChangeHandler = {handleChangeTaskValue}
          onSubmitHandler = {editForm ? hadleEditTask : handleCreateTask}
          editForm={false}
          buttonText={editForm ? 'Edit Task' : 'Create Task'}
        />
      )}
      {tasks.map((task: Task) => {
        return (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => handleDeleteTask(task.id)}>X</button>
            <button onClick={() => handleOpenForm({id: task.id, title: task.title, description: task.description, editForm : true})}>
              Edit Task
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
