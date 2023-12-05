import { render, screen } from '@testing-library/react';
import App from './App';

// Test to check if the 'learn react' text is present in the rendered App component
test('renders learn react link', () => {
  // Render the App component
  render(<App />);

  // Find the element containing the text 'learn react'
  const linkElement = screen.getByText(/learn react/i);

  // Expect the element to be present in the document
  expect(linkElement).toBeInTheDocument();
});
