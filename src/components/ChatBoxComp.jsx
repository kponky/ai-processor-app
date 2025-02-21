/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { IoSendOutline } from "react-icons/io5";
import "../Styles/ChatBoxComponent.css";

function ChatBoxComp({
  messages,
  inputText,
  setInputText,
  onSendMessage,
  onTranslate,
  onSummarize,
  selectedLanguage,
  setSelectedLanguage,
  isLoading,
}) {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const processedMessagesCount = messages.reduce(
    (sum, m) => sum + m.processed.length,
    0
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages, processedMessagesCount]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(inputText);
    }
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "pt", name: "Portuguese" },
    { code: "es", name: "Spanish" },
    { code: "ru", name: "Russian" },
    { code: "tr", name: "Turkish" },
    { code: "fr", name: "French" },
  ];

  const getLanguageName = (code) => {
    const languages = {
      en: "English",
      pt: "Portuguese",
      es: "Spanish",
      ru: "Russian",
      tr: "Turkish",
      fr: "French",
    };
    return languages[code] || code;
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).length;
  };

  return (
    <div className="chat-container" ref={chatContainerRef}>
      {messages.length === 0 ? (
        <div className="chat-empty-state">
          <div className="text-center mt-16">
            <h1>How can I help you today?</h1>
            <p>Type any text to detect its language and translate it</p>
            <p className="text-sm">Best experienced on desktop Chrome or Edge browsers</p>
          </div>
          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
            />
            <button
              onClick={() => onSendMessage(inputText)}
              disabled={!inputText.trim()}
            >
              <IoSendOutline />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="message-container">
              <div className="flex justify-start">
                <div className="message-bubble">{message.text}</div>
              </div>
              <div className="message-actions">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Detected: {getLanguageName(message.language)}
                </span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  {languages.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      disabled={lang.code === message.language}
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => onTranslate(message.id)}
                  disabled={selectedLanguage === message.language}
                >
                  Translate
                </button>
                {getWordCount(message.text) > 150 && (
                  <button
                    onClick={() => onSummarize(message.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="loading-spinner h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Summarizing...</span>
                      </>
                    ) : (
                      "Summarize"
                    )}
                  </button>
                )}
              </div>
              {message.processed.map((proc, index) => {
                if (proc.type === "translation") {
                  return (
                    <div key={index} className="processed-message">
                      <div className="flex justify-start">
                        <div className="message-bubble">{proc.content}</div>
                      </div>
                      <span className="message-label">
                        Translated to: {getLanguageName(proc.targetLanguage)}
                      </span>
                    </div>
                  );
                } else if (proc.type === "summary") {
                  return (
                    <div key={index} className="processed-message">
                      <div className="flex justify-start">
                        <div className="message-bubble">
                          <div className="summary-label">Summary:</div>
                          {proc.content}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

export default ChatBoxComp;