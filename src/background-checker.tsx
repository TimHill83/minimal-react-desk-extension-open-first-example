import React from 'react';
import { Background } from './components/Background';
import './tailwind.css';
import { createRoot } from 'react-dom/client';

const modalRootElement = document.getElementById('root');
const modalRoot = createRoot(modalRootElement!);

modalRoot.render(<Background />);
