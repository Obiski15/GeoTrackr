import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useSignup } from "../../services/auth/useSignup";

import LoginSignUpButton from "../../ui/components/LoginSignUpButton";
import { Form, FormLayout } from "../../ui/layouts/Auth";
import ImageUpload from "../../ui/components/ImageUpload";
import FormInput from "../../ui/components/FormInput";
import Heading from "../../ui/components/Heading";

function SignUpForm() {
  const navigate = useNavigate();
  const { isLoading, mutate: signupUser } = useSignup();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const formValues = { ...data, image: data.image?.[0] };
    signupUser(formValues, {
      onSuccess: () => {
        toast.success("Account created Successfully. redirecting....");
        navigate("/auth/login");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h3" align="center">
        Welcome, Let&apos;s Get You SIgned Up
      </Heading>

      <Form>
        <FormInput
          label="email"
          name="email"
          placeholder="e.g. Obiski15@gmail.com"
          type="text"
          register={{
            ...register("email", {
              required: "Email field is required",
            }),
          }}
          error={errors?.email?.message}
        />
        <FormInput
          label="Username"
          name="username"
          placeholder="e.g. Obiski"
          type="text"
          register={{
            ...register("username", {
              required: "Username field is required",
              minLength: {
                value: 5,
                message: "Minimum Username Length is 5",
              },
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
              required: "Password field is required",
              minLength: {
                value: 8,
                message: "Minimum Password Length is 8",
              },
            }),
          }}
          error={errors?.password?.message}
        />
        <FormInput
          label="Confirm Password"
          name="confirm password"
          placeholder="Confirm Password"
          type="password"
          register={{
            ...register("confirmPassword", {
              required: "Kindly confirm your password",
              minLength: {
                value: 8,
                message: "Minimum Password length is 8",
              },
              validate: (value, formValues) =>
                value === formValues.password || "Password doesn't match",
            }),
          }}
          error={errors?.confirmPassword?.message}
        />
        <ImageUpload
          register={{
            ...register("image"),
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
          disabled={isLoading}
        >
          Sign Up
        </LoginSignUpButton>
      </Form>
    </FormLayout>
  );
}

export default SignUpForm;
