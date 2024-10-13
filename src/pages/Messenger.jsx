import { useState } from 'react';
import Chats from '../components/Messenger/ChatList';
import Conversation from '../components/Messenger/Chat';

const Messenger = () => {
  const [chatId, setChatId] = useState();
  return (
    <section className="">
      <div className="container mx-auto p-5 flex gap-5">
        <Chats setChatId={setChatId} />
        <Conversation chatId={chatId} />
      </div>
    </section>
  );
};

export default Messenger;
