// Hooks
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from './../../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

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
  const [bio, setBio] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Create a FormData object
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('passwordConfirm', passwordConfirm);
    formData.append('bio', bio);
    formData.append('birthdate', birthdate);
    formData.append('picture', pictureRef.current.files[0]);
    if (
      firstname &&
      lastname &&
      email &&
      password &&
      passwordConfirm &&
      birthdate
    ) {
      dispatch(signup(formData));
    }
  };

  useEffect(() => {
    if (status === 'success') {
      navigate('/');
    }
  }, [status, navigate]);

  return (
    <section className="container mx-auto md:max-w-[80vw] min-h-[80vh] px-5 py-6 my-12 flex flex-col overflow-hidden rounded-3xl bg-gray-200">
      <h1 className="text-3xl font-bold text-center mb-2 text-primary">
        DARK SPACE
      </h1>
      <p className="text-center font-extralight text-sm text-gray-500">
        Dark Sapce Social Media Application
      </p>
      <span className="text-center text-red-400">{error}</span>
      <form
        className="sm:mx-auto mt-3 flex flex-col justify-center gap-3"
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
        <textarea
          placeholder="bio"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="py-2 px-5 rounded-md text-lg border-b-2 focus:outline-none"
        ></textarea>
        <div className="flex items-center gap-5">
          <label htmlFor="picture" className="text-gray-500">
            Picture
          </label>
          <input
            type="file"
            accept="image/*"
            ref={pictureRef}
            name="picture"
            className="text-gray-500"
          />
        </div>
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
          <span className="mr-1 text-gray-400">I have already an account </span>
          <Link to="/login" className="font-medium text-blue-400">
            Login
          </Link>
        </button>
      </form>
    </section>
  );
};

export default Register;
