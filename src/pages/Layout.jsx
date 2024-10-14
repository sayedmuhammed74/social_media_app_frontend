// Hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Navbar from '../components/Navbar';
// Utils
import { io } from 'socket.io-client';
import { url } from './../url';
// Actions
import { setSocket } from './../redux/features/socket/socketSlice';
const Layout = ({ children }) => {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);

  // Create Socket
  useEffect(() => {
    dispatch(setSocket(io(url)));
  }, [dispatch]);

  // Add new User to socket
  useEffect(() => {
    user && socket?.emit('userOnline', user?._id);
  }, [socket, user]);
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};
export default Layout;
