import { useData } from '../../context/DataContext';
import { formatCurrency, formatDate } from '../../utils/helpers';

export default function Employees() {
  const data = useData();
  const users = data.users();
  const enrollments = data.enrollments();
  const courses = data.courses();
  const companies = data.companies();

  const company = companies[0];
  const myEmployees = users.filter(u => u.companyId === company?.id);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Funcionários</h2>
        <p className="text-sm text-on-surface-variant">{myEmployees.length} funcionários com acesso à plataforma</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Funcionário</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Cursos</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Progresso Médio</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Certificados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {myEmployees.map(emp => {
                const empEnrollments = enrollments.filter(e => e.userId === emp.id);
                const avgProgress = empEnrollments.length
                  ? Math.round(empEnrollments.reduce((s, e) => s + e.progress, 0) / empEnrollments.length)
                  : 0;
                const certs = empEnrollments.filter(e => e.status === 'completed').length;
                return (
                  <tr key={emp.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs">
                          {emp.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary">{emp.name}</p>
                          <p className="text-[10px] text-on-surface-variant">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm font-bold">{empEnrollments.length}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full" style={{ width: `${avgProgress}%` }} />
                        </div>
                        <span className="text-[10px] font-bold">{avgProgress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm font-bold text-on-tertiary-container">{certs}</td>
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
