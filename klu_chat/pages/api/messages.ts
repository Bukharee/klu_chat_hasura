export type Message = {
  id: string;
  timestamp: string;
  content: string;
};

// Function to fetch messages
export const fetchMessages = async () => {
  try {
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
    const data = result.data;
    return data.messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

// Function to insert a new message
export const insertMessage = async (content: string) => {
  try {
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
            content,
          },
        }),
      }
    );

    const result = await response.json();
    const insertedMessage: Message = result.data.insert_messages_one;
    return insertedMessage;
  } catch (error) {
    console.error("Error inserting message:", error);
    throw error;
  }
};

// Function to delete a message by its ID
export const deleteMessage = async (id: string) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string,
      {
        method: "POST",
        headers: {
          "x-hasura-admin-secret":
            "pMuXC5JWWdnNcou1LoL1XJONJANnb4rTupugn2Q5MD0Gv7J5gPH4xKda0hsR1C9w",
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
            id,
          },
        }),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

export default Message;
