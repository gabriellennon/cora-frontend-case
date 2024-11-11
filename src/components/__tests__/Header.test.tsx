import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Header Component', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render back button', () => {
    render(<Header />);
    const backButton = screen.getByText(/Voltar/i);
    expect(backButton).toBeInTheDocument();
  });

  test('should call navigate(-1) when click in back button', () => {
    render(<Header />);
    const backButton = screen.getByText(/Voltar/i);
    fireEvent.click(backButton);
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
