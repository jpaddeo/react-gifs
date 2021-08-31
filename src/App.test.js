import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import SearchResults from './pages/SearchResults';

test('renders without crashing', async () => {
  render(<App />);
  const ultimaBusqueda = screen.getByText(/Ultima búsqueda/i);
  expect(ultimaBusqueda).toBeInTheDocument();
  const tendencias = await screen.findByText(/Tendencias/i);
  expect(tendencias).toBeInTheDocument();
});

test('search form could be used', async () => {
  render(<App />);
  const inputSearch = await screen.findByRole('textbox');
  fireEvent.change(inputSearch, {target: { value: 'Ecuador' }});
  fireEvent.keyPress(inputSearch, {key: 'Enter', code: 'Enter'});
  const resultTitle = await screen.findByText(/Ecuador/i);
  expect(resultTitle).toBeVisible();
});
