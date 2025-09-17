// Mock implementation for @renderx-plugins/canvas-component
import { vi } from 'vitest';

// Mock handlers for canvas component operations
export const handlers = {
  resolveTemplate: vi.fn((data: any, ctx: any) => {
    // Mock template resolution
    const template = data.component?.template || {};
    ctx.payload = { template, resolved: true };
    return ctx;
  }),

  createNode: vi.fn((data: any, ctx: any) => {
    // Mock node creation
    const position = data.position || { x: 0, y: 0 };
    const template = ctx.payload?.template || {};
    const element = document.createElement(template.tag || 'button');
    element.id = `mock-node-${Date.now()}`;
    element.textContent = template.text || '';
    element.style.position = 'absolute';
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;

    if (template.classes) {
      element.className = template.classes.join(' ');
    }

    const canvas = document.getElementById('rx-canvas');
    if (canvas) {
      canvas.appendChild(element);
    }

    ctx.payload = { element, id: element.id, nodeId: element.id, position };
    return ctx;
  }),

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
    }
    
    const canvas = document.getElementById('rx-canvas');
    if (canvas) {
      canvas.appendChild(element);
    }
    
    ctx.payload = { element, id: element.id };
    return ctx;
  }),
  
  update: vi.fn((data: any, ctx: any) => {
    // Mock update handler
    const element = document.getElementById(data.id);
    if (element && data.text !== undefined) {
      element.textContent = data.text;
    }
    ctx.payload = { element, updated: true };
    return ctx;
  }),
  
  drag: vi.fn((data: any, ctx: any) => {
    // Mock drag handler
    const element = document.getElementById(data.id);
    if (element && data.position) {
      element.style.left = `${data.position.x}px`;
      element.style.top = `${data.position.y}px`;
    }
    ctx.payload = { element, dragged: true };
    return ctx;
  }),
  
  resize: vi.fn((data: any, ctx: any) => {
    // Mock resize handler
    const element = document.getElementById(data.id);
    if (element && data.dimensions) {
      element.style.width = `${data.dimensions.width}px`;
      element.style.height = `${data.dimensions.height}px`;
    }
    ctx.payload = { element, resized: true };
    return ctx;
  }),

  refreshControlPanel: vi.fn((data: any, ctx: any) => {
    // Mock refresh control panel handler
    const elementId = ctx.payload?.elementId;
    if (ctx.conductor?.play && elementId) {
      ctx.conductor.play(
        "ControlPanelPlugin",
        "control-panel-update-symphony",
        { id: elementId, source: "attribute-update" }
      );
    }
    ctx.payload = { refreshed: true };
    return ctx;
  }),

  updateAttribute: vi.fn((data: any, ctx: any) => {
    // Mock attribute update handler
    const element = document.getElementById(data.id);
    if (element) {
      if (data.attribute === 'content') {
        element.textContent = data.value;
      } else if (data.attribute === 'bg-color' || data.attribute === 'backgroundColor') {
        element.style.backgroundColor = data.value;
      } else if (data.attribute === 'width') {
        element.style.width = `${data.value}px`;
      } else if (data.attribute === 'height') {
        element.style.height = `${data.value}px`;
      }
    }
    ctx.payload = { element, updated: true, attribute: data.attribute, value: data.value };
    return ctx;
  })
};

// Export default handlers
export default handlers;
