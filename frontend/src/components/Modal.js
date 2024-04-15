import React, { useState } from "react";
import "../App.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      userID: "",
      message: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.userID && formState.message) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formState);
    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="userID">User ID</label>
            <textarea
             name="userID"
             onChange={handleChange}
             value={formState.userID} />
          </div>
          <div className="form-group">
            <label htmlFor="Message">Message</label>
            <textarea
              name="message"
              onChange={handleChange}
              value={formState.message}
            />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <div className="addbtn-container">
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};