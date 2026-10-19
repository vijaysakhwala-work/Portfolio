import React from 'react';
import {hydrateRoot,createRoot} from 'react-dom/client';
import App from './App';
import {loadPage} from './page-loader';
import './styles.css';
import './redesign.css';
import './beam-hero.css';
import './responsive.css';
import './improvements.css';
import './experience.css';
import './theme.css';
import './theme-palette.css';
import './refinements.css';
import './review-fixes.css';
async function start(){const path=window.location.pathname.replace(/\/$/,'')||'/';const Page=await loadPage(path);const root=document.getElementById('root');if(root.dataset.prerendered==='true')hydrateRoot(root,<App path={path} Page={Page}/>);else createRoot(root).render(<App path={path} Page={Page}/>)}
start().catch(error=>{console.error(error);const message=document.createElement('p');message.textContent='Interactive features could not load. Please refresh, or use the links on this page.';message.setAttribute('role','status');document.body.appendChild(message)});

import "./polish.css";
