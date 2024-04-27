import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
  });

  const [editMode, setEditMode] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
  };

  return (
    <div className="App">
      <h1>User Profile</h1>
      <form>
        <label>
          Name:
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.name}</span>
          )}
        </label>
        <br />
        <label>
          Email:
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.email}</span>
          )}
        </label>
        <br />
        <label>
          Interest:
          {editMode ? (
            <input
              type="text"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
            />
          ) : (
            <span>{formData.interest}</span>
          )}
        </label>
        <br />
        <button type="button" onClick={toggleEditMode}>
          {editMode ? "View" : "Edit"}
        </button>
      </form>
    </div>
  );
}

export default App;
