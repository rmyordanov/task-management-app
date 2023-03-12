import { useState } from "react";
import { deleteTask } from "../api/data";

const DeleteTask = ({ isSubmited, isClosed, rowData }) => {
  const [submited, setIsSubmited] = useState(false);
  const [closed, setIsClosed] = useState(false);

  isSubmited(submited);
  isClosed(closed);

  const deleteHandler = () => {
    deleteTask(rowData._id);

    setIsSubmited(true);
  };

  return (
    <div class="form-container">
      <div class="brand-logo"></div>
      <div class="brand-title">DELETE TASK</div>
      <div class="inputs">
        <h3>Are you sure you want to delete {rowData.title}</h3>
        <div className="btn-container">
          <button type="submit" onClick={deleteHandler}>
            DELETE
          </button>
          <button
            onClick={() => {
              setIsClosed(true);
            }}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
