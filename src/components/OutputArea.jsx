import React from 'react';
import LanguageSelect from './LanguageSelect';

const OutputArea = ({
  outputText,
  detectedLanguage,
  summary,
  translation,
  handleSummarize,
  handleTranslate,
}) => {
  return (
    <div className="output-area">
      <div className="output-text">
        <p>{outputText}</p>
        {detectedLanguage && <p>Detected Language: {detectedLanguage}</p>}
      </div>
      {outputText.length > 150 && (
        <button onClick={handleSummarize}>Summarize</button>
      )}
      <LanguageSelect handleTranslate={handleTranslate} />
      {summary && <div className="summary">Summary: {summary}</div>}
      {translation && <div className="translation">Translation: {translation}</div>}
    </div>
  );
};

export default OutputArea;