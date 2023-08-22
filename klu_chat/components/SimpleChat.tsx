// SimpleChat.tsx

import React, { useState } from "react";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  timestamp: string;
  content: string;
}

interface SimpleChatProps {
  messages: Message[];
}

const SimpleChat: React.FC<SimpleChatProps> = ({ messages }) => {
  const [messageList, setMessageList] = useState<Message[]>(messages);

  const handleSendMessage = async (messageContent: string) => {
    if (messageContent.trim() !== "") {
      const newMessage: Message = {
        id: "temp-id", // Generate a temporary id here or get it from the server
        timestamp: new Date().toISOString(), // Get the current timestamp
        content: messageContent,
      };

      // Update local state immediately to show the new message
      setMessageList([...messageList, newMessage]);

      try {
        console.log("secret", process.env.HASURA_ADMIN_SECRET);
        const response = await fetch(
          process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string,
          {
            method: "POST",
            headers: {
              "x-hasura-admin-secret":
                "pMuXC5JWWdnNcou1LoL1XJONJANnb4rTupugn2Q5MD0Gv7J5gPH4xKda0hsR1C9w",
              "Content-Type": "application/json", // Add this header
            },
            body: JSON.stringify({
              query: `mutation ($content: String!) {
                insert_messages_one(object: {content: $content}) {
                  id
                  timestamp
                  content
                }
              }`,
              variables: {
                content: messageContent,
              },
            }),
          }
        );

        const result = await response.json();
        console.log("Insert result: ", result);
        const insertedMessage: Message = result.data.insert_messages_one;

        // Replace the temporary id with the actual id received from the server
        newMessage.id = insertedMessage.id;
        setMessageList([...messageList, newMessage]);
      } catch (e) {
        console.log("errors: ", process.env.HASURA_ADMIN_SECRET);
        console.log(e);
      }
    }
  };

  const renderMessageWithLinks = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string,
        {
          method: "POST",
          headers: {
            "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            mutation DeleteMessage($id: uuid!) {
              delete_messages_by_pk(id: $id) {
                id
              }
            }
          `,
            variables: {
              id: messageId,
            },
          }),
        }
      );

      const result = await response.json();
      console.log("Delete result:", result);

      // Remove the deleted message from the ui
      setMessageList(messageList.filter((message) => message.id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-grow overflow-y-auto">
        {messageList.map((message) => (
          <div key={message.id} className="bg-gray-100 p-2 rounded-md mb-2">
            <div
              dangerouslySetInnerHTML={{
                __html: renderMessageWithLinks(message.content),
              }}
            />
            <button
              onClick={() => handleDeleteMessage(message.id)}
              className="ml-2 text-white px-2 py-1 rounded"
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default SimpleChat;
