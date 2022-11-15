import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {YMaps} from "@pbe/react-yandex-maps";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <YMaps>
      <App />
    </YMaps>
  </React.StrictMode>
);
