import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/helpers';

export default function Profile() {
  const { user } = useAuth();
  const data = useData();
  const enrollments = data.enrollments().filter(e => e.userId === user?.id);
  const certs = data.certificates().filter(c => c.userId === user?.id);
  const transactions = data.transactions().filter(t => t.userId === user?.id);

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
      <div className="glass-card p-6 lg:p-8 rounded-2xl text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-2xl font-bold">
            {user?.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
          </div>
          <div>
            <h2 className="font-headline-md text-xl text-primary font-bold">{user?.name}</h2>
            <p className="text-sm text-on-surface-variant">{user?.email}</p>
            <p className="text-xs text-on-surface-variant">{user?.phone || 'Sem telefone'}</p>
            <div className="flex gap-2 mt-2 justify-center lg:justify-start">
              <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase">{user?.role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Cursos', value: enrollments.length, icon: 'school' },
          { label: 'Certificados', value: certs.length, icon: 'workspace_premium' },
          { label: 'Membro há', value: user?.createdAt ? Math.floor((Date.now() - user.createdAt) / 86400000) + ' dias' : '-', icon: 'calendar_today' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 rounded-2xl text-center">
            <span className="material-symbols-outlined text-secondary text-2xl block mb-2">{s.icon}</span>
            <p className="text-lg font-black text-primary">{s.value}</p>
            <p className="text-xs text-on-surface-variant">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-bold text-primary text-lg mb-4">Informações Pessoais</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Nome', value: user?.name },
            { label: 'Email', value: user?.email },
            { label: 'Telefone', value: user?.phone || '-' },
            { label: 'Bio', value: user?.bio || '-' },
          ].map((f, i) => (
            <div key={i}>
              <p className="text-xs text-on-surface-variant mb-1">{f.label}</p>
              <p className="text-sm font-bold text-primary">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
