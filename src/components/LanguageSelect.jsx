import React from 'react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'es', name: 'Spanish' },
  { code: 'ru', name: 'Russian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'fr', name: 'French' },
];

const LanguageSelect = ({ handleTranslate }) => {
  return (
    <div className="language-select">
      <select onChange={(e) => handleTranslate(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <button onClick={() => handleTranslate(document.querySelector('select').value)}>
        Translate
      </button>
    </div>
  );
};

export default LanguageSelect;