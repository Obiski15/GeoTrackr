import ResetPasswordForm from "../features/authentication/ResetPasswordForm";

import { PageLayout, Wrapper } from "../ui/layouts/Auth";
import Header from "../ui/components/Header";

function ResetPassword() {
  return (
    <Wrapper>
      <PageLayout>
        <Header />
        <ResetPasswordForm />
      </PageLayout>
    </Wrapper>
  );
}

export default ResetPassword;
