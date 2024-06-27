import { useForm } from "react-hook-form";

import LoginSignUpButton from "../../ui/LoginSignUpButton";
import AuthFormLayout from "../../ui/AuthFormLayout";
import FormInput from "../../ui/FormInput";
import Heading from "../../ui/Heading";

function ForgotPasswordForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  function onSubmit(data) {
    if (!data.username) return;
    console.log("reset conplete", data);
    reset();
  }

  return (
    <AuthFormLayout onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h3" align="center">
        Welcome, Let&apos;s Get You SIgned Up
      </Heading>
      <FormInput
        label="Current Password"
        name="current password"
        placeholder="Input Current Password"
        type="password"
        register={{
          ...register("currentPassword", {
            minLength: { value: 5, message: "min length is 6" },
          }),
        }}
        error={errors?.username?.message}
      />
      <FormInput
        label="New Password"
        name="new password"
        placeholder="Input New Password"
        type="password"
        register={{
          ...register("newPassword", {
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
          ...register("confirmNewPassword", {
            validate: (value) =>
              value === getValues().password || "Password doesn't match",
          }),
        }}
        error={errors?.confirmPassword?.message}
      />
      <LoginSignUpButton>Reset Password</LoginSignUpButton>
    </AuthFormLayout>
  );
}

export default ForgotPasswordForm;
