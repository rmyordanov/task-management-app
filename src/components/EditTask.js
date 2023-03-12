import { useState, useEffect } from "react";
import { editTask } from "../api/data";

const EditTask = ({ isSubmited, isClosed, rowData, employees }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(rowData._id);
  const [selectedEmployee, setSelectedEmployee] = useState(rowData.assignee);
  const [submited, setIsSubmited] = useState(false);
  const [closed, setIsClosed] = useState(false);

  isSubmited(submited);
  isClosed(closed);

  useEffect(() => {
    setSelectedEmployeeId(selectedEmployeeId);
    setSelectedEmployee(selectedEmployee);
  }, [selectedEmployeeId, selectedEmployee]);

  console.log(selectedEmployee);

  const submitHandler = e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const due = formData.get("due").trim();

    const data = {
      title,
      description,
      employeeId: selectedEmployeeId,
      assignee: selectedEmployee,
      isCompleted: false,
      due,
    };

    try {
      if (title === "" || description === "" || due === "") {
        throw new Error("No Empty Fields!");
      }

      editTask(rowData._id, data);
      setIsSubmited(true);
      e.target.reset();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div class="form-container">
      <div class="brand-logo"></div>
      <div class="brand-title">EDIT TASK</div>
      <div class="inputs">
        <form onSubmit={submitHandler}>
          <label>TITLE</label>
          <input type="text" name="title" defaultValue={rowData.title} />
          <label>DESCRIPTION</label>
          <input
            type="text"
            name="description"
            defaultValue={rowData.description}
          />
          <label>ASSIGNEE</label>
          <select
            name="employeeId"
            onChange={e => {
              setSelectedEmployeeId(e.target.value);
              setSelectedEmployee(
                e.target.options[e.target.selectedIndex].text
              );
            }}
            defaultValue={rowData.assignee}>
            <option value={rowData._id}>{rowData.assignee}</option>
            {employees.map(employee => (
              <option value={employee._id}>{employee.name}</option>
            ))}
          </select>
          <label>DUE DATE</label>
          <input type="date" name="due" defaultValue={rowData.due} />

          <div className="btn-container">
            <button type="submit">EDIT</button>
            <button
              onClick={() => {
                setIsClosed(true);
              }}>
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
