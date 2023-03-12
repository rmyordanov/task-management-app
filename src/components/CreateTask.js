import { useState, useEffect } from "react";
import { createTask } from "../api/data";

const CreateTask = ({ employees, isSubmited, isClosed }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [submited, setIsSubmited] = useState(false);
  const [closed, setIsClosed] = useState(false);

  isSubmited(submited);
  isClosed(closed);

  useEffect(() => {
    setSelectedEmployeeId(selectedEmployeeId);
    setSelectedEmployee(selectedEmployee);
  }, [selectedEmployeeId, selectedEmployee]);

  const submitHandler = e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const employeeId = formData.get("employeeId").trim();
    const due = formData.get("due").trim();

    const data = {
      title,
      description,
      employeeId,
      assignee: selectedEmployee,
      isCompleted: false,
      status: "",
      due,
    };

    try {
      if (
        title === "" ||
        description === "" ||
        employeeId === "" ||
        due === ""
      ) {
        throw new Error("No Empty Fields!");
      }

      createTask(data);
      setIsSubmited(true);
      e.target.reset();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div class="form-container">
      <div class="brand-logo"></div>
      <div class="brand-title">CREATE TASK</div>
      <div class="inputs">
        <form onSubmit={submitHandler}>
          <label>TITLE</label>
          <input type="text" name="title" placeholder="Task Title" />
          <label>DESCRIPTION</label>
          <input
            type="text"
            name="description"
            placeholder="Task Description"
          />
          <label>ASSIGNEE</label>
          <select
            name="employeeId"
            onChange={e => {
              setSelectedEmployeeId(e.target.value);
              setSelectedEmployee(
                e.target.options[e.target.selectedIndex].text
              );
            }}>
            <option value="0">Select Employee</option>
            {employees.map(employee => (
              <option value={employee._id}>{employee.name}</option>
            ))}
          </select>
          <label>DUE DATE</label>
          <input type="date" name="due" />
          <div className="btn-container">
            <button type="submit">CREATE TASK</button>
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

export default CreateTask;
