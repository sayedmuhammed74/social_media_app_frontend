// Hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import Contacts from './components/Contacts/Contacts';
import Posts from './components/Posts/Posts';
import Requests from './components/Requests/Requests';
import Sidebar from './components/Sidebar';
import Stories from './components/Stories/Stories';
import UsernameCard from './components/UsernameCard';
// Utils
import { io } from 'socket.io-client';
import { url } from './url';
// Actions
import { setSocket } from './redux/features/socket/socketSlice';

function App() {
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
      <div className="flex justify-center lg:justify-normal gap-5 mt-2">
        {/* left */}
        <section className="w-1/4 hidden lg:inline">
          <UsernameCard />
          <Sidebar />
        </section>

        {/* middle */}
        <section className="w-5/6 lg:w-1/2">
          <Stories />
          <Posts />
        </section>

        {/* right */}
        <section className="w-1/4 hidden lg:inline">
          <Requests />
          <Contacts />
        </section>
      </div>
    </>
  );
}

export default App;
