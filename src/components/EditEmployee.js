import { useState } from "react";
import { editEmployee } from "../api/data";

const EditEmployee = ({ isSubmited, isClosed, rowData }) => {
  const [submited, setIsSubmited] = useState(false);
  const [closed, setIsClosed] = useState(false);

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

      editEmployee(rowData._id, data);
      setIsSubmited(true);
      e.target.reset();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div class="form-container">
      <div class="brand-logo"></div>
      <div class="brand-title">EDIT EMPLOYEE</div>
      <div class="inputs">
        <form onSubmit={submitHandler}>
          <label>FULL NAME</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            defaultValue={rowData.name}
          />
          <label>BIRTHDAY</label>
          <input
            type="date"
            name="birthday"
            placeholder="Birthday"
            defaultValue={rowData.birthday}
          />
          <label>EMAIL</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={rowData.email}
          />
          <label>PHONE NUMBER</label>
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            defaultValue={rowData.phone}
          />
          <label>MONTHLY SALARY</label>
          <input
            type="number"
            name="salary"
            placeholder="Monthly Salary"
            defaultValue={rowData.salary}
          />
          <label>IMAGE</label>
          <input
            type="text"
            name="image"
            placeholder="Image Url"
            defaultValue={rowData.image}
          />
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

export default EditEmployee;
