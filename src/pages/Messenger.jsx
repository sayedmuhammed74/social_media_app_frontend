import { useState } from 'react';
import Chats from '../components/Messenger/ChatList';
import Chat from '../components/Messenger/Chat';

const Messenger = () => {
  const [chatId, setChatId] = useState();
  const [messenger, setMessenger] = useState();
  return (
    <section className="h-[88vh] my-2.5">
      <div className="container mx-auto h-full p-5 flex flex-col md:flex-row gap-5">
        <Chats
          setChatId={setChatId}
          setMessenger={setMessenger}
          chatId={chatId}
        />
        <Chat chatId={chatId} messenger={messenger} />
      </div>
    </section>
  );
};

export default Messenger;
