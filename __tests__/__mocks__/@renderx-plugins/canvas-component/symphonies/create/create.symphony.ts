// Mock implementation for canvas component create symphony
import { vi } from 'vitest';

export const handlers = {
  create: vi.fn((data: any, ctx: any) => {
    // Mock create handler - simulates creating a component
    const element = document.createElement(data.tag || 'div');
    element.id = data.id || 'mock-element';
    element.textContent = data.text || '';
    
    if (data.classes) {
      element.className = data.classes.join(' ');
    }
    
    if (data.dimensions) {
      element.style.width = `${data.dimensions.width}px`;
      element.style.height = `${data.dimensions.height}px`;
      element.style.position = 'absolute';
    }
    
    if (data.position) {
      element.style.left = `${data.position.x}px`;
      element.style.top = `${data.position.y}px`;
    }
    
    const canvas = document.getElementById('rx-canvas');
    if (canvas) {
      canvas.appendChild(element);
    }
    
    ctx.payload = { element, id: element.id };
    return ctx;
  })
};
