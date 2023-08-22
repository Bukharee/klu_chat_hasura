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
              "x-hasura-admin-secret": process.env
                .HASURA_ADMIN_SECRET as string,
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

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-grow overflow-y-auto">
        {messageList.map((message) => (
          <div
            key={message.id}
            className="bg-gray-100 p-2 rounded-md mb-2"
            dangerouslySetInnerHTML={{
              __html: renderMessageWithLinks(message.content),
            }}
          />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default SimpleChat;
