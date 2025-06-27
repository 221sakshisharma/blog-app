import AuthLayout from '../layout/AuthLayout';
import {LoginForm} from '../components';

const Login = () => {
  return (
    <AuthLayout
      title="Welcome Back!"
      description="Log in to continue your journey."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;