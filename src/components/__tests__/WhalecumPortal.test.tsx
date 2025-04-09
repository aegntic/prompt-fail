import { render, screen } from '@testing-library/react';
import WhalecumPortal from '../WhalecumPortal';

test('renders Whalecum Portal heading', () => {
  render(<WhalecumPortal />);
  expect(screen.getByText(/Whalecum Portal/i)).toBeInTheDocument();
});