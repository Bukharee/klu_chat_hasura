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
    <div className="border-t mt-2 pt-2 flex items-center justify-center gap-2 fixed bottom-2 w-[95%]">
      <input
        type="text"
        placeholder="send your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-4/5 p-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-[#51ce7f] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
