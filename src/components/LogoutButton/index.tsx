import { useAuth } from '../../contexts/AuthContext';
import './index.css';
import { DoorOpen } from 'lucide-react';

export const LogoutButton = () => {
  const { signOut } = useAuth();

  return (
    <button onClick={signOut}>
      <DoorOpen  />
      Sair
    </button>
  )
}
