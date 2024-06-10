// Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// reducers
import { login } from '../redux/features/userSlice';
// Packages
import toast, { Toaster } from 'react-hot-toast';

import Cookies from 'js-cookie';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const emptyFields = () => {
  //   setEmail('');
  //   setPassword('');
  // };

  // const handleErrors = () => {
  //   if (email === '') {
  //     setErrors({ ...errors, email: 'Please provide email.' });
  //   } else {
  //     setErrors({ ...errors, email: '' });
  //   }

  //   if (password === '') {
  //     setErrors({ ...errors, password: 'Please provide password.' });
  //   } else {
  //     setErrors({ ...errors, password: '' });
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (Cookies.get('jwt') !== undefined) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (status === 'failed') {
      toast.error(error); // Assuming you have a toast.error method for displaying errors
    } else if (status === 'success') {
      navigate('/');
    }
  }, [status, error, navigate]);

  return (
    <section className="flex flex-col container px-5 py-6 my-12 min-h-[80vh] overflow-hidden rounded-3xl mx-auto max-w-[80vw] bg-gray-200">
      <Toaster />
      <h1 className="text-3xl font-bold text-center mb-2 text-primary">
        DARK SPACE
      </h1>
      <p className="text-center font-extralight text-sm text-gray-500">
        Dark Space Social Media Application
      </p>
      <form
        className="mx-auto mt-3 flex flex-col justify-center gap-3"
        onSubmit={handleLogin}
      >
        <div className="flex justify-between relative pb-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            name="email"
          />
          <span className="text-red-400 text-center absolute bottom-0">
            {/* {errors.email} */}
          </span>
        </div>
        <div className="flex justify-between relative pb-5">
          <label htmlFor="passsword">Passsword</label>
          <input
            type="passsword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="passsword"
            name="passsword"
          />
          <span className="text-red-400 text-center absolute bottom-0">
            {/* {errors.password} */}
          </span>
        </div>
        <button
          type="submit"
          className="flex bg-gray-500 px-3 py-1.5 justify-center rounded-md text-white font-medium"
          disabled={status === 'pending' ? true : false}
        >
          Login
        </button>
        <button
          type="button"
          className="flex bg-gray-500 px-3 py-1.5 justify-center rounded-md text-white font-medium"
        >
          <Link to="/register">Sign Up</Link>
        </button>
      </form>
    </section>
  );
};

export default Login;
