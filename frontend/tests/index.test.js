
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/index';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ challenge: 'testchallenge' }),
    ok: true,
  })
);

describe('Home', () => {
  it('renders challenge component when loading', async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Security Challenge')).toBeInTheDocument();
    });
  });

  it('handles successful verification', async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Security Challenge')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Solve the challenge:'), { target: { value: 'solution' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Verification successful! Welcome to the site.')).toBeInTheDocument();
    });
  });
});
    