import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useLogin } from "../../services/auth/useLogin";

import LoginSignUpButton from "../../ui/components/LoginSignUpButton";
import { Form, FormLayout } from "../../ui/layouts/Auth";
import FormInput from "../../ui/components/FormInput";
import Heading from "../../ui/components/Heading";

function LoginForm() {
  const { loginUser, isLoading } = useLogin();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    loginUser(data, {
      onSuccess: () => {
        toast.success("Login Successfull. redirecting...");
        navigate("/");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h3" align="center">
        Welcome, Please Log In
      </Heading>

      <Form>
        <FormInput
          label="Username"
          name="username"
          placeholder="Enter Username or Password"
          type="text"
          register={{
            ...register("email", {
              required: "Kindly Provide Your Email or Username",
            }),
          }}
          error={errors?.email?.message}
        />
        <FormInput
          label="Password"
          name="password"
          placeholder="Input Password"
          type="password"
          register={{
            ...register("password", {
              required: "password field is required",
              minLength: {
                value: 8,
                message: "Minimum Password Length is 8",
              },
            }),
          }}
          error={errors?.password?.message}
        />
        <LoginSignUpButton disabled={isLoading}>Login</LoginSignUpButton>
      </Form>
    </FormLayout>
  );
}

export default LoginForm;
