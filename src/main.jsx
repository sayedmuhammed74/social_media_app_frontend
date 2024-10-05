import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import './index.css';
// Cookies
import Cookies from 'js-cookie';
// redux
import { Provider } from 'react-redux';
import store from './redux/store.js';

// components
import App from './App.jsx';
import PageNotFound from './pages/NotFound/PageNotFound.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import UserPage from './pages/UserPage.jsx';
import Layout from './pages/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
// import isAuthenticated from './utils/isAuthenticated.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout>
          <App />,
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: !Cookies.get('jwt') ? <Login /> : <Navigate to="/" />,
  },
  {
    path: '/register',
    element: !Cookies.get('jwt') ? <Register /> : <Navigate to="/" />,
  },
  {
    path: '/profile/:slug',
    element: (
      <ProtectedRoute>
        <Layout>
          <ProfilePage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/:slug',
    element: (
      <ProtectedRoute>
        <Layout>
          <UserPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
