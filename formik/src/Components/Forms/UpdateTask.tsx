import React, { FormEvent } from "react";

interface UpdateFormProps {
  taskId: string;
  valueTitle: string;
  valueDescription: string;
  onChangeHandler: (e : React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler:  (e:  React.FormEvent<HTMLFormElement>) => void;
}

const UpdateTask = ({
  taskId,
  valueTitle,
  valueDescription,
  onChangeHandler,
  onSubmitHandler,
}: UpdateFormProps) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <input
        value={valueTitle}
        id="title"
        name="title"
        autoComplete="off"
        placeholder="Title"
        type="text"
        onChange={onChangeHandler}
      />
      <input
        value={valueDescription}
        id="description"
        name='description'
        autoComplete="off"
        placeholder="Description"
        type="text"
        onChange={onChangeHandler}
      />
      <button type="submit">Edit Task</button>
    </form>
  );
};

export default UpdateTask;
