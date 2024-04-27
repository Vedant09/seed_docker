import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    interest: "React Development",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch user data from the API when the component mounts
    axios
      .get("http://127.0.0.1:3009/api/user")
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

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

  const clearData = () => {
    setFormData({
      name: "",
      email: "",
      interest: "",
    });
  };

  const saveData = () => {
    // Send a POST request to update user data
    axios
      .post("http://127.0.0.1:3009/api/user", formData)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
      });
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
          {editMode ? "Save" : "Edit"}
        </button>
        {editMode ? (
          <button type="button" onClick={clearData}>
            Clear
          </button>
        ) : (
          <></>
        )}
        <button type="button" onClick={saveData}>
          Save
        </button>
      </form>
    </div>
  );
}

export default App;
