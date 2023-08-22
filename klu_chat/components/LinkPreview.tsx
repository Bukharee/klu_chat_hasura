// components/LinkPreview.tsx

import React, { useEffect, useState } from "react";

interface LinkPreviewProps {
  url: string;
}

// Utility function to truncate text
function truncateText(text: string | undefined, maxLength: number): string {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength);
  }
  return text || ""; // Return an empty string if text is undefined
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [linkData, setLinkData] = useState<any>({});

  // Fetch link data using the provided URL
  useEffect(() => {
    const fetchData = async () => {
      const data = {
        key: "d9202bec274ad4dfa76588969d0d7ca8", // Your API key
        q: url,
      };

      try {
        // Fetch link preview data from the API
        const response = await fetch("https://api.linkpreview.net", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(data),
        });

        // Parse and set the link data in the state
        const linkResponse = await response.json();
        setLinkData(linkResponse);
      } catch (error) {
        console.error("Error fetching link preview:", error);
      }
    };

    // Call the fetchData function when the URL changes
    fetchData();
  }, [url]);

  return (
    <div className="link-preview">
      {/* Display the truncated title */}
      <h2 className="font-bold text-3xl">{truncateText(linkData.title, 50)}</h2>
      {/* Display the truncated description followed by ellipsis */}
      <p>{truncateText(linkData.description, 80)}...</p>
      {/* Display the link preview image */}
      <img src={linkData.image} alt="Preview" />
      {/* Display the URL */}
      <p>{linkData.url}</p>
    </div>
  );
};

export default LinkPreview;
