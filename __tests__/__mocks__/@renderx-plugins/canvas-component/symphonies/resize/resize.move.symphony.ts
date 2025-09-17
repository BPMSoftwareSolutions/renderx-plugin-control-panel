// Mock implementation for canvas component resize symphony
import { vi } from 'vitest';

export const handlers = {
  resize: vi.fn((data: any, ctx: any) => {
    // Mock resize handler
    const element = document.getElementById(data.id);
    if (element && data.dimensions) {
      element.style.width = `${data.dimensions.width}px`;
      element.style.height = `${data.dimensions.height}px`;
    }
    ctx.payload = { element, resized: true, dimensions: data.dimensions };
    return ctx;
  }),

  updateSize: vi.fn((data: any, ctx: any) => {
    // Mock size update
    const element = document.getElementById(data.id);
    if (element && data.dimensions) {
      element.style.width = `${data.dimensions.width}px`;
      element.style.height = `${data.dimensions.height}px`;
    }
    ctx.dimensions = data.dimensions;
    return ctx;
  })
};
