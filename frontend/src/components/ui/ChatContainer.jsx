import './ChatContainer.css';

const ChatContainer = ({ onClose }) => {
  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>Lawdog AI</h3>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="chat-body">
        <p>Hi! I'm Lawdog. How can I assist you further?</p>
      </div>
    </div>
  );
};

export default ChatContainer;
