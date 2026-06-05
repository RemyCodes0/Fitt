import { useState, useEffect, useCallback } from "react";

// ─── Simple in-memory cart store with localStorage persistence ────────────────

let listeners = [];
let state = { items: [] };

function loadFromStorage() {
  try {
    const saved = localStorage.getItem("fitt-cart");
    if (saved) state = JSON.parse(saved);
  } catch {}
}

function saveToStorage() {
  try {
    localStorage.setItem("fitt-cart", JSON.stringify(state));
  } catch {}
}

function notify() {
  saveToStorage();
  listeners.forEach((l) => l({ ...state }));
}

loadFromStorage();

export function useCart() {
  const [cart, setCart] = useState({ ...state });

  useEffect(() => {
    listeners.push(setCart);
    return () => { listeners = listeners.filter((l) => l !== setCart); };
  }, []);

  const add = useCallback((item) => {
    const existing = state.items.find((i) => i.id === item.id);
    if (existing) {
      state = { items: state.items.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) };
    } else {
      state = { items: [...state.items, { ...item, qty: 1 }] };
    }
    notify();
  }, []);

  const remove = useCallback((id) => {
    state = { items: state.items.filter((i) => i.id !== id) };
    notify();
  }, []);

  const setQty = useCallback((id, qty) => {
    if (qty <= 0) {
      state = { items: state.items.filter((i) => i.id !== id) };
    } else {
      state = { items: state.items.map((i) => i.id === id ? { ...i, qty } : i) };
    }
    notify();
  }, []);

  const clear = useCallback(() => {
    state = { items: [] };
    notify();
  }, []);

  const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.items.reduce((sum, i) => sum + i.qty, 0);

  return { items: cart.items, add, remove, setQty, clear, total, count };
}

// Prevents hydration mismatch — not needed in Vite but kept for safety
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
}

// Generates a placeholder image from Unsplash based on the query
export function productImage(query) {
  const encoded = encodeURIComponent(query || "fashion clothing");
  return `https://source.unsplash.com/400x500/?${encoded}`;
}