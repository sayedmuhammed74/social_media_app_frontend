// components
// import Counter from './components/Counter';
import { useEffect } from 'react';
import Contacts from './components/Contacts/Contacts';
import Navbar from './components/Navbar';
import Posts from './components/Posts/Posts';
import Requests from './components/Requests/Requests';
import Sidebar from './components/Sidebar';
import Stories from './components/Stories/Stories';
import UsernameCard from './components/UsernameCard';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get('jwt') === undefined) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <>
      <Navbar />
      <div className="flex gap-5">
        {/* left */}
        <section className="w-1/4">
          <UsernameCard />
          <Sidebar />
        </section>

        {/* middle */}
        <section className="w-1/2">
          <Stories />
          <Posts />
        </section>

        {/* right */}
        <section className="w-1/4">
          <Requests />
          <Contacts />
        </section>
      </div>
    </>
  );
}

export default App;
