import React from "react";
import SimpleChat from "../components/SimpleChat";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
type Data = {
  messages: Record<string, string>[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let messages = [];

  try {
    console.log("trying...");
    const response = await fetch(
      process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string,
      {
        method: "POST",
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
          "Content-Type": "application/json", // Add this header
        },
        body: JSON.stringify({
          query: `query {
            messages {
              id
              timestamp
              content
            }
          }`,
        }),
      }
    );

    const result = await response.json();
    console.log("result: ", result);
    const data: Data = result.data;

    messages = data.messages; // Use correct field name here
    console.log("messages", messages);
  } catch (e) {
    console.log(e);
  }

  return {
    props: { messages },
  };
};

const ChatPage: React.FC = ({
  messages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="px-4 py-5 h-5/6">
      <header className="sticky top-2 bg-white">
        <h1 className="font-bolder text-4xl pl-4">KluChat</h1>
        <hr />
      </header>
      <SimpleChat messages={messages} />
    </div>
  );
};

export default ChatPage;
