import React from 'react';
import { createRoot } from 'react-dom/client';
import 'tachyons';
import './index.css';
import RoboApp from './containers/RoboApp';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='tc'>
      <RoboApp />
    </div>
  </React.StrictMode>
);
