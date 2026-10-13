/* ============================================================
   PICTURES: every screenshot and photo on the site, by key.
   The site currently ships with NO pictures: each one is an empty image holder (dashed frame with a label).
   To fill a holder, either
   1. drop the file in the matching folder, named after its key (see scripts/scan-images.mjs), and restart `npm run dev`, or
   2. set its path by hand below (this wins over the folder).
   Keys:  svc-<service>        e.g. svc-web              (service pages and menu preview)
          ai-<item>            e.g. ai-ai-assistants     (AI menu preview)
          work-<project>       e.g. work-haven           (work pages and menu preview)
          industry-<slug>      e.g. industry-healthcare  (home gallery and the Industries menu)
          industry-page-<slug> e.g. industry-page-healthcare (Industries index tiles and each industry page)
          founder                                        (About page and home)
   The old pictures were moved to _local/archive/images (outside the site) and can be copied back.
   ============================================================ */
import { FOUND } from './images.gen.js';

export const IMAGES = {
  ...FOUND,
  /* 'svc-web': '/images/shots/svc-web.webp', */
};
export const imageFor = key => IMAGES[key] || null;
