// A simple debugging file that logs the articles
import { articles } from './data/articlesCollection.js';

// Log the articles array
console.log('Articles:', articles);

// Add error handling for common issues
window.addEventListener('error', (event) => {
  console.error('Caught in global handler:', event.error);
});

// Monitor React errors
if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args[0]?.includes && args[0].includes('The above error occurred in')) {
      console.log('React Error Details:', args);
    }
    originalConsoleError.apply(console, args);
  };
}
