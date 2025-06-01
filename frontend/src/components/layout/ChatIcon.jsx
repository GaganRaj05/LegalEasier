import { useState } from 'react';
import './ChatIcon.css'; 
import Leads from '../ui/Leads';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";


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
        <IoChatbubbleEllipsesSharp style={{width:'100%', height:'100%'}}/>
      </button>
      {isLeadsOpen && <Leads onClose={handleCloseLeads} />}
    </div>
  );
};

export default ChatIcon;