import * as seedData from './seed';

const STORE_PREFIX = 'ceids_';

export function getStore(key) {
  try {
    const raw = localStorage.getItem(STORE_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setStore(key, data) {
  try { localStorage.setItem(STORE_PREFIX + key, JSON.stringify(data)); return true; }
  catch { return false; }
}

export function removeStore(key) {
  localStorage.removeItem(STORE_PREFIX + key);
}

export function getCollection(name) {
  const data = getStore(name);
  if (data === null) {
    const seeded = seedData[name] || [];
    setStore(name, seeded);
    return seeded;
  }
  return data;
}

export function addToCollection(name, item) {
  const col = getCollection(name);
  const newItem = { ...item, id: Date.now() + Math.floor(Math.random() * 1000) };
  col.push(newItem);
  setStore(name, col);
  return newItem;
}

export function updateInCollection(name, id, updates) {
  const col = getCollection(name);
  const idx = col.findIndex(item => item.id === id);
  if (idx === -1) return null;
  col[idx] = { ...col[idx], ...updates };
  setStore(name, col);
  return col[idx];
}

export function removeFromCollection(name, id) {
  const col = getCollection(name);
  const filtered = col.filter(item => item.id !== id);
  setStore(name, filtered);
  return filtered;
}

export function getById(name, id) {
  const col = getCollection(name);
  return col.find(item => item.id === id) || null;
}

export function queryCollection(name, predicate) {
  const col = getCollection(name);
  return col.filter(predicate);
}
