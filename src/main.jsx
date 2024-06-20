import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';

// redux
import { Provider } from 'react-redux';
import store from './redux/store.js';

// components
import App from './App.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import UserPage from './pages/UserPage.jsx';
import Layout from './pages/Layout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />,
      </Layout>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/profile/:slug',
    element: (
      <>
        <Layout>
          <ProfilePage />
        </Layout>
      </>
    ),
  },
  {
    path: '/:slug',
    element: (
      <>
        <Layout>
          <UserPage />
        </Layout>
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
