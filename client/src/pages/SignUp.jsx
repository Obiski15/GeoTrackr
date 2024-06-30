import SignUpForm from "../features/authentication/SignUpForm";

import AuthPageLayout from "../ui/AuthPageLayout";
import Header from "../ui/Header";

function SignUp() {
  return (
    <AuthPageLayout>
      <Header />
      <SignUpForm />
    </AuthPageLayout>
  );
}

export default SignUp;
