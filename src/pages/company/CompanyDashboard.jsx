import { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/helpers';

export default function CompanyDashboard() {
  const data = useData();
  const users = data.users();
  const enrollments = data.enrollments();
  const courses = data.courses();
  const companies = data.companies();

  const company = companies[0];
  const myEmployees = users.filter(u => u.companyId === company?.id);
  const employeeIds = myEmployees.map(e => e.id);
  const myEnrollments = enrollments.filter(e => employeeIds.includes(e.userId));

  const stats = [
    { label: 'Funcionários Matriculados', value: myEmployees.length, icon: 'group', color: 'bg-secondary/10 text-secondary' },
    { label: 'Horas Acumuladas', value: `${company?.totalHours || 0}h`, icon: 'schedule', color: 'bg-on-tertiary-container/10 text-on-tertiary-container' },
    { label: 'Investimento Total', value: formatCurrency(company?.totalSpent || 0), icon: 'payments', color: 'bg-surface-container-highest text-primary' },
    { label: 'Certificados Emitidos', value: myEnrollments.filter(e => e.status === 'completed').length, icon: 'workspace_premium', color: 'bg-tertiary-fixed-dim/20 text-on-tertiary-fixed-variant' },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">{company?.name}</h2>
        <p className="text-sm text-on-surface-variant">Dashboard Corporativo • NIF: {company?.nif}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((kpi, i) => (
          <div key={i} className="glass-card p-5 lg:p-6 rounded-2xl">
            <div className={`p-3 rounded-xl w-fit mb-4 ${kpi.color}`}>
              <span className="material-symbols-outlined">{kpi.icon}</span>
            </div>
            <p className="text-xs text-on-surface-variant mb-1">{kpi.label}</p>
            <p className="text-lg font-black text-primary">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-bold text-primary text-lg mb-4">Funcionários</h3>
          <div className="space-y-3">
            {myEmployees.map(emp => {
              const empEnrollments = enrollments.filter(e => e.userId === emp.id);
              return (
                <div key={emp.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                  <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs">
                    {emp.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-primary truncate">{emp.name}</p>
                    <p className="text-xs text-on-surface-variant">{empEnrollments.length} cursos • {empEnrollments.reduce((s, e) => s + e.progress, 0)}% média</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-bold text-primary text-lg mb-4">Cursos em Andamento</h3>
          <div className="space-y-3">
            {myEnrollments.filter(e => e.status === 'active').map(enr => {
              const course = courses.find(c => c.id === enr.courseId);
              const student = users.find(u => u.id === enr.userId);
              return (
                <div key={enr.id} className="p-3 rounded-xl bg-surface-container-low">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold text-primary">{course?.title}</p>
                    <span className="text-xs font-bold text-on-tertiary-container">{enr.progress}%</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">{student?.name}</p>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-tertiary-fixed-dim rounded-full" style={{ width: `${enr.progress}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
