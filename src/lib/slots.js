/* ============================================================
   IMAGE SLOTS: every empty picture frame on the services pages.
   Each slot is empty on purpose. To fill one, put the file in public/images/ and set its path here.
   Example:  '/services/web': { desktop: '/images/slots/web-desktop.webp', mobile: '/images/slots/web-mobile.webp' }
   A slot with no path shows a dashed placeholder (hidden at launch when PROOF.showBlanks is false).
   Blog images are filled in the post itself: cover.src and a figure block's src (src/content/blog-*.js).
   ============================================================ */
export const SLOT_IMAGES = {
  /* '/services/web': { desktop: null, mobile: null, alt: 'Desktop and mobile view of a web project' }, */
};
export const slotFor = path => SLOT_IMAGES[path] || {};
