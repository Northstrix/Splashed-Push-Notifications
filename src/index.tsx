import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SplashedPushNotifications from './splashed-push-notifications';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SplashedPushNotifications />
  </React.StrictMode>
);

