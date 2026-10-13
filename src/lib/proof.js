/* ============================================================
   SITE CONFIG: the one place to fill in what we don't know yet.
   null, '' or [] means blank. Blank slots show as dashed placeholders.
   Set showBlanks to false at launch to hide every empty slot.
   Never add a certificate, client logo, award or quote that is not real.
   ============================================================ */
export const PROOF = {
  showBlanks: true,

  /* Numbers: add only verified figures. value: 12 shows "12+" and counts up. */
  stats: [
    { label: 'Years of experience', value: null, suffix: '+' },
    { label: 'Clients served', value: null, suffix: '+' },
    { label: 'Projects delivered', value: null, suffix: '+' },
    { label: 'Engineers', value: null, suffix: '+' },
    { label: 'Client retention', value: null, suffix: '%' }
  ],

  /* Client logos: { name, logo: '/images/clients/x.png', url } and only with the client's permission */
  clients: [],

  /* Set held: true only when Cubusify really holds it, and fill in the proof. */
  certifications: [
    { mark: '9001',  name: 'ISO 9001',      topic: 'Quality management systems',                    held: false, issuer: null, number: null, validUntil: null, verifyUrl: null },
    { mark: '27001', name: 'ISO/IEC 27001', topic: 'Information security management',               held: false, issuer: null, number: null, validUntil: null, verifyUrl: null },
    { mark: 'SOC',   name: 'AICPA SOC',     topic: 'Security and service organization controls',    held: false, issuer: null, number: null, validUntil: null, verifyUrl: null },
    { mark: 'GDPR',  name: 'GDPR',          topic: 'EU personal data protection',                   held: false, issuer: null, number: null, validUntil: null, verifyUrl: null },
    { mark: 'HIPAA', name: 'HIPAA',         topic: 'US health information privacy',                 held: false, issuer: null, number: null, validUntil: null, verifyUrl: null },
    { mark: 'PCI',   name: 'PCI DSS',       topic: 'Payment card data security',                    held: false, issuer: null, number: null, validUntil: null, verifyUrl: null },
    { mark: 'CLD',   name: 'Cloud partner', topic: 'AWS, Google Cloud or Microsoft partner status', held: false, issuer: null, number: null, validUntil: null, verifyUrl: null },
    { mark: '+',     name: 'Another certificate', topic: 'Anything else worth showing',             held: false, issuer: null, number: null, validUntil: null, verifyUrl: null }
  ],

  awards: [],        /* { name, year, issuer, image } */
  testimonials: [],  /* { quote, name, company, project } approved by the client */

  leadership: [
    { name: 'Vijay Sakhwala', role: 'Founder', photo: null }, // the founder photo comes from public/images/people/founder.(webp|jpg|png)
    { name: null, role: 'CTO' },
    { name: null, role: 'Head of Delivery' }
  ],

  contact: { email: 'hello@cubusify.com', phone: null, whatsapp: null },   /* whatsapp: digits with country code, e.g. '911234567890' */

  offices: [
    { city: 'Surat', country: 'India', address: null },
    { city: null, country: null, address: null },
    { city: null, country: null, address: null },
    { city: null, country: null, address: null }
  ],

  social: { linkedin: null, x: null, instagram: null, facebook: null, youtube: null, github: null },   /* full profile URLs */
  legal: { companyName: null, registrationNo: null, taxId: null },
  hire: { rate: null, availability: null, pricing: null, minimumTerm: null }
};
export const blank = v => v == null || v === '' || (Array.isArray(v) && !v.length);
