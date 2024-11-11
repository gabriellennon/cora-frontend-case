import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { login } from '../../services/login.service';

jest.mock('../../services/login.service');

const MockedComponent = () => {
  const { signIn, signOut, isAuthenticated } = useAuth();

  return (
    <div>
      <button onClick={() => signIn({ cpf: '35819357833', password: '123456' })}>
        Sign In
      </button>
      <button onClick={signOut}>Sign Out</button>
      <span>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should authenticate the user with credentials', async () => {
    (login as jest.Mock).mockResolvedValueOnce({
      data: {
        user: { name: 'João Doe' },
        token: 'fake-token',
      },
    });

    render(
      <AuthProvider>
        <MockedComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Sign In'));

    expect(await screen.findByText('Authenticated')).toBeInTheDocument();
    expect(localStorage.getItem('@Cora:auth')).toBeTruthy();
  });

  it('should sign out the user', async () => {
    (login as jest.Mock).mockResolvedValueOnce({
      data: {
        user: { name: 'João Doe' },
        token: 'fake-token',
      },
    });

    render(
      <AuthProvider>
        <MockedComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Sign In'));
    expect(await screen.findByText('Authenticated')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Sign Out'));
    expect(screen.getByText('Not Authenticated')).toBeInTheDocument();
  });
});
