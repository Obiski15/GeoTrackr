import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import LoginSignUpButton from "../../ui/LoginSignUpButton";
import AuthFormLayout from "../../ui/AuthFormLayout";
import ImageUpload from "../../ui/ImageUpload";
import FormInput from "../../ui/FormInput";
import Heading from "../../ui/Heading";

function SignUpForm() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  function onSubmit(data) {
    console.log("signed up", data);
    reset();
  }

  return (
    <AuthFormLayout onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h3" align="center">
        Welcome, Let&apos;s Get You SIgned Up
      </Heading>
      <FormInput
        label="Username"
        name="username"
        placeholder="Input Username"
        type="text"
        register={{
          ...register("username", {
            required: "Username is required",
            minLength: { value: 5, message: "min length is 6" },
          }),
        }}
        error={errors?.username?.message}
      />
      <FormInput
        label="Password"
        name="password"
        placeholder="Input Password"
        type="password"
        register={{
          ...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "min value is 6" },
          }),
        }}
        error={errors?.password?.message}
      />
      <FormInput
        label="Confrim Password"
        name="confirm password"
        placeholder="Confirm Password"
        type="password"
        register={{
          ...register("confirmPassword", {
            required: "Password is Required",
            validate: (value) =>
              value === getValues().password || "Password doesn't match",
          }),
        }}
        error={errors?.confirmPassword?.message}
      />
      <ImageUpload
        register={{
          ...register("userPhoto"),
        }}
        label="Upload Image"
      />
      <LoginSignUpButton
        additionalContext={{
          text: "Already have an account?",
          extras: [
            { actionText: "Log In", action: () => navigate("/auth/login") },
            {
              actionText: "Forgot Password",
              action: () => navigate("/auth/resetpassword"),
            },
          ],
        }}
      >
        Sign Up
      </LoginSignUpButton>
    </AuthFormLayout>
  );
}

export default SignUpForm;
