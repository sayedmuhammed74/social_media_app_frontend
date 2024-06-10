import ContactCard from './ContactCard';

const Contacts = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-gray-400">Contacts</h2>
        <span className=" rounded-full text-white bg-primary py-1 px-2.5">
          2
        </span>
      </div>
      <ul>
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
      </ul>
    </div>
  );
};

export default Contacts;
