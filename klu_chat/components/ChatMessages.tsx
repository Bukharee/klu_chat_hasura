import React from "react";

interface ChatMessagesProps {
  messages: string[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex-grow overflow-y-auto">
      {messages.map((message, index) => (
        <div key={index} className="bg-gray-100 p-2 rounded-md mb-2">
          {message}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
