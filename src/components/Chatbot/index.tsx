import { useEffect } from "react";

declare global {
  interface Window {
    watsonAssistantChatOptions: any;
  }
}

const Chatbot = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "e0ae3ed6-6ac1-4906-805f-93caf06f4628",
      region: "au-syd",
      serviceInstanceID: "bdfb552a-598d-40ad-a08e-3049a845336d",
      onLoad: async (instance: any) => { await instance.render(); }
    };

    setTimeout(() => {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    });
  }, []);

  return null;
};

export default Chatbot;
