import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useResetPassword } from "../../services/auth/useResetPassword";

import { Form, FormLayout } from "../../ui/layouts/Auth";
import FormInput from "../../ui/components/FormInput";
import Heading from "../../ui/components/Heading";
import Button from "../../ui/components/Button";

const SubmitButtonWrapper = styled.div`
  width: 100%;

  & button {
    width: 100%;
    padding: 1rem;
  }
`;

function ResetPasswordForm() {
  const { resetPassword, isLoading } = useResetPassword();
  const navigate = useNavigate();
  const params = useParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    resetPassword(
      {
        ...data,
        resetToken: params.resetToken,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successfully. redirecting...");
          navigate("/auth/login");
        },

        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  }

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h3" align="center">
        Welcome, Let&apos;s Get You Back In
      </Heading>

      <Form>
        <FormInput
          label="New Password"
          name="password"
          placeholder="Input New Password"
          type="password"
          register={{
            ...register("password", {
              required: "password field cannot be empty",
              minLength: {
                value: 8,
                message: "Minimum Password Length is 8",
              },
            }),
          }}
          error={errors?.password?.message}
        />
        <FormInput
          label="Confrim Password"
          name="confirm password"
          placeholder="Confirm New Password"
          type="password"
          register={{
            ...register("confirmPassword", {
              required: "kindly confirm provided password",
              minLength: {
                value: 8,
                message: "Minimum Password Length is 8",
              },
              validate: (value, formValues) =>
                value === formValues.password || "Password doesn't match",
            }),
          }}
          error={errors?.confirmPassword?.message}
        />
        <SubmitButtonWrapper>
          <Button type="auth" disabled={isLoading}>
            Reset Password
          </Button>
        </SubmitButtonWrapper>
      </Form>
    </FormLayout>
  );
}

export default ResetPasswordForm;
