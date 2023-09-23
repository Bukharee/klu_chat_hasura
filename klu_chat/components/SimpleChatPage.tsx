import React, { useState } from "react";
import SimpleChat from "./SingleMessage";
import ChatInput from "./ChatInput"; // Import the ChatInput component
import { Message, insertMessage, deleteMessage } from "../pages/api/messages"; // Import message-related functions

interface SimpleChatPageProps {
  messages: Message[];
}

const SimpleChatPage: React.FC<SimpleChatPageProps> = ({ messages }) => {
  // State to manage the list of messages
  const [messageList, setMessageList] = useState<Message[]>(messages);

  // Handle sending a new message
  const handleSendMessage = async (messageContent: string) => {
    if (messageContent.trim() !== "") {
      try {
        // Insert the new message and update the message list
        const insertedMessage = await insertMessage(messageContent);
        setMessageList([...messageList, insertedMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Handle deleting a message
  const handleDeleteMessage = async (messageId: string) => {
    try {
      // Delete the message with the given ID and update the message list
      await deleteMessage(messageId);
      setMessageList(messageList.filter((message) => message.id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    // Container for the chat interface
    <div className="flex flex-col h-[90vh] p-4">
      {/* Render the SimpleChat component */}
      <SimpleChat
        messages={messageList}
        onDeleteMessage={handleDeleteMessage}
      />
      {/* Render the ChatInput component */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default SimpleChatPage;
