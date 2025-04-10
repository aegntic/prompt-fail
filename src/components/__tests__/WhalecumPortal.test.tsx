jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    __esModule: true,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: new Proxy({}, {
      get: () =>
        ({ children }: { children: React.ReactNode }) => <>{children}</>,
    }),
  };
});

import { render, screen } from '@testing-library/react';
import Whalecum2FaiL from '../Whalecum2FaiL';

test('renders a dynamic Whalecum greeting', () => {
  render(<Whalecum2FaiL />);
  const greetings = [
    'Whalecum, brave explorer!',
    'Dive deep, code whale!',
    'Surf’s up in the prompt sea!',
    'Ready to breach the AI abyss?',
    'Ahoy! Prepare for prompt peril!',
    'Welcome aboard, misfit wrangler!',
    'Set sail for mutant mischief!',
    'Greetings, linguistic leviathan!',
    'Embark on the Claube crusade!',
    'Unloveable? Unstoppable!'
  ];

  const found = greetings.some(greeting =>
    screen.queryByText(new RegExp(greeting, 'i'))
  );
  expect(found).toBe(true);
});