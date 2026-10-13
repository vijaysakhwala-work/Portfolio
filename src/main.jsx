import React from 'react';
import {hydrateRoot,createRoot} from 'react-dom/client';
import App from './App';
import './styles.css';
import './redesign.css';
import './journeys.css';
import './beam-hero.css';
const root=document.getElementById('root');
if(root.dataset.prerendered==='true')hydrateRoot(root,<App path={window.location.pathname}/>);
else createRoot(root).render(<App path={window.location.pathname}/>);

import './responsive.css';
