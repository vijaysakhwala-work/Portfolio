import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Palette from './Palette';
import { PROOF, blank } from '../lib/proof';

const Sprite = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    <symbol id="cube" viewBox="0 0 24 24"><path d="M12 2.6 20.2 7.2 12 11.8 3.8 7.2Z" fill="#35c6f2" /><path d="M3.8 8.3 11.3 12.6V21.4L3.8 17Z" fill="#0965ff" /><path d="M20.2 8.3 12.7 12.6V21.4L20.2 17Z" fill="#ff7435" /></symbol>
    <symbol id="i-chev" viewBox="0 0 12 12"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
    <symbol id="i-search" viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></symbol>
    <symbol id="i-copy" viewBox="0 0 20 20"><rect x="7" y="7" width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" strokeWidth="1.6" /></symbol>
    <symbol id="i-sun" viewBox="0 0 20 20"><circle cx="10" cy="10" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></symbol>
    <symbol id="i-moon" viewBox="0 0 20 20"><path d="M16.5 11.6A6.8 6.8 0 0 1 8.4 3.5a6.8 6.8 0 1 0 8.1 8.1Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></symbol>
    <symbol id="i-menu" viewBox="0 0 20 20"><path d="M3 6h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></symbol>
    <symbol id="i-close" viewBox="0 0 20 20"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></symbol>
  </svg>
);

export default function Layout({ children }) {
  const wa = PROOF.contact.whatsapp;
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Sprite />
      <Header />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
      <Palette />
      {!blank(wa) && <a className="wa" href={'https://wa.me/' + wa + '?text=' + encodeURIComponent('Hi Cubusify, I would like to discuss a project.')} target="_blank" rel="noopener">Chat on WhatsApp</a>}
    </>
  );
}
