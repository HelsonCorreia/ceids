import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function TopBar({ onMenuClick }) {
  const { user } = useAuth();
  const data = useData();
  const notifs = data.notifications().filter(n => n.userId === user?.id && !n.read);

  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-primary/5">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 text-primary hover:bg-surface-variant/50 rounded-lg">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="relative w-full max-w-xs hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
            <input className="w-full bg-surface-container-low border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-secondary/20 placeholder:text-on-surface-variant/60" placeholder="Pesquisar..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 rounded-xl transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            {notifs.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />}
          </button>
          <div className="flex items-center gap-3 pl-3 border-l border-outline-variant">
            <div className="text-right hidden xs:block">
              <p className="text-sm font-bold text-primary leading-tight">{user?.name}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{user?.role}</p>
            </div>
            <img src={user?.avatar} alt="" className="w-9 h-9 rounded-full border-2 border-secondary/10 bg-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
