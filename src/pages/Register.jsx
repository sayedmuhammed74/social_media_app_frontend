// Hooks
import { useState } from 'react';
import { Link } from 'react-router-dom';
// Packages
// import toast, { Toaster } from 'react-hot-toast';
// Utils

const Register = () => {
  const initialErrorsObj = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [bio, setBio] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [picture, setPicture] = useState('');
  const [errors, setErrors] = useState(initialErrorsObj);

  const emptyFields = () => {
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setBio('');
    setBirthdate('');
    setPicture('');
  };

  const handleErrors = () => {
    if (firstname === '') {
      setErrors({ ...errors, firstname: 'Please provide firstname.' });
    } else {
      setErrors({ ...errors, firstname: '' });
    }

    if (lastname === '') {
      setErrors({ ...errors, lastname: 'Please provide lastname.' });
    } else {
      setErrors({ ...errors, lastname: '' });
    }

    if (email === '') {
      setErrors({ ...errors, email: 'Please provide email.' });
    } else {
      setErrors({ ...errors, email: '' });
    }

    if (password === '') {
      setErrors({ ...errors, password: 'Please provide password.' });
    } else {
      setErrors({ ...errors, password: '' });
    }

    if (passwordConfirm === '') {
      setErrors({
        ...errors,
        passwordConfirm: 'Please provide password confirm.',
      });
    } else {
      setErrors({ ...errors, passwordConfirm: '' });
    }
  };

  const { signup, isLoading, error } = {};

  const handleRegister = async (e) => {
    e.preventDefault();
    handleErrors();
    if (firstname && lastname && email && password && passwordConfirm) {
      await signup(
        firstname,
        lastname,
        email,
        password,
        passwordConfirm,
        bio,
        birthdate
      );
      if (!error) {
        // toast.success('User created successfully');
        emptyFields();
      } else {
        // toast.error(error.response?.data.message);
        // console.log(error);
      }
    }
  };

  return (
    <section className="flex flex-col container px-5 py-6 my-12 min-h-[80vh] overflow-hidden rounded-3xl mx-auto max-w-[80vw] bg-gray-200">
      {/* <Toaster /> */}
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
          <span className="text-red-400 text-center absolute bottom-0">
            {errors.firstname}
          </span>
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
          <span className="text-red-400 text-center absolute bottom-0">
            {errors.lastname}
          </span>
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
          <span className="text-red-400 text-center absolute bottom-0">
            {errors.email}
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
            {errors.password}
          </span>
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
          <span className="text-red-400 text-center absolute bottom-0">
            {errors.passwordConfirm}
          </span>
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
          disabled={isLoading}
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
