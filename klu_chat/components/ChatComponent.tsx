import React from "react";
import ChatMessages from "./ChatMessages";

const ChatComponent: React.FC = () => {
  const messages = [
    "Hello, check this the out this link: https://www.example.com",
    "Have you seen this: https://www.example.org?",
    "Here's a message without a link.",
  ];

  return (
    <div className="flex flex-col h-screen p-4">
      <ChatMessages messages={messages} />
      {/* Render the input and button for sending messages */}
    </div>
  );
};

export default ChatComponent;
