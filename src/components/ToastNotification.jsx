// src/components/ToastNotification.jsx
import { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export const showToast = (message, type = 'success') => {
  const event = new CustomEvent('show-toast', { detail: { message, type } });
  window.dispatchEvent(event);
};

function ToastNotification() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const { message, type } = e.detail;
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 4000);
    };
    window.addEventListener('show-toast', handler);
    return () => window.removeEventListener('show-toast', handler);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
      {toasts.map(toast => (
        <div key={toast.id} className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg text-white text-sm ${toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
          {toast.type === 'success' && <CheckCircleIcon className="w-5 h-5" />}
          {toast.type === 'error' && <XCircleIcon className="w-5 h-5" />}
          {toast.type === 'info' && <InformationCircleIcon className="w-5 h-5" />}
          {toast.message}
        </div>
      ))}
    </div>
  );
}

export default ToastNotification;