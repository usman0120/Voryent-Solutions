// Simple in-memory cache for Firebase data
interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }
  
  return entry.data as T;
}

export function setCacheWithPrune<T>(key: string, data: T, ttlMs: number): void {
  // Prune expired entries to prevent memory leaks over time
  for (const [k, v] of cache.entries()) {
    if (Date.now() > v.expiry) {
      cache.delete(k);
    }
  }
  
  cache.set(key, {
    data,
    expiry: Date.now() + ttlMs
  });
}
