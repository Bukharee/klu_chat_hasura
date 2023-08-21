import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const sendMessage = () => {
    // Sending the new message to the parent component
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="border-t mt-4 pt-2">
      <input
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full p-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        onClick={sendMessage}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
