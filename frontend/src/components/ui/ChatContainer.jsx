import "./ChatContainer.css";
import { useState, useEffect, useRef } from "react";
import { VscSend } from "react-icons/vsc";
import { sendQuery } from "../../services/leads";
import { marked } from "marked";
import { initaliseConvo, intakeSubmit, uploadDocument } from "../../services/chat";
import { ClipLoader } from "react-spinners";

const ChatContainer = ({ onClose }) => {
  const [messages, setMessages] = useState([
  ]);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const [intakeDone, setIntakeDone] = useState(
    localStorage.getItem("intake_done") === "true"
  );
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const handleFiles = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (
        selectedFile.type.startsWith("image/") ||
        selectedFile.type === "application/pdf"
      ) {
        const preview = URL.createObjectURL(selectedFile);
        setPreviewUrl(preview);
      } else {
        setPreviewUrl(null);
      }
    }
  };
  const handleFileSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('document', file);
    setIsUploading(true);
    const response = await uploadDocument(formData);
    setIsUploading(false);
    if(response?.success) {
      console.log(response.fileurl)
      handleIntakeSubmit(response.fileurl);
    }
    else if(response?.error?.msg) {
      toast.error(response?.error?.msg);
      return;
    }

  }

  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    const initialise = async () => {
      if(localStorage.getItem('intake_done')=== "true") {
        const aiResponse = {
          sender:'ai',
          text:"Hello, I'm Lawdog, your friendly legal AI assistant how can I help you today?"
        }
        setMessages((prev) => [...prev, aiResponse]);
        return;
      }
      const response = await initaliseConvo();

      if (response?.error) {
        const aiResponse = {
          sender: "ai",
          text: "useAn unknown network error has occured please try again later",
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        localStorage.setItem("intake_id", response.intake_id);
        const aiResponse = {
          sender: "ai",
          text: response.question,
        };
        setMessages((prev) => [...prev, aiResponse]);
        console.log("Conversation initalised");
      }
    };
    initialise();
  }, []);
  const scheduleButtonHTML = `<div class="schedule-button-wrapper">
         <a class="schedule-button" href="http://localhost:5173/schedule.com" target="_blank">
           🗓️ Schedule a Consultation
         </a>
       </div>`;

  const optionsButtonHtml = "";
  const getPageContext = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("small-claims")) return "small_claims";
    else return "General";
  };
  const handleIntakeSubmit = async (answer) => {
    setIsDisabled(false);
    const data = {
      intake_id: localStorage.getItem("intake_id"),
      answer,
    };
    console.log(data);
    const response = await intakeSubmit(data);
    if (response?.error) {
      const aiResponse = {
        sender: "ai",
        text: "An unknown network error has occured please try again later",
      };
      setMessages((prev) => [...prev, aiResponse]);
    } else if (response?.upload) {
      setIsDisabled(true);
      const aiResponse = {
        sender: "ai",
        text: response.question,
        upload: true,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } else if (response?.options) {
      setIsDisabled(true);
      const aiResponse = {
        sender: "ai",
        text: response.question,
        options: response.options,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } else if (response?.completed) {
      localStorage.setItem("intake_done", "true");
      setIntakeDone(true);
      const aiResponse = {
        sender: "ai",
        text: response.msg,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response.question },
      ]);
    }

    setIsTyping(false);
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setIsTyping(true);
    if (!intakeDone) {
      handleIntakeSubmit(query);
      return;
    }
    try {
      const form = {
        message: query,
        page_context: getPageContext(),
      };

      const response = await sendQuery(form);
      console.log("AI Response:", response);

      if (response?.success) {
        const aiText = response.response.ai_answer_text;

        const aiResponse = {
          sender: "ai",
          text: marked.parse(aiText),
        };

        setMessages((prev) => [...prev, aiResponse]);

        if (response.response.suggest_schedule) {
          const scheduleButton = {
            sender: "ai",
            text: `
      <div class="schedule-button-wrapper">
        <a class="schedule-button" href="https://www.legaleasier.org/schedule" target="_blank">
          🗓️ Schedule a Consultation
        </a>
      </div>
    `,
          };

          setMessages((prev) => [...prev, scheduleButton]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "An unknown network error has occurred. Please try again later.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (option) => {
    if(option === "other_flow")  {
          setMessages((prev) => [...prev, { sender: "user", text: 'Other' }]);

      handleIntakeSubmit(option);
      return;
    }
    setMessages((prev) => [...prev, { sender: "user", text: option }]);
    handleIntakeSubmit(option);
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>
          Lawdog AI <span className="beta">Beta</span>
        </h3>
        <button className="chat-close" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message-wrapper ${msg.sender}`}>
            {msg.sender === "ai" ? (
              <>
                <div
                  className="chat-message ai-message"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
                {msg.options && (
                  <div className="options">
                    {msg.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleOptionClick(option);
                        }}
                      >
                       {option === "Eviction"
  ? "I want to evict someone"
  : option=== "other_flow" ? "Other" : option}

                      </button>
                    ))}
                  </div>
                )}
                {msg.upload && (
                  <div className="file-upload-wrapper">
                    <form
                      className="file-upload-form"
                      onSubmit={handleFileSubmit}
                    >
                      <div className="file-input-container">
                        <input
                          type="file"
                          id="file-upload"
                          className="file-input"
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          onChange={handleFiles}
                        />

                        <label
                          htmlFor="file-upload"
                          className="file-input-label"
                        >
                          <span className="browse-text">Choose a file</span>
                          <span className="browse-button">Browse</span>
                        </label>
                      </div>

                      {file && (
                        <div className="mt-4">
                          <p>
                            <strong>Selected:</strong> {file.name}
                          </p>
                          <p>
                            <strong>Size:</strong>{" "}
                            {(file.size / 1024).toFixed(2)} KB
                          </p>

                          {previewUrl && file.type.startsWith("image/") && (
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="mt-2 max-h-40 border rounded"
                            />
                          )}

                          {previewUrl && file.type === "application/pdf" && (
                            <iframe
                              src={previewUrl}
                              title="PDF Preview"
                              className="mt-2 w-full h-64"
                            />
                          )}
                        </div>
                      )}

                      <button type="submit" className="submit-button mt-4" disabled={isUploading}>
                        {isUploading ? <ClipLoader/> :"Upload Document"}
                      </button>
                      <button type="submit" className="submit-button" onClick={()=>handleIntakeSubmit("Not available at the moment")}>
                        I do not have my document right now ..
                        
                      </button>
                    </form>
                  </div>
                )}
              </>
            ) : (
              <div className="chat-message user-message">{msg.text}</div>
            )}
            <small
              className={
                msg.sender === "ai" ? "sender-label" : "sender-user-label"
              }
            >
              {msg.sender === "ai" ? "Lawdog" : "You"}
            </small>
          </div>
        ))}

        {isTyping && (
          <div className="chat-message-wrapper ai">
            <div className="chat-message ai-message typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <small className="sender-label">Lawdog</small>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask AI....."
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
          disabled={isDisabled}
        />
        <button
          type="submit"
          className="chat-bot-send"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          <VscSend className="send-icon" />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
