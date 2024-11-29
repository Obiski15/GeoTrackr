import ForgotPasswordForm from "../features/authentication/ForgotPasswordForm";

import { PageLayout, Wrapper } from "../ui/layouts/Auth";
import Header from "../ui/components/Header";

function ForgotPassword() {
  return (
    <Wrapper>
      <PageLayout>
        <Header />
        <ForgotPasswordForm />
      </PageLayout>
    </Wrapper>
  );
}

export default ForgotPassword;
