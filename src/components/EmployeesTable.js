import { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { getEmployees } from "../api/data";
import { BsSortDown, BsSortUpAlt } from "react-icons/bs";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";
import EmployeeProfile from "./EmployeeProfile";

const EmployeesTable = ({ isEmployeeProfileDisplayed }) => {
  const [employees, setEmployees] = useState([]);
  const [showEmployeesTable, setShowEmployeesTable] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  const [rowData, setRowData] = useState({});

  isEmployeeProfileDisplayed(showEmployeeProfile);

  const submitHandlerNotifier = submited => {
    if (submited) {
      setShowForm(false);
      setShowEditForm(false);
      setShowDeleteForm(false);
      setShowButton(true);
      setShowEmployeesTable(true);
      getData();
    }
  };

  const closeHandler = closed => {
    if (closed) {
      setShowForm(false);
      setShowEditForm(false);
      setShowDeleteForm(false);
      setShowButton(true);
      setShowEmployeesTable(true);
    }
  };

  const editHandler = rowData => {
    setShowEditForm(!showEditForm);

    setRowData(rowData);
  };

  const deleteHandler = rowData => {
    setShowDeleteForm(!showDeleteForm);

    setRowData(rowData);
  };

  const employeeProfileHanlder = rowData => {
    setShowEmployeeProfile(!showEmployeeProfile);

    setRowData(rowData);
  };

  const getData = async () => {
    const data = await getEmployees();

    if (data === null || data === undefined) {
      setEmployees([]);
      return;
    }

    setEmployees(Object.values(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const data = useMemo(() => [...employees], [employees]);

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
        Header: "Full Name",
        accessor: "name",
      },
      {
        Header: "Birth Date",
        accessor: "birthday",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        Header: "Monthly Salary",
        accessor: "salary",
      },
      {
        Header: "Completed Tasks",
        accessor: "completedTasks",
        id: "top5",
      },
      {
        Header: "Action",
        accessor: (originalRow, rowIndex) => (
          <div className="employees-table-btns">
            <a
              href="#details"
              title="Details"
              onClick={() => {
                employeeProfileHanlder(originalRow);
                setShowButton(!showButton);
                setShowEmployeesTable(!showEmployeesTable);
              }}>
              <img
                id={originalRow._id}
                src="https://img.icons8.com/bubbles/512/info.png"></img>
            </a>

            <a
              href="#"
              title="Edit"
              onClick={() => {
                editHandler(originalRow);
                setShowButton(!showButton);
                setShowEmployeesTable(!showEmployeesTable);
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
                setShowEmployeesTable(!showEmployeesTable);
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
    employees
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: [
            {
              id: "top5",
              desc: true,
            },
          ],
        },
      },
      useSortBy
    );

  if (employees.length === 0) {
    return (
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div className="table-form-ctr">
      {showEmployeesTable && (
        <>
          <h1>Employees</h1>
          <h2>Top 5</h2>
          <div className="container">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}>
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <BsSortDown />
                            ) : (
                              <BsSortUpAlt />
                            )
                          ) : (
                            ""
                          )}
                        </span>
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
                        <td {...cell.getCellProps()}>
                          {" "}
                          {cell.render("Cell")}{" "}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      {showButton && (
        <button
          onClick={() => {
            setShowForm(!showForm);
            setShowButton(!showButton);
            setShowEmployeesTable(!showEmployeesTable);
          }}>
          Add Employee
        </button>
      )}
      {showForm && (
        <AddEmployee
          isSubmited={submitHandlerNotifier}
          isClosed={closeHandler}
        />
      )}
      {showEditForm && (
        <EditEmployee
          isSubmited={submitHandlerNotifier}
          isClosed={closeHandler}
          rowData={rowData}
        />
      )}
      {showDeleteForm && (
        <DeleteEmployee
          isSubmited={submitHandlerNotifier}
          isClosed={closeHandler}
          rowData={rowData}
        />
      )}
      {showEmployeeProfile && <EmployeeProfile rowData={rowData} />}
    </div>
  );
};

export default EmployeesTable;
