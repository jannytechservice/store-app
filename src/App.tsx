import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRouter from './routes';
import ErrorBoundaryPage from './pages/error-boundary-page';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        theme="colored"
        limit={3}
        autoClose={4000}
        hideProgressBar
        closeButton={false}
        closeOnClick
        transition={Slide}
        style={{
          fontSize: '1.125rem',
          fontWeight: '500',
          lineHeight: '105%',
          marginTop: '7rem',
        }}
      />
      <ErrorBoundary FallbackComponent={ErrorBoundaryPage}>
        <AppRouter />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
