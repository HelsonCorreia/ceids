import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/helpers';

export default function Attendance() {
  const data = useData();
  const attendance = data.attendance();
  const users = data.users();
  const modules = data.modules();

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Controlo de Presenças</h2>
        <p className="text-sm text-on-surface-variant">Registo de presenças dos alunos</p>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden border border-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Aluno</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Aula</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Data</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Tempo</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {attendance.map(a => {
                const student = users.find(u => u.id === a.userId);
                const lesson = modules.flatMap(m => m.lessons || []).find(l => l.id === a.lessonId);
                return (
                  <tr key={a.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="px-5 py-3 text-sm font-bold">{student?.name || '-'}</td>
                    <td className="px-5 py-3 text-sm">{lesson?.title || '-'}</td>
                    <td className="px-5 py-3 text-sm text-on-surface-variant">{formatDate(a.date)}</td>
                    <td className="px-5 py-3 text-sm">{a.timeWatched}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-black rounded-full uppercase ${a.completed ? 'bg-on-tertiary-container/10 text-on-tertiary-container' : 'bg-[#EAB308]/10 text-[#EAB308]'}`}>
                        {a.completed ? 'Completo' : 'Pendente'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
