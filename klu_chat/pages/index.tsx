import React from "react";
import SimpleChatPage from "../components/SimpleChatPage";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { fetchMessages, Message } from "./api/messages";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const messages = await fetchMessages();
    return {
      props: { messages },
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return {
      props: { messages: [] },
    };
  }
};

const ChatPage: React.FC = ({
  messages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SimpleChatPage messages={messages} />;
};

export default ChatPage;
