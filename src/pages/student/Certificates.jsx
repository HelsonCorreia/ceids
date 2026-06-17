import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/helpers';

export default function Certificates() {
  const { user } = useAuth();
  const data = useData();
  const certs = data.certificates().filter(c => c.userId === user?.id);
  const courses = data.courses();

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Meus Certificados</h2>
        <p className="text-sm text-on-surface-variant">{certs.length} certificados conquistados</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map(c => {
          const course = courses.find(co => co.id === c.courseId);
          return (
            <div key={c.id} className="glass-card p-6 rounded-2xl border border-primary/5 hover:shadow-xl transition-all text-center group">
              <div className="w-16 h-16 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl text-on-tertiary-container" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
              </div>
              <h3 className="font-bold text-primary text-sm mb-1">{course?.title}</h3>
              <p className="text-[10px] text-on-surface-variant mb-3">{c.hours}h • Nota: {c.grade || '-'}/20</p>
              <p className="text-[10px] font-mono text-on-tertiary-container font-bold mb-4">{c.code}</p>
              <p className="text-[10px] text-on-surface-variant mb-4">Emitido em {formatDate(c.issuedAt)}</p>
              <button className="w-full bg-secondary text-white py-2.5 rounded-xl text-xs font-bold hover:brightness-110 transition-all shadow-lg shadow-secondary/20">
                Download PDF
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
