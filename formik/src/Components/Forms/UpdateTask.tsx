import React, { FormEvent } from "react";

interface UpdateFormProps {
  taskId: string;
  valueTitle: string;
  valueDescription: string;
  buttonText: string;
  editForm?: boolean;
  createForm?: boolean;
  onChangeHandler: (e : React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler:  (e:  React.FormEvent<HTMLFormElement>) => void;
}

const UpdateTask = ({
  taskId,
  valueTitle,
  valueDescription,
  onChangeHandler,
  onSubmitHandler,
  buttonText,
  editForm,
  createForm
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
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default UpdateTask;
