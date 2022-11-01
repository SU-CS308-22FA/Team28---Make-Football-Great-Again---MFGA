import React, {useState} from "react";
import axios from "axios";
import { NavLink } from "reactstrap";

export const Register = () => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const registered = {
      ...values,
      [name]: value,
    }

      axios.post("http://localhost:4000/signup", registered)
      .then((response) => console.log(response.data));

    setValues({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <div className="container">
        <div className="form-div">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
              name="name"
              value={values.name}
              className="form-control form-group"
            />

            <input
              type="text"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={values.email}
              className="form-control form-group"
            />

            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={values.password}
              className="form-control form-group"
            />

            <input
              type="text"
              placeholder="Username"
              onChange={handleChange}
              name="username"
              value={values.username}
              className="form-control form-group"
            />

            <input
              type="submit"
              className="btn btn-danger btn-block"
              value="Submit"
            />
            <NavLink active href="/login">Login</NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};