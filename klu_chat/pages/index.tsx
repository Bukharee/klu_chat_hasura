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
    <div>
      <h1>My Only Chat Page</h1>
      <SimpleChat messages={messages}/>
    </div>
  );
};

export default ChatPage;
