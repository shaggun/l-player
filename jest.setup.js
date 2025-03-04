require("@testing-library/jest-dom");

// Mock the Audio API
global.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
global.HTMLMediaElement.prototype.pause = jest.fn();
global.HTMLMediaElement.prototype.load = jest.fn();
global.HTMLMediaElement.prototype.addEventListener = jest.fn();
global.HTMLMediaElement.prototype.removeEventListener = jest.fn();