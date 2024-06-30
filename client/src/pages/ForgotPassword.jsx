import ForgotPasswordForm from "../features/authentication/ForgotPasswordForm";

import AuthPageLayout from "../ui/AuthPageLayout";
import Header from "../ui/Header";

function ForgotPassword() {
  return (
    <AuthPageLayout>
      <Header />
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}

export default ForgotPassword;
