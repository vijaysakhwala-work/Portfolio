import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import { preload } from './content/preload';
import './styles/site.css';
import './styles/pages.css';
import './styles/content.css';
import './styles/services.css';

const root = document.getElementById('root');
const path = window.location.pathname.replace(/\/$/, '') || '/';
const prerendered = root.dataset.prerendered === 'true';
// The long text of a service page or blog post is a separate chunk. Load it first so hydration matches the prerendered HTML.
preload(path).catch(() => {}).then(() => {
  if (prerendered) hydrateRoot(root, <App path={window.location.pathname} />);
  else createRoot(root).render(<App path={window.location.pathname} />);
});
