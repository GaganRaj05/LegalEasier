import Router from './routes/Router';
import { ToastContainer } from 'react-toastify';
import ChatIcon from './components/layout/ChatIcon';
function App() {

  return (
    <>
      <Router/>
      <ToastContainer position="top-center" autoClose={3000} />
      <ChatIcon/>
    </>
  )
}

export default App
