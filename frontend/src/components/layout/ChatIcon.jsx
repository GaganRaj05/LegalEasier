import { useState } from 'react';
import './ChatIcon.css'; 
import Leads from '../ui/Leads';

const ChatIcon = () => {
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);

  const toggleChat = () => {
    setIsLeadsOpen(true);
  };

  const handleCloseLeads = () => {
    setIsLeadsOpen(false);
  };

  return (
    <div className="chat-container">
      <button className="chat-icon" onClick={toggleChat}>
        💬
      </button>
      {isLeadsOpen && <Leads onClose={handleCloseLeads} />}
    </div>
  );
};

export default ChatIcon;