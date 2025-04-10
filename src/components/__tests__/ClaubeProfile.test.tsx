import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClaubeProfile from '../ClaubeProfile';

describe('ClaubeProfile Component', () => {
  test('renders metadata correctly', () => {
    render(<ClaubeProfile />);
    expect(screen.getByText(/Species:/)).toBeInTheDocument();
    expect(screen.getByText(/Traits:/)).toBeInTheDocument();
    expect(screen.getByText(/Origin:/)).toBeInTheDocument();
    expect(screen.getByText(/Motto:/)).toBeInTheDocument();
  });

  test('displays initial witty caption', () => {
    render(<ClaubeProfile />);
    const caption = screen.getByText(/"/);
    expect(caption).toBeInTheDocument();
  });

  test('cycles to next witty caption on button click', () => {
    render(<ClaubeProfile />);
    const initialCaption = screen.getByText(/"/).textContent;
    const button = screen.getByRole('button', { name: /Next Wit/i });
    fireEvent.click(button);
    const newCaption = screen.getByText(/"/).textContent;
    expect(newCaption).not.toBe(initialCaption);
  });

  test('renders SVG avatar', () => {
    render(<ClaubeProfile />);
    const svgElement = screen.getByText(/Claube/);
    expect(svgElement).toBeInTheDocument();
  });
});