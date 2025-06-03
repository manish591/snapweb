import { createRoot } from 'react-dom/client';
import '@repo/ui/globals.css';
import App from './app';

function Main() {
  return (
    <div>
      <App />
    </div>
  );
}

createRoot(document.getElementById('app')!).render(<Main />);
