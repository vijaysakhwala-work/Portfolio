// Holds the long-form text of the page that is open. Filled by preload() before React renders or hydrates.
const store = new Map();
export const setHeavy = (key, value) => store.set(key, value);
export const getHeavy = key => store.get(key) || null;
