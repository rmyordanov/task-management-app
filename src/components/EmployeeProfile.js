import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { useLocation } from "react-router-dom";
import { editEmployee, editTask, getTasks } from "../api/data";

const EmployeeProfile = ({ rowData }) => {
  const [employee, setEmployee] = useState(rowData);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const employeeTasks = tasks.filter(e => e.employeeId === rowData._id);

  let completed = 0;
  let inProgress = 0;

  employeeTasks.forEach(e => {
    if (e.status === "Completed") {
      completed++;
    }
    if (e.status === "In Progress") {
      inProgress++;
    }
  });

  editEmployee(rowData._id, { completedTasks: completed });

  const getData = async () => {
    const data = await getTasks();

    if (data === null || data === undefined) {
      setTasks([]);
      return;
    }

    setTasks(Object.values(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const data = useMemo(() => [...employeeTasks], [employeeTasks]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "",
        Cell: row => {
          return <div>{+row.row.id + 1}</div>;
        },
      },
      {
        Header: "Task Title",
        accessor: `title`,
      },
      {
        Header: "Task Description",
        accessor: `description`,
      },
      {
        Header: "Status",
        accessor: `status`,
      },
      {
        Header: "Due Date",
        accessor: "due",
      },

      {
        Header: "Change Status",
        accessor: "",
        Cell: () => {
          return (
            <select
              onChange={e => {
                const rowId = e.target.parentNode.parentNode.id;
                const status = e.target.value;
                editTask(rowId, { status: status });
                getData();
              }}>
              <option>Select</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          );
        },
      },
    ],
    employeeTasks
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <>
      <div>
        <div className="back-btn">
          <a href={location.pathname == "/employees" ? "/employees" : "/"}>
            <img src="https://img.icons8.com/bubbles/512/cancel--v2.png" />
          </a>
        </div>
        <h1>{employee.name}</h1>
      </div>
      <div className="employee-profile">
        <div className="employee-img">
          <img src={employee.image} />
        </div>
        <div className="employee-info">
          <div className="field">
            <div className="employee-name">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                defaultValue={employee.name}
                readOnly
              />
            </div>
            <div className="employee-birthday">
              <label>Birthday:</label>
              <input
                type="date"
                name="birthday"
                defaultValue={employee.birthday}
                readOnly
              />
            </div>
          </div>
          <div className="field">
            <div className="employee-email">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                defaultValue={employee.email}
                readOnly
              />
            </div>
            <div className="employee-phone">
              <label>Phone Number:</label>
              <input
                type="number"
                name="phone"
                defaultValue={employee.phone}
                readOnly
              />
            </div>
          </div>

          <div className="field">
            <div className="employee-completed">
              <label>Completed Tasks:</label>
              <input
                type="number"
                name="completed"
                value={completed}
                readOnly
              />
            </div>
            <div className="employee-progress">
              <label>Tasks In Progress:</label>
              <input
                type="number"
                name="progress"
                value={inProgress}
                readOnly
              />
            </div>
          </div>
          <div className="employee-salary">
            <label>Salary:</label>
            <input
              type="number"
              name="salary"
              defaultValue={employee.salary}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="employee-task-table">
        <div className="container">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr id={row.original._id} {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
