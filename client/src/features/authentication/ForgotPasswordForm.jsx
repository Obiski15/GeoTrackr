import { useForm } from "react-hook-form";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useForgotPassword } from "../../services/auth/useForgotPassword";

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

function ForgotPasswordForm() {
  const { isLoading, mutate } = useForgotPassword();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    mutate(data.email, {
      onSuccess: () => {
        toast.success("Reset Link sent! Check Inbox to reset password");
      },

      onError: (err) => {
        toast.err(err.message);
      },
    });
  }

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h3" align="center">
        Welcome, Let&apos;s Get You Back In
      </Heading>

      <Form>
        <FormInput
          label="Email Address"
          name="email"
          placeholder="Enter Your Email Address"
          type="email"
          register={{
            ...register("email", {
              required: {
                value: true,
                message: "Please provide a valid email address",
              },
            }),
          }}
          error={errors?.email?.message}
        />
        <SubmitButtonWrapper>
          <Button type="auth" disabled={isLoading}>
            Submit
          </Button>
        </SubmitButtonWrapper>
      </Form>
    </FormLayout>
  );
}

export default ForgotPasswordForm;
