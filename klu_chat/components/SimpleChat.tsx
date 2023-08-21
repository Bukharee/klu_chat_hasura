import React, { useState } from "react";

// Importing the ChatInput and ChatMessages components
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const SimpleChat: React.FC = () => {
  // State for storing sent messages
  const [messages, setMessages] = useState<string[]>([]);

  // Function to handle sending messages
  const handleSendMessage = (message: string) => {
    if (message.trim() !== "") {
      // Adding the new message to the messages array
      setMessages([...messages, message]);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      {/* Displaying the chat messages */}
      <ChatMessages messages={messages} />

      {/* Sending new messages */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default SimpleChat;
