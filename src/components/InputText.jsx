/* eslint-disable react/prop-types */
import { IoSendOutline } from "react-icons/io5";
import "./styles.css"; // Import the CSS file

function InputText({
  inputText,
  setInputText,
  onSendMessage,
  isLoading,
  error,
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      onSendMessage(inputText);
    }
  };

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          placeholder="Type your message here..."
        />
        <button
          onClick={() => onSendMessage(inputText)}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="loading-spinner h-4 w-4 text-white"
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
          ) : (
            <IoSendOutline />
          )}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default InputText;