// Hooks
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { signup } from './../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
// Packages
// import toast, { Toaster } from 'react-hot-toast';
// Utils

const Register = () => {
  const { error, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [bio, setBio] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [picture, setPicture] = useState('');

  // const emptyFields = () => {
  //   setFirstname('');
  //   setLastname('');
  //   setEmail('');
  //   setPassword('');
  //   setPasswordConfirm('');
  //   setBio('');
  //   setBirthdate('');
  //   setPicture('');
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    // if (firstname && lastname && email && password && passwordConfirm) {
    dispatch(signup({ firstname, lastname, email, password, passwordConfirm }));
    // }
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
      <h1 className="text-3xl font-bold text-center mb-2">DARK SPACE</h1>
      <p className="text-center">Dark Sapce Social Media Application</p>
      <form
        className="mx-auto mt-3 flex flex-col justify-center gap-3"
        onSubmit={handleRegister}
      >
        <div className="flex justify-between relative pb-5">
          <label>Firstname</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="firstname"
            name="firstname"
          />
        </div>
        <div className="flex justify-between relative pb-5">
          <label>Lastname</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="lastname"
            name="lastname"
          />
        </div>
        <div className="flex justify-between relative pb-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            name="email"
          />
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
        </div>
        <div className="flex justify-between relative pb-5">
          <label htmlFor="passswordConfirm">Passsword Confirm</label>
          <input
            type="passsword"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Passsword Confirm"
            name="passsword_confirm"
          />
        </div>
        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <div className="flex justify-between">
          <label htmlFor="picture">Picture</label>
          <input
            type="file"
            onChange={(e) => setPicture(e.target.value)}
            value={picture}
            name="image"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="birthdate">Birthdate</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="flex bg-gray-500 px-3 py-1.5 justify-center rounded-md text-white font-medium"
          disabled={status === 'loading'}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="flex bg-gray-500 px-3 py-1.5 justify-center rounded-md text-white font-medium"
        >
          <Link to="/login">Login</Link>
        </button>
        {error && <span>{error}</span>}
      </form>
    </section>
  );
};

export default Register;
