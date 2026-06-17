import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const menuByRole = {
  student: [
    { label: 'Dashboard', icon: 'dashboard', path: '/student/dashboard' },
    { label: 'Meus Cursos', icon: 'school', path: '/student/courses' },
    { label: 'Certificados', icon: 'workspace_premium', path: '/student/certificates' },
    { label: 'Biblioteca', icon: 'local_library', path: '/student/library' },
    { label: 'Perfil', icon: 'person', path: '/student/profile' },
  ],
  admin: [
    { label: 'Dashboard', icon: 'dashboard', path: '/admin/dashboard' },
    { label: 'Alunos', icon: 'group', path: '/admin/students' },
    { label: 'Professores', icon: 'person', path: '/admin/teachers' },
    { label: 'Empresas', icon: 'business', path: '/admin/companies' },
    { label: 'Cursos', icon: 'school', path: '/admin/courses' },
    { label: 'Financeiro', icon: 'payments', path: '/admin/finance' },
    { label: 'Certificados', icon: 'workspace_premium', path: '/admin/certificates' },
  ],
  teacher: [
    { label: 'Dashboard', icon: 'dashboard', path: '/teacher/dashboard' },
    { label: 'Meus Cursos', icon: 'school', path: '/teacher/courses' },
    { label: 'Presenças', icon: 'fact_check', path: '/teacher/attendance' },
  ],
  company: [
    { label: 'Dashboard', icon: 'dashboard', path: '/company/dashboard' },
    { label: 'Funcionários', icon: 'group', path: '/company/employees' },
  ],
};

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menu = menuByRole[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-surface/95 backdrop-blur-xl border-r border-primary/5 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex items-center gap-3 px-6 h-16 border-b border-primary/5">
        <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-lg">school</span>
        </div>
        <div>
          <h1 className="font-headline-md text-lg font-bold text-primary leading-tight">CEIDS</h1>
          <p className="text-[9px] text-on-primary-container uppercase tracking-widest font-bold">Distance Learning</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
        {menu.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active ? 'bg-secondary/10 text-secondary font-bold' : 'text-on-surface-variant hover:bg-surface-variant/50'
              }`}>
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low mb-3">
          <img src={user?.avatar} alt="" className="w-9 h-9 rounded-full border border-secondary/20 bg-white" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-primary truncate">{user?.name}</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">{user?.role}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-error hover:bg-error/5 transition-colors font-medium">
          <span className="material-symbols-outlined text-xl">logout</span>
          Sair
        </button>
      </div>
    </aside>
  );
}
