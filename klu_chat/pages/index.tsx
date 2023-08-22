import React from "react";
import SimpleChatPage from "../components/SimpleChatPage";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { fetchMessages, Message } from "./api/messages";
import Image from "next/image";
import logo from "../public/images/klu.png";

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
  return (
    <div>
      <header>
        <div className="flex items-center px-4 gap-3 py-3">
          <Image src={logo} height={44} width={44} alt="Your Name" />
          <h1 className="text-3xl font-bold">KluChat</h1>
        </div>
      </header>
      <SimpleChatPage messages={messages} />
    </div>
  );
};

export default ChatPage;
