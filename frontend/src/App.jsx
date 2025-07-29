import Router from './routes/Router';
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from 'react';

const ChatIcon = lazy(() => import('./components/layout/ChatIcon'));
function App() {

  return (
    <>
      <Router/>
      <ToastContainer position="top-center" autoClose={3000} />
            <Suspense fallback={null}>
        <ChatIcon />
      </Suspense>

    </>
  )
}

export default App
