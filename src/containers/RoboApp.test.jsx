import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, afterEach } from 'vitest';
import RoboApp, { USERS_URL } from './RoboApp';
import { robots } from '../robots';

function mockFetchSuccess(data = robots) {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    status: 200,
    json: () => Promise.resolve(data),
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

test('shows Loading... and then a card for every robot', async () => {
  const fetchSpy = mockFetchSuccess();
  render(<RoboApp />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('RoboFriends')).toBeInTheDocument();
  expect(fetchSpy).toHaveBeenCalledWith(USERS_URL);
  expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(robots.length);
});

test('filters robots by name, ignoring capitals', async () => {
  mockFetchSuccess();
  render(<RoboApp />);
  const search = await screen.findByLabelText('Search robots by name');

  fireEvent.change(search, { target: { value: 'LEANNE' } });

  expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
  expect(screen.queryByText('Ervin Howell')).not.toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
});

test('shows a message when no robots match the search', async () => {
  mockFetchSuccess();
  render(<RoboApp />);
  const search = await screen.findByLabelText('Search robots by name');

  fireEvent.change(search, { target: { value: 'zzz' } });

  expect(screen.getByText('No robots match "zzz".')).toBeInTheDocument();
});

test('shows an error with a retry button when the robots cannot be loaded', async () => {
  const fetchSpy = vi.spyOn(globalThis, 'fetch')
    .mockRejectedValueOnce(new Error('Network down'))
    .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(robots) });
  render(<RoboApp />);

  expect(await screen.findByRole('alert')).toHaveTextContent('Could not load the robots');
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

  expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
  expect(fetchSpy).toHaveBeenCalledTimes(2);
});

test('treats an HTTP error response as a failed load', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 500, json: () => Promise.resolve({}) });
  render(<RoboApp />);

  expect(await screen.findByRole('alert')).toHaveTextContent('Could not load the robots');
});
