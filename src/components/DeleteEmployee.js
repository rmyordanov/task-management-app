import { useState } from "react";
import { deleteEmployee } from "../api/data";

const DeleteEmployee = ({ isSubmited, isClosed, rowData }) => {
  const [submited, setIsSubmited] = useState(false);
  const [closed, setIsClosed] = useState(false);

  isSubmited(submited);
  isClosed(closed);

  const deleteHandler = () => {
    deleteEmployee(rowData._id);

    setIsSubmited(true);
  };

  return (
    <div class="form-container">
      <div class="brand-logo"></div>
      <div class="brand-title">DELETE EMPLOYEE</div>
      <div class="inputs">
        <h3>Are you sure you want to delete {rowData.name}</h3>
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

export default DeleteEmployee;
