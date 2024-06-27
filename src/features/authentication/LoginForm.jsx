import toast from "react-hot-toast";
import { useState } from "react";

import LoginSignUpButton from "../../ui/LoginSignUpButton";
import AuthFormLayout from "../../ui/AuthFormLayout";
import FormInput from "../../ui/FormInput";
import Heading from "../../ui/Heading";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) return toast.error("fields cannot be empty");

    console.log("logged in", username, password);
  }

  return (
    <AuthFormLayout onSubmit={handleSubmit}>
      <Heading as="h3" align="center">
        Welcome, Please Log In
      </Heading>
      <FormInput
        label="Username"
        name="username"
        placeholder="Input Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormInput
        label="Password"
        name="password"
        placeholder="Input Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginSignUpButton>Login</LoginSignUpButton>
    </AuthFormLayout>
  );
}

export default LoginForm;
