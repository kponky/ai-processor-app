import React from 'react';

const InputArea = ({ inputText, setInputText, handleSend }) => {
  return (
    <div className="input-area">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type or paste your text here..."
      />
      <button onClick={handleSend} aria-label="Send">
        📩
      </button>
    </div>
  );
};

export default InputArea;