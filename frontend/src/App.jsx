import Router from './routes/Router';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Router/>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default App
