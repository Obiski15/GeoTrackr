import LoginForm from "../features/authentication/LoginForm";

import AuthPageLayout from "../ui/AuthPageLayout";
import Header from "../ui/Header";

function Login() {
  return (
    <AuthPageLayout>
      <Header />
      <LoginForm />
    </AuthPageLayout>
  );
}

export default Login;
