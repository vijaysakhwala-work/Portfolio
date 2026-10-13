import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { PROOF } from './proof';

const Ctx = createContext(null);
export const useSite = () => useContext(Ctx);

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches); on();
    mq.addEventListener?.('change', on); return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduced;
}

/* Theme, toast, clipboard and the command palette live here so every page shares them. */
export function SiteProvider({ children }) {
  const [theme, setTheme] = useState(null);          /* null follows the system */
  const [isDark, setIsDark] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toastNode, setToastNode] = useState(null);
  const [toastShow, setToastShow] = useState(false);
  const toastEl = useRef(null), t1 = useRef(0), t2 = useRef(0);

  useEffect(() => {
    let saved = null; try { saved = localStorage.getItem('cubusify-theme'); } catch (e) {}
    if (saved === 'dark' || saved === 'light') { document.documentElement.setAttribute('data-theme', saved); setTheme(saved); }
    document.documentElement.setAttribute('data-blanks', PROOF.showBlanks ? 'on' : 'off');
  }, []);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const on = () => setIsDark(theme ? theme === 'dark' : mq.matches); on();
    mq.addEventListener?.('change', on); return () => mq.removeEventListener?.('change', on);
  }, [theme]);
  useEffect(() => { document.documentElement.classList.toggle('is-dark', isDark); }, [isDark]);

  const toggleTheme = useCallback(() => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('cubusify-theme', next); } catch (e) {}
    setTheme(next);
  }, [isDark]);

  const toast = useCallback(node => {
    setToastNode(node); setToastShow(true);
    const el = toastEl.current;
    try { if (el && el.showPopover && !el.matches(':popover-open')) el.showPopover(); } catch (e) {}
    clearTimeout(t1.current); clearTimeout(t2.current);
    t1.current = setTimeout(() => {
      setToastShow(false);
      t2.current = setTimeout(() => { try { if (el && el.hidePopover && el.matches(':popover-open')) el.hidePopover(); } catch (e) {} }, 300);
    }, 2200);
  }, []);

  const copy = useCallback((text, node) => {
    const done = () => toast(node || 'Copied');
    const fallback = () => {
      try { const t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t); done(); }
      catch (e) { toast('Press Ctrl+C to copy'); }
    };
    try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, fallback); return; } } catch (e) {}
    fallback();
  }, [toast]);

  const value = { theme, isDark, toggleTheme, paletteOpen, openPalette: () => setPaletteOpen(true), closePalette: () => setPaletteOpen(false), toast, copy };
  return (
    <Ctx.Provider value={value}>
      {children}
      <div className={'toast' + (toastShow ? ' show' : '')} id="toast" popover="manual" role="status" aria-live="polite" ref={toastEl}>{toastNode}</div>
    </Ctx.Provider>
  );
}
