import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { login as stateLogin } from '../state/authSlice';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const session = await authService.createAccount(data);
      if (session) {
        dispatch(stateLogin(session));
        navigate('/my-space', { replace: true });
      }
    } catch (err) {
      let message = 'Something went wrong. Please try again.';

      if (err.code === 400) {
        message = 'Password must be between 8 and 256 characters.';
      } else if (err.code === 409) {
        message = 'An account with this email already exists.';
      }

      setError('root.serverError', {
        type: 'manual',
        message,
      });
    }
  };


  return (
    <div className="space-y-4">
      {errors.root?.serverError && <p className="error-text text-center">{errors.root.serverError.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input type="text" placeholder="Full Name" {...register('name', { required: 'Name is required' })} className="input-field" />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>
        <div>
          <input type="text" placeholder="Email" {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } })} className="input-field" />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
        <div>
          <input type="password" placeholder="Password" {...register('password', { required: 'Password is required' })} className="input-field" />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn-primary">Sign Up</button>
      </form>

      <div className="text-center text-gray-500">or</div>

      <button onClick={() => authService.googleLogin()} className="btn-secondary">
        <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="h-6 w-6 mr-2" />
        Sign Up with Google
      </button>

      <div className="text-center mt-4">
        <p className="text-gray-600">Already have an account? <Link to="/login" className="auth-link">Log In</Link></p>
      </div>
    </div>
  );
};

export default SignupForm;