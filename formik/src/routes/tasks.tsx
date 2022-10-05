import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdateTask from "../Components/Forms/UpdateTask";
import {
  fetchTasksByUsedId,
  deleteTasks,
  updateTasks,
  createTasks,
} from "../store/slices/tasksSlice";
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

  const hadleLogout = () => {};

  interface Task {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    dueDate: Date | null;
    duration: number | null;
    status: string;
  }
  interface TaskFromProps extends Task {
    editForm?: boolean;
  }
  const [editTaskValue, setEditTaskValue] = useState<Task>({
    id: "",
    title: "",
    description: "",
    shortDescription: "",
    dueDate: null,
    duration: null,
    status: "",
  });

  const handleOpenForm = ({
    id,
    title,
    description,
    shortDescription,
    dueDate,
    duration,
    status,
    editForm,
  }: TaskFromProps) => {
    setEditFormOpen(true);
    editForm ? setEditForm(true) : setEditForm(false);
    editForm ? setEditTaskValue({
      id,
      title,
      description,
      shortDescription,
      dueDate,
      duration,
      status,
    }) :  setEditTaskValue({
        id: "",
        title: "",
        description: "",
        shortDescription: "",
        dueDate: null,
        duration: null,
        status: "",
      });
  };
  const handleChangeTaskValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTaskValue({
      ...editTaskValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(editTaskValue);
    dispatch(
      createTasks({
        id: "",
        title: editTaskValue.title,
        description: editTaskValue.description,
        shortDescription: editTaskValue.shortDescription,
        dueDate: new Date(),
        duration: 15,
        status: "UPCOMING",
      })
    );
    setEditFormOpen(false);
    setEditTaskValue({
      id: "",
      title: "",
      description: "",
      shortDescription: "",
      dueDate: null,
      duration: null,
      status: "",
    });
  };
  const hadleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(editTaskValue);
    dispatch(
      updateTasks({
        id: editTaskValue.id,
        title: editTaskValue.title,
        description: editTaskValue.description,
        shortDescription: editTaskValue.shortDescription,
        dueDate: editTaskValue.dueDate,
        duration: editTaskValue.duration,
        status: editTaskValue.status,
      })
    );
    setEditFormOpen(false);
    setEditTaskValue({
      id: "",
      title: "",
      description: "",
      shortDescription: "",
      dueDate: null,
      duration: null,
      status: "",
    });
  };

  return (
    <div>
      <button onClick={hadleLogout}>Logout</button>
      <br />

      <button
        onClick={() =>
          handleOpenForm({
            id: editTaskValue.id,
            title: editTaskValue.title,
            description: editTaskValue.description,
            shortDescription: editTaskValue.shortDescription,
            dueDate: editTaskValue.dueDate,
            duration: editTaskValue.duration,
            status: editTaskValue.status,
            editForm: false,
          })
        }
      >
        Create Task
      </button>
      <br />
      <br />
      {editFormOpen && (
        <UpdateTask
          taskId={editTaskValue.id}
          valueTitle={editTaskValue.title}
          valueDescription ={editTaskValue.description}
          valueShortDesctiption = {editTaskValue.shortDescription}
          valueDate={editTaskValue.dueDate}
          valueDuration={editTaskValue.duration}
          valueStatus={editTaskValue.status}
          onChangeHandler={handleChangeTaskValue}
          onSubmitHandler={editForm ? hadleEditTask : handleCreateTask}
          editForm={false}
          buttonText={editForm ? "Edit Task" : "Create Task"}
        />
      )}
      {tasks.map((task: Task) => {
        return (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => handleDeleteTask(task.id)}>X</button>
            <button
              onClick={() =>
                handleOpenForm({
                  id: task.id,
                  title: task.title,
                  description: task.description,
                  shortDescription: task.shortDescription,
                  dueDate: task.dueDate,
                  duration: task.duration,
                  status: task.status,
                  editForm: true,
                })
              }
            >
              Edit Task
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
