import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/helpers';

export default function CertificatesManage() {
  const data = useData();
  const certs = data.certificates();
  const users = data.users();
  const courses = data.courses();

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Gestão de Certificados</h2>
          <p className="text-sm text-on-surface-variant">{certs.length} certificados emitidos</p>
        </div>
        <button className="bg-secondary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-secondary/20 hover:brightness-110 transition-all">
          Emitir Certificado
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Código</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Aluno</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Curso</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Horas</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Emitido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {certs.map(c => (
                <tr key={c.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-5 py-3 text-sm font-mono text-on-tertiary-container font-bold">{c.code}</td>
                  <td className="px-5 py-3 text-sm">{users.find(u => u.id === c.userId)?.name || '-'}</td>
                  <td className="px-5 py-3 text-sm">{courses.find(co => co.id === c.courseId)?.title || '-'}</td>
                  <td className="px-5 py-3 text-sm font-bold">{c.hours}h</td>
                  <td className="px-5 py-3 text-sm text-on-surface-variant">{formatDate(c.issuedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
