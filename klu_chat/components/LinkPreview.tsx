// components/LinkPreview.tsx

import React, { useEffect, useState } from "react";

interface LinkPreviewProps {
  url: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [linkData, setLinkData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        key: "d9202bec274ad4dfa76588969d0d7ca8", // Your API key
        q: url,
      };

      try {
        const response = await fetch("https://api.linkpreview.net", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(data),
        });

        const linkResponse = await response.json();
        setLinkData(linkResponse);
      } catch (error) {
        console.error("Error fetching link preview:", error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className="link-preview">
      <h2>{linkData.title}</h2>
      <p>{linkData.description}</p>
      <img src={linkData.image} alt="Preview" />
      <p>{linkData.url}</p>
    </div>
  );
};

export default LinkPreview;
