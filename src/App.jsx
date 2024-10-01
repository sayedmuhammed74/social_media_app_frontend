// components
import Contacts from './components/Contacts/Contacts';
import Posts from './components/Posts/Posts';
import Requests from './components/Requests/Requests';
import Sidebar from './components/Sidebar';
import Stories from './components/Stories/Stories';
import UsernameCard from './components/UsernameCard';
function App() {
  return (
    <>
      <div className="flex justify-center lg:justify-normal gap-5 mt-2">
        {/* left */}
        <section className="w-1/4 hidden lg:inline">
          <UsernameCard />
          <Sidebar />
        </section>

        {/* middle */}
        <section className="w-3/4 lg:w-1/2">
          <Stories />
          <Posts userId="" />
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
