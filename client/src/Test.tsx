import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

function Test() {
  interface FormData {
    username: string;
    email: string;
    password: string;
    role: string;
  }
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    role: "instructor",
  });

  const [message, setMessage] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users", {
        user: formData,
      });

      if (response.data && response.data.id) {
        setMessage("Signup successful!");
      } else {
        setMessage("Signup failed.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Attempt to use the error message from the server or fallback to the error's default message
        setMessage(`Error: ${error.response.data.message || error.message}`);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}
export default Test;
