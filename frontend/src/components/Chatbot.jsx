import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        message: input,
      });
      const responseText = response.data.response;

      const parsedMessage = parseLinks(responseText);
      const botMessage = { text: parsedMessage, user: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const makeUrlClickable = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (match) => {
      return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });
  };

  const parseLinks = (text) => {
    const dataset = [
      {
        QUERY: "How to learn Python?",
        WEBSITE:
          "https://python.org - Offers documentation, tutorials, and resources for learning Python programming.",
      },
    ];

    dataset.forEach((item) => {
      const regex = new RegExp(item.QUERY, "gi");
      text = text.replace(
        regex,
        `<a href="${item.WEBSITE.split(" ")[0]}" target="_blank" rel="noopener noreferrer">${item.QUERY}</a>`,
      );
    });

    text = makeUrlClickable(text);

    return text;
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen p-4 bg-gradient-to-r from-[#bfdbfe] to-[#a5f3fc]">
        <div className="w-full lg:w-2/3 bg-secondary border border-gray-300 rounded-lg p-4 flex flex-col h-full">
          <p className="text-lg text-center text-gray-500 mb-10">Nova</p>
          <div
            className="flex-1 overflow-y-auto space-y-2 hide-scrollbar"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex flex-col">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-xs mb-2 ${message.user ? "self-end" : "self-start"}`}
                >
                  {!message.user && (
                    <div className="text-xs text-green-600 mb-1">Nova</div>
                  )}
                  <div
                    className={`p-2 ${
                      message.user
                        ? "bg-gray-200 text-black pl-3 pr-3 rounded-bl-lg rounded-t-lg"
                        : "border border-gray-200 rounded-lg hover:border-gray-400"
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form onSubmit={sendMessage} className="flex mt-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hi, How can i help you?"
                className="w-full pr-28 py-4 px-2 bg-secondary border border-black text-black rounded-md "
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2">
                <button
                  type="submit"
                  className="flex items-center bg-blue-900 text-white px-4 py-2 border border-transparent rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.5 10a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" />
                    <path d="M11 9a1 1 0 00-1 1v5a1 1 0 002 0v-5a1 1 0 00-1-1z" />
                    <path d="M9 10a1 1 0 00-1 1v5a1 1 0 002 0v-5a1 1 0 00-1-1z" />
                  </svg>
                  Suggest
                </button>
                <button
                  type="button"
                  onClick={clearMessages}
                  className="flex items-center bg-gray-200 text-black px-4 py-2 border border-transparent rounded-lg shadow-lg hover:bg-red-600 transition duration-200 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
