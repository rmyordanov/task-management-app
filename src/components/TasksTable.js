import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { getEmployees, getTasks, editTask } from "../api/data";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import CreateTask from "./CreateTask";

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showTasksTable, setShowTasksTable] = useState(true);
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [showDeleteTaskForm, setShowDeleteTaskForm] = useState(false);
  const [rowData, setRowData] = useState({});

  const submitHandlerNotifier = submited => {
    if (submited) {
      setShowCreateTaskForm(false);
      setShowEditTaskForm(false);
      setShowDeleteTaskForm(false);
      setShowButton(true);
      setShowTasksTable(true);
      getData();
    }
  };

  const closeHandler = closed => {
    if (closed) {
      setShowCreateTaskForm(false);
      setShowEditTaskForm(false);
      setShowDeleteTaskForm(false);
      setShowButton(true);
      setShowTasksTable(true);
    }
  };

  const editHandler = rowData => {
    setShowEditTaskForm(!showEditTaskForm);

    setRowData(rowData);
  };

  const deleteHandler = rowData => {
    setShowDeleteTaskForm(!showDeleteTaskForm);

    setRowData(rowData);
    getData();
  };

  const getData = async () => {
    const data = await getTasks();
    const employeesData = await getEmployees();

    if (data === null || data === undefined) {
      setTasks([]);
      return;
    }

    if (employeesData === null || employeesData === undefined) {
      setEmployees([]);
      return;
    }

    setEmployees(Object.values(employeesData));
    setTasks(Object.values(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const data = useMemo(() => [...tasks], [tasks]);

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
        accessor: "title",
      },
      {
        Header: "Task Description",
        accessor: "description",
      },
      {
        Header: "Assignee",
        accessor: "assignee",
      },
      {
        Header: "Due Date",
        accessor: "due",
      },
      {
        Header: "Status",
        accessor: "status",
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

      {
        Header: "Action",
        accessor: (originalRow, rowIndex) => (
          <div className="employees-table-btns">
            <a
              href="#"
              title="Edit"
              onClick={() => {
                editHandler(originalRow);
                setShowButton(!showButton);
                setShowTasksTable(!showTasksTable);
              }}>
              <img
                id={originalRow._id}
                src="https://img.icons8.com/bubbles/512/edit.png"></img>
            </a>
            <a
              href="#"
              title="Delete"
              onClick={() => {
                deleteHandler(originalRow);
                setShowButton(!showButton);
                setShowTasksTable(!showTasksTable);
              }}>
              <img
                id={originalRow._id}
                src="https://img.icons8.com/bubbles/512/trash.png"></img>
            </a>
          </div>
        ),
        id: "action",
      },
    ],
    tasks
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  if (tasks.length === 0) {
    return (
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div className="table-form-ctr">
      <h2>Tasks</h2>
      {showTasksTable && (
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
      )}
      {showButton && (
        <button
          onClick={() => {
            setShowCreateTaskForm(!showCreateTaskForm);
            setShowButton(!showButton);
            setShowTasksTable(!showTasksTable);
          }}>
          Add Task
        </button>
      )}
      {showCreateTaskForm && (
        <CreateTask
          employees={employees}
          isSubmited={submitHandlerNotifier}
          isClosed={closeHandler}
        />
      )}
      {showEditTaskForm && (
        <EditTask
          isSubmited={submitHandlerNotifier}
          isClosed={closeHandler}
          rowData={rowData}
          employees={employees}
        />
      )}
      {showDeleteTaskForm && (
        <DeleteTask
          isSubmited={submitHandlerNotifier}
          isClosed={closeHandler}
          rowData={rowData}
        />
      )}
    </div>
  );
};

export default TasksTable;
