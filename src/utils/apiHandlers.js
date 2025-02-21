import axios from "axios";

const detectLanguage = async (text) => {
  try {
    const response = await axios.post(process.env.REACT_APP_LANGUAGE_DETECTION_API_URL, { text });
    return response.data.language;
  } catch (error) {
    console.error('Error detecting language:', error);
    return 'Unknown';
  }
};

const summarizeText = async (text) => {
  try {
    const response = await axios.post(process.env.REACT_APP_SUMMARIZER_API_URL, { text });
    return response.data.summary;
  } catch (error) {
    console.error('Error summarizing text:', error);
    return 'Summary unavailable';
  }
};

const translateText = async (text, language) => {
  try {
    const response = await axios.post(process.env.REACT_APP_TRANSLATOR_API_URL, { text, language });
    return response.data.translation;
  } catch (error) {
    console.error('Error translating text:', error);
    return 'Translation unavailable';
  }
};

export { detectLanguage, summarizeText, translateText };