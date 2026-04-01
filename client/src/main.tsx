import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return <div className="p-6 text-sm text-slate-700">Layer 1 foundation ready. UI will be built in later layers.</div>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
