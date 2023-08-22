import React from "react";
import Message from "../pages/api/messages";

interface SimpleChatProps {
  messages: Message[];
  onDeleteMessage: (messageId: string) => void;
}

const renderMessageWithLinks = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
};

const SimpleChat: React.FC<SimpleChatProps> = ({
  messages,
  onDeleteMessage,
}) => {
  return (
    <div className="flex-grow overflow-y-auto">
      {messages.map((message) => (
        <div key={message.id} className="bg-gray-100 p-2 rounded-md mb-2">
          <div
            dangerouslySetInnerHTML={{
              __html: renderMessageWithLinks(message.content),
            }}
          />
          <button
            onClick={() => onDeleteMessage(message.id)}
            className="ml-2 text-white px-2 py-1 rounded"
          >
            {/* Your delete button */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SimpleChat;
