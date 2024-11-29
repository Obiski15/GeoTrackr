import LoginForm from "../features/authentication/LoginForm";

import { PageLayout, Wrapper } from "../ui/layouts/Auth";
import Header from "../ui/components/Header";

function Login() {
  return (
    <Wrapper>
      <PageLayout>
        <Header />
        <LoginForm />
      </PageLayout>
    </Wrapper>
  );
}

export default Login;
