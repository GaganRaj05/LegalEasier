import './ChatContainer.css';
import { useState, useEffect, useRef } from 'react';
import { VscSend } from "react-icons/vsc";
import { sendQuery } from '../../services/leads';
import { marked } from 'marked';

const ChatContainer = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm Lawdog. How can I assist you further" }, 
  ]);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null); 

    const scheduleButtonHTML = `<div class="schedule-button-wrapper">
         <a class="schedule-button" href="http://localhost:5173/schedule.com" target="_blank">
           🗓️ Schedule a Consultation
         </a>
       </div>`
    ;

  const getPageContext = ()=> {
    const path = location.pathname.toLowerCase();
    if(path.includes('small-claims')) return 'small_claims';
    else return "General"

  }

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!query.trim()) return;

  const userMessage = { sender: 'user', text: query };
  setMessages(prev => [...prev, userMessage]);
  setQuery('');
  setIsTyping(true);
  try {
    const form = {
      convo_id: localStorage.getItem('convo_id'),
      message: query,
      page_context: getPageContext()
    };

    const response = await sendQuery(form); 
    console.log("AI Response:", response);

    if (response?.success) {
      const aiText = response.response.ai_answer_text;

      const aiResponse = {
        sender: 'ai',
        text: marked.parse(aiText)
      };

      setMessages(prev => [...prev, aiResponse]);

if (response.response.suggest_schedule) {

  const scheduleButton = {
    sender: 'ai',
    text: `
      <div class="schedule-button-wrapper">
        <a class="schedule-button" href="http://localhost:5173/schedule" target="_blank">
          🗓️ Schedule a Consultation
        </a>
      </div>
    `
  };

  setMessages(prev => [...prev, scheduleButton]);
}
    } else {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'An unknown network error has occurred. Please try again later.' }
      ]);
    }
  } catch (error) {
    setMessages(prev => [
      ...prev,
      { sender: 'ai', text: 'Something went wrong. Please try again.' }
    ]);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>Lawdog AI <span className='beta'>Beta</span></h3>
        <button className='chat-close' onClick={onClose}>✕</button>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message-wrapper ${msg.sender}`}>
            {msg.sender === 'ai' ? (
              <div
                className="chat-message ai-message"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ) : (
              <div className="chat-message user-message">
                {msg.text}
              </div>
            )}
            <small className={msg.sender === 'ai' ? "sender-label" : "sender-user-label"}>
              {msg.sender === 'ai' ? "Lawdog" : "You"}
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

      <div className='chat-input'>
        <input
          type="text"
          placeholder='Ask AI.....'
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e); }}
        />
        <button type='submit' className='chat-bot-send' onClick={handleSubmit}>
          <VscSend className='send-icon' />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
