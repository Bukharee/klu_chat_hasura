import React from "react";
import Message from "../pages/api/messages";
import styles from "./SimpleChat.module.css"; // Import the CSS module
import { useRef, useEffect } from "react";
import LinkPreview from "./LinkPreview"; // Import the LinkPreview component

interface SimpleChatProps {
  messages: Message[];
  onDeleteMessage: (messageId: string) => void;
}

const renderMessageWithLinks = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.replace(urlRegex, (url) => {
    return `<a href="${url}" class="${styles.link}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
};

const SimpleChat: React.FC<SimpleChatProps> = ({
  messages,
  onDeleteMessage,
}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex-grow overflow-y-auto h-56">
      {messages.map((message) => (
        <div
          key={message.id}
          className="bg-[#ecedef] p-4 pb-1 rounded-md mb-2 text-black max-w-xl mx-auto"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: renderMessageWithLinks(message.content),
            }}
          />
          {message.content.includes("http") && (
            <a href="">
              <LinkPreview url={message.content} />
            </a>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">
              {message.timestamp.toLocaleString()}
            </span>
            <button
              onClick={() => onDeleteMessage(message.id)}
              className="ml-2 text-white px-2 py-1 rounded w-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <div ref={bottomRef} className="h-11" />
    </div>
  );
};

export default SimpleChat;
