import { useState } from "react";
import { useLocation } from "react-router-dom";
import { createEmployee } from "../api/data";

const AddEmployee = ({ isSubmited, isClosed }) => {
  const [submited, setIsSubmited] = useState(false);
  const [closed, setIsClosed] = useState(false);

  const location = useLocation();

  isSubmited(submited);
  isClosed(closed);

  const submitHandler = e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name").trim();
    const birthday = formData.get("birthday").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const salary = formData.get("salary").trim();
    const image = formData.get("image").trim();

    const data = {
      name,
      birthday,
      email,
      phone,
      salary,
      image,
      completedTasks: 0,
    };

    try {
      if (
        name === "" ||
        birthday === "" ||
        email === "" ||
        phone === "" ||
        salary === ""
      ) {
        throw new Error("No Empty Fields!");
      }

      createEmployee(data);
      setIsSubmited(true);
      e.target.reset();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="back-btn">
        <a href={location.pathname == "/employees" ? "/employees" : "/"}>
          <img src="https://img.icons8.com/bubbles/512/cancel--v2.png" />
        </a>
      </div>
      <div class="form-container">
        <div class="brand-logo"></div>
        <div class="brand-title">NEW EMPLOYEE</div>
        <div class="inputs">
          <form onSubmit={submitHandler}>
            <label>FULL NAME</label>
            <input type="text" name="name" placeholder="Full Name" />
            <label>BIRTHDAY</label>
            <input type="date" name="birthday" placeholder="Birthday" />
            <label>EMAIL</label>
            <input type="email" name="email" placeholder="Email" />
            <label>PHONE NUMBER</label>
            <input type="number" name="phone" placeholder="Phone Number" />
            <label>MONTHLY SALARY</label>
            <input type="number" name="salary" placeholder="Monthly Salary" />
            <label>IMAGE</label>
            <input type="text" name="image" placeholder="Image Url" />
            <div className="btn-container">
              <button type="submit">ADD EMPLOYEE</button>
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
    </>
  );
};

export default AddEmployee;
