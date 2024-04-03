import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App.jsx';
import {StateProvider} from '../store/index.jsx';

// Use createRoot to mount your app
const root = createRoot(document.getElementById('root'));
root.render(<StateProvider><App /></StateProvider>);