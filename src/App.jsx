import { useState, useEffect } from "react";
// import ChatBox from "./components/ChatBox";
// import Header from "./components/Header";
// import InputText from "./components/InputText";
import "../src/Styles/ChatBox.css";
import "../src/Styles/ChatBoxComponent.css";
import "../src/Styles/Header.css";
import "../src/Styles/InputText.css";
import "../src/styles.css";
import ChatBoxComp from "./components/ChatBoxComp";
import InputText from "./components/InputText";
import Header from "./components/Header";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAIInitialized, setIsAIInitialized] = useState(false);
  const [isSummarizerAvailable, setIsSummarizerAvailable] = useState(false);

  useEffect(() => {
    const checkAIAvailability = async () => {
      if (!self.ai) {
        setError("Please use Chrome or Edge browser");
        return;
      }

      if ("ai" in self && "summarizer" in self.ai) {
        try {
          const summarizerCapabilities = await self.ai.summarizer.capabilities();
          if (summarizerCapabilities.available === "readily" || summarizerCapabilities.available === "after-download") {
            setIsSummarizerAvailable(true);
          } else {
            setIsSummarizerAvailable(false);
          }
        } catch (err) {
          console.error("Error checking summarizer availability:", err);
          setIsSummarizerAvailable(false);
        }
      } else {
        setIsSummarizerAvailable(false);
      }

      setIsAIInitialized(true);
    };

    checkAIAvailability();
  }, []);

  const detectLanguage = async (text) => {
    try {
      const detector = await window.ai.languageDetector.create();
      const results = await detector.detect(text);
      if (!results || !results[0]) return null;
      return results[0].detectedLanguage;
    } catch (error) {
      console.error("Language detection error:", error);
      return null;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !isAIInitialized) return;

    setIsLoading(true);
    setError("");

    try {
      const detectedLanguage = await detectLanguage(inputText);
      if (!detectedLanguage) {
        setError("Could not detect language");
        return;
      }

      const newMessage = {
        id: Date.now(),
        text: inputText,
        language: detectedLanguage,
        processed: [],
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
    } catch (err) {
      setError("Failed to process message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async (messageId) => {
    if (!isAIInitialized) return;

    if (!("ai" in self && "translator" in self.ai)) {
      setError("Translation API not supported in this browser");
      return;
    }

    const message = messages.find((m) => m.id === messageId);
    if (!message || message.language === selectedLanguage) return;

    setIsLoading(true);
    setError("");

    try {
      const translator = await self.ai.translator.create({
        sourceLanguage: message.language,
        targetLanguage: selectedLanguage,
      });

      const translation = await translator.translate(message.text);
      if (!translation) return;

      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === messageId) {
            const hasTranslation = m.processed.some(
              (p) =>
                p.type === "translation" &&
                p.targetLanguage === selectedLanguage
            );
            if (hasTranslation) return m;

            return {
              ...m,
              processed: [
                ...m.processed,
                {
                  type: "translation",
                  content: translation,
                  targetLanguage: selectedLanguage,
                },
              ],
            };
          }
          return m;
        })
      );
    } catch (err) {
      setError(`Translation failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async (messageId) => {
    if (!isAIInitialized || !isSummarizerAvailable) return;

    const message = messages.find((m) => m.id === messageId);
    if (!message || message.text.trim().split(/\s+/).length <= 150) return;

    setIsLoading(true);
    setError("");

    try {
      const summarizer = await self.ai.summarizer.create({
        type: "key-points",
        format: "markdown",
        length: "medium",
      });

      const summary = await summarizer.summarize(message.text);
      if (!summary) throw new Error("No summary was generated");

      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === messageId) {
            const hasSummary = m.processed.some((p) => p.type === "summary");
            if (hasSummary) return m;

            return {
              ...m,
              processed: [
                ...m.processed,
                {
                  type: "summary",
                  content: summary,
                },
              ],
            };
          }
          return m;
        })
      );
    } catch (err) {
      setError(`Summarization failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="main-content">
        <div className="chat-container">
          <ChatBoxComp
            messages={messages}
            inputText={inputText}
            setInputText={setInputText}
            onSendMessage={handleSendMessage}
            onTranslate={handleTranslate}
            onSummarize={handleSummarize}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            isLoading={isLoading}
          />
        </div>
      </main>
      {messages.length > 0 && (
        <InputText
          inputText={inputText}
          setInputText={setInputText}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
}

export default App;