import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock performance.now if not available
if (typeof performance === 'undefined') {
  global.performance = { now: () => Date.now() } as any;
}

// Mock fetch if not available
if (typeof fetch === 'undefined') {
  global.fetch = vi.fn();
}

// Mock globalThis if needed
if (typeof globalThis === 'undefined') {
  (global as any).globalThis = global;
}

// Mock React's act function for testing
global.act = (callback: () => void) => {
  callback();
  return Promise.resolve();
};
