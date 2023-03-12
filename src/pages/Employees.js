import { useState } from "react";
import EmployeesTable from "../components/EmployeesTable";

const Employees = () => {
  const [showEmployeeProfile, setShowEmployeeProfile] = useState(false);

  const isEmployeeProfileShown = isShown => {
    if (isShown) {
      setShowEmployeeProfile(!showEmployeeProfile);
    }
  };

  return (
    <div>
      {showEmployeeProfile ? "" : <h1>EMPLOYEES</h1>}
      <EmployeesTable isEmployeeProfileDisplayed={isEmployeeProfileShown} />
    </div>
  );
};

export default Employees;
