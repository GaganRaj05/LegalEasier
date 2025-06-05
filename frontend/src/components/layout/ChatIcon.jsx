import { useState } from 'react';
import './ChatIcon.css'; 
import Leads from '../ui/Leads';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ChatBox from '../ui/ChatBox';

const ChatIcon = () => {
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsLeadsOpen(true);
  };

  const handleCloseLeads = () => {
    setIsLeadsOpen(false);
  };

  const handleLeadSubmissionComplete = () => {
    setIsLeadsOpen(false);
    setIsChatOpen(true);
  };

  const closeChatBox = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="chat-container">
      <button className="chat-icon" onClick={toggleChat}>
        <DotLottieReact
          src="https://lottie.host/80351646-58bd-4a4d-a055-c8ca6e71887d/9SnQ20ewAS.lottie"
          loop
          autoplay
        />
      </button>

      {isLeadsOpen && <Leads onClose={()=>setIsLeadsOpen(false)} onSubmission={handleLeadSubmissionComplete} />}
      {isChatOpen && <ChatBox onClose={closeChatBox} />}
    </div>
  );
};

export default ChatIcon;
