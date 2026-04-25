import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schema
const schema = yup.object().shape({
  username: yup.string().when("isSignup", {
    is: true,
    then: yup.string().required("Username is required"),
  }),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users from JSON file (mock database)
  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (isSignup) {
      // Register user
      const userExists = users.some((user) => user.email === data.email);
      if (userExists) {
        setMessage("User already exists! Please log in.");
      } else {
        const newUser = { username: data.username, email: data.email, password: data.password };
        setUsers([...users, newUser]); // Updating local state (mock)
        console.log("User registered:", newUser);
        setMessage("Registration successful! You can now log in.");
        setIsSignup(false);
      }
    } else {
      // Login user
      const user = users.find((user) => user.email === data.email && user.password === data.password);
      if (user) {
        setMessage(`Welcome, ${user.username || "User"}!`);
      } else {
        setMessage("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>{isSignup ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSignup && (
          <div>
            <input type="text" placeholder="Username" {...register("username")} />
            <p>{errors.username?.message}</p>
          </div>
        )}
        <div>
          <input type="email" placeholder="Email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <input type="password" placeholder="Password" {...register("password")} />
          <p>{errors.password?.message}</p>
        </div>
        <button type="submit">{isSignup ? "Register" : "Login"}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "New user? Register"}
      </button>
    </div>
  );
};

export default AuthForm;
