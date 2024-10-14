// Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// reducers
import { login } from './../../redux/features/user/userThunks';
// Packages
const Login = () => {
  // Redux
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.user);
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (status === 'success') {
      navigate('/');
    }
  }, [status, navigate]);

  useEffect(() => console.log(error), [error]);

  return (
    <section className="flex flex-col container px-5 py-6 my-12 min-h-[80vh] overflow-hidden rounded-3xl mx-auto max-w-[80vw] bg-gray-200">
      <h1 className="text-3xl font-bold text-center mb-2 text-primary">
        DARK SPACE
      </h1>
      <p className="text-center font-extralight text-sm text-gray-500">
        Dark Space Social Media Application
      </p>
      <span className="text-center text-red-400">{error}</span>
      <form
        className="mx-auto mt-3 flex flex-col justify-center gap-3"
        onSubmit={handleLogin}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          name="email"
          className="py-2 px-5 rounded-md text-lg border-b-2 focus:outline-none"
        />
        <input
          type="password"
          className="py-2 px-5 rounded-md text-lg border-b-2 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          name="password"
        />
        <button
          type="submit"
          className="flex bg-gray-500 px-3 py-1.5 justify-center rounded-md text-white font-medium"
          disabled={status === 'pending'}
        >
          Login
        </button>
        <button type="button">
          <span className="mr-1 text-gray-400">Do you have account ?</span>
          <Link
            to="/register"
            className="font-medium text-blue-400"
            disabled={status === 'pending'}
          >
            Sign Up
          </Link>
        </button>
      </form>
    </section>
  );
};

export default Login;
