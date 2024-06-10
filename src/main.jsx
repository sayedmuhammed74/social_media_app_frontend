import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import './index.css';

// redux
import { Provider } from 'react-redux';
import store from './redux/store.js';

// components
import App from './App.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Counter from './components/Counter.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cookies from 'js-cookie';
import ProfilePage from './pages/ProfilePage.jsx';
import Navbar from './components/Navbar.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/counter',
    element: <Counter />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: !Cookies.get('jwt') ? <Register /> : <Navigate to="/" />,
  },
  {
    path: '/profile',
    element: (
      <>
        <Navbar />
        <ProfilePage />
      </>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
