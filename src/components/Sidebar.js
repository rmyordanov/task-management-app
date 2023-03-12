import { useState } from "react";
import { FaTh, FaUserAlt, FaRegChartBar, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function changeLocation(placeToGo) {
    navigate(placeToGo, { replace: true });
    window.location.reload();
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/employees",
      name: "Employees",
      icon: <FaUserAlt />,
    },
    {
      path: "/tasks",
      name: "Tasks",
      icon: <FaRegChartBar />,
    },
  ];
  return (
    <div className="sidebar-container">
      <div
        style={{ width: isOpen ? "250px" : "50px" }}
        className="sidebar frosted_2">
        <div className="top-section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            LOGO
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
            onClick={() => {
              console.log(item.path);
              if (item.path == "/") {
                changeLocation("/");
              }
            }}>
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link-text">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
