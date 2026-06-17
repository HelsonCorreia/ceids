import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}
