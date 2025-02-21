/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { IoSendOutline } from "react-icons/io5";
import "../src/Styles/ChatBox.css"; 

function ChatBox({
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
  // ... existing code ...

  return (
    <button
      onClick={() => onTranslate(message.id)}
      disabled={selectedLanguage === message.language}
      className="translate-button"
    >
      Translate
    </button>
  );
}

export default ChatBox;