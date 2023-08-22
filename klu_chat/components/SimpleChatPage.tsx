// components/SimpleChatPage.tsx

import React, { useState } from "react";
import SimpleChat from "./SimpleChat";
import ChatInput from "./ChatInput";
import { Message, insertMessage, deleteMessage } from "../pages/api/messages";

interface SimpleChatPageProps {
  messages: Message[];
}

const SimpleChatPage: React.FC<SimpleChatPageProps> = ({ messages }) => {
  const [messageList, setMessageList] = useState<Message[]>(messages);

  const handleSendMessage = async (messageContent: string) => {
    if (messageContent.trim() !== "") {
      try {
        const insertedMessage = await insertMessage(messageContent);
        setMessageList([...messageList, insertedMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
      setMessageList(messageList.filter((message) => message.id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="flex flex-col h-[90vh] p-4">
      <SimpleChat
        messages={messageList}
        onDeleteMessage={handleDeleteMessage}
      />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default SimpleChatPage;
