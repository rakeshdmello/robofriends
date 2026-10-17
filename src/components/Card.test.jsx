import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

test('shows the robot name, email and a 200x200 robot image', () => {
  render(<Card id={3} name='Clementine Bauch' email='Nathan@yesenia.net' />);

  expect(screen.getByRole('heading', { name: 'Clementine Bauch' })).toBeInTheDocument();
  expect(screen.getByText('Nathan@yesenia.net')).toBeInTheDocument();

  const image = screen.getByRole('img', { name: 'Robot avatar for Clementine Bauch' });
  expect(image).toHaveAttribute('src', 'https://robohash.org/3?size=200x200');
});
