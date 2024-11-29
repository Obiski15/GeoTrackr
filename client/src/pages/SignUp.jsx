import SignUpForm from "../features/authentication/SignUpForm";

import { PageLayout, Wrapper } from "../ui/layouts/Auth";
import Header from "../ui/components/Header";

function SignUp() {
  return (
    <Wrapper>
      <PageLayout>
        <Header />
        <SignUpForm />
      </PageLayout>
    </Wrapper>
  );
}

export default SignUp;
