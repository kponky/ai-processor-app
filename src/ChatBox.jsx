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

  return (
    <button
      onClick={() => onTranslate(messages.id)}
      disabled={selectedLanguage === messages.language}
      className="translate-button"
    >
      Translate
    </button>
  );
}

export default ChatBox;