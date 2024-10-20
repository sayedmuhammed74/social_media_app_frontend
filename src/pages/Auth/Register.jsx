// Hooks
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// Actions
import { signup } from './../../redux/features/user/userThunks';
import { resetError } from '../../redux/features/user/userSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.user);
  const pictureRef = useRef();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  // const [bio, setBio] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [warning, setWarning] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Create a FormData object
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('passwordConfirm', passwordConfirm);
    // formData.append('bio', bio);
    formData.append('birthdate', birthdate);
    formData.append('picture', pictureRef.current.files[0]);
    if (!pictureRef.current.files[0])
      setWarning('please provide youor profile picture');
    if (
      firstname &&
      lastname &&
      email &&
      password &&
      passwordConfirm &&
      birthdate &&
      pictureRef.current.files[0]
    ) {
      dispatch(signup(formData));
      setWarning('');
    }
  };

  useEffect(() => {
    if (status === 'success' && !error) {
      navigate('/');
    }
  }, [status, navigate, error]);

  return (
    <section className="flex justify-center items-center w-full h-[100vh] bg-blue-50">
      <div className="px-2 py-3 rounded-3xl mx-auto w-fit max-w-[350px] bg-white">
        <h1 className="text-3xl font-bold text-center mb-2 text-primary">
          DARK SPACE
        </h1>
        <p className="text-center font-extralight text-sm text-gray-500">
          Dark Sapce Social Media Application
        </p>
        <div className="text-center text-red-400">{error}</div>
        <form
          className="mx-auto px-3 mt-3 flex flex-col justify-center gap-3"
          onSubmit={handleRegister}
        >
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="firstname"
            name="firstname"
            className="py-2 px-5 rounded-md text-lg border-b-2 focus:outline-none"
          />
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="lastname"
            name="lastname"
            className="py-2 px-5 rounded-md text-lg border-b-2 focus:outline-none"
          />
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            name="password"
            className="py-2 px-5 rounded-md text-lg border-b-2 focus:outline-none"
          />
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Password Confirm"
            name="passwordConfirm"
            className="py-2 px-5 rounded-md text-lg border-b-2 focus:outline-none"
          />
          {/* <textarea
            placeholder="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="py-2 px-5 rounded-md text-lg border-b-2 focus:outline-none min-h-11 max-h-16"
          /> */}
          <label htmlFor="picture" className="text-gray-500">
            Picture
          </label>
          <input
            type="file"
            accept="image/*"
            ref={pictureRef}
            name="picture"
            className="text-gray-500 max-w-56"
          />
          {warning && (
            <span className="text-center text-red-400">{warning}</span>
          )}
          <div className="flex items-center justify-between">
            <label htmlFor="birthdate" className="text-gray-500">
              Birthdate
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="p-2 rounded-md focus:outline-none text-gray-500"
              name="birthdate"
            />
          </div>
          <button
            type="submit"
            className="flex bg-gray-500 px-3 py-1.5 justify-center rounded-md text-white font-medium"
            disabled={status === 'loading'}
          >
            Sign Up
          </button>

          <button type="button">
            <span className="mr-1 text-gray-400">
              I have already an account{' '}
            </span>
            <Link
              to="/login"
              className="font-medium text-blue-400"
              onClick={() => dispatch(resetError())}
            >
              Login
            </Link>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
