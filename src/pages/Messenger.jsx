import { useState } from 'react';
import Chats from '../components/Messenger/ChatList';
import Chat from '../components/Messenger/Chat';

const Messenger = () => {
  const [chatId, setChatId] = useState();
  return (
    <section className="h-[88vh] md:h-auto my-2.5">
      <div className="container mx-auto h-full p-5 flex flex-col md:flex-row gap-5">
        <Chats setChatId={setChatId} />
        <Chat chatId={chatId} />
      </div>
    </section>
  );
};

export default Messenger;
