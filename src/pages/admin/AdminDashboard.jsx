import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/helpers';

export default function AdminDashboard() {
  const data = useData();
  const users = data.users();
  const courses = data.courses();
  const enrollments = data.enrollments();
  const transactions = data.transactions();
  const certificates = data.certificates();

  const stats = useMemo(() => ({
    totalStudents: users.filter(u => u.role === 'student').length,
    activeCourses: courses.filter(c => c.status === 'active').length,
    monthlyRevenue: transactions.filter(t => t.status === 'paid').reduce((s, t) => s + t.amount, 0),
    newStudents: enrollments.filter(e => e.enrolledAt > Date.now() - 30 * 86400000).length,
    completionRate: enrollments.length ? Math.round(enrollments.filter(e => e.status === 'completed').length / enrollments.length * 100) : 0,
    certificatesIssued: certificates.length,
    churnRate: 1.2,
    popularCourse: courses.reduce((best, c) => c.students > (best?.students || 0) ? c : best, courses[0]),
  }), [users, courses, enrollments, transactions, certificates]);

  const recentEnrollments = [...enrollments].sort((a, b) => b.enrolledAt - a.enrolledAt).slice(0, 5);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Dashboard Administrativo</h2>
          <p className="text-sm text-on-surface-variant">Resumo operacional da plataforma</p>
        </div>
        <Link to="/admin/reports" className="bg-secondary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-secondary/20 hover:brightness-110 transition-all active:scale-95">
          <span className="material-symbols-outlined text-lg">add</span> Novo Relatório
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Receita Total', value: formatCurrency(stats.monthlyRevenue), icon: 'payments', color: 'bg-secondary/10 text-secondary', change: '+12.4%' },
          { label: 'Novos Alunos', value: stats.newStudents, icon: 'person_add', color: 'bg-tertiary-fixed-dim/20 text-on-tertiary-fixed-variant', change: `+${stats.newStudents}` },
          { label: 'Curso Destaque', value: stats.popularCourse?.title?.slice(0, 18) || 'N/A', icon: 'star', color: 'bg-surface-container-highest text-primary', sub: `${stats.popularCourse?.students || 0} alunos` },
          { label: 'Taxa de Churn', value: `${stats.churnRate}%`, icon: 'trending_down', color: 'bg-error-container text-error', change: '-0.8%' },
        ].map((kpi, i) => (
          <div key={i} className="glass-card p-5 lg:p-6 rounded-2xl hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${kpi.color}`}>
                <span className="material-symbols-outlined">{kpi.icon}</span>
              </div>
              {kpi.change && <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${kpi.change.startsWith('+') ? 'text-on-tertiary-container bg-tertiary-fixed-dim/20' : 'text-error bg-error-container'}`}>{kpi.change}</span>}
            </div>
            <p className="text-xs text-on-surface-variant mb-1">{kpi.label}</p>
            <p className="text-lg lg:text-xl font-black text-primary">{kpi.value}</p>
            {kpi.sub && <p className="text-[10px] text-on-surface-variant mt-2">{kpi.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 lg:p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-bold text-primary text-sm">Performance de Matrículas</h4>
              <p className="text-[10px] text-on-surface-variant">2024</p>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-2 lg:gap-4">
            {['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN'].map((m, i) => {
              const h1 = 30 + Math.random() * 50;
              const h2 = 40 + Math.random() * 60;
              return (
                <div key={m} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-[2px] items-end h-full">
                    <div className="bg-secondary-container/20 flex-1 rounded-t-lg" style={{ height: `${h1}%` }} />
                    <div className="bg-secondary flex-1 rounded-t-lg shadow-lg shadow-secondary/20" style={{ height: `${h2}%` }} />
                  </div>
                  <span className="text-[9px] font-bold text-on-surface-variant">{m}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card rounded-2xl flex flex-col">
          <div className="p-5 border-b border-primary/5">
            <h4 className="font-bold text-primary text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">notifications_active</span>
              Pendências Urgentes
            </h4>
          </div>
          <div className="p-4 flex-1 space-y-3 overflow-y-auto max-h-[280px] custom-scrollbar">
            {[
              { icon: 'workspace_premium', color: 'text-on-tertiary-container bg-on-tertiary-container/10', label: '12 Certificados Pendentes', sub: 'Curso: Inovação Verde' },
              { icon: 'payments', color: 'text-error bg-error/10', label: '4 Pagamentos em Atraso', sub: 'Vencimento: 15/06' },
              { icon: 'campaign', color: 'text-secondary bg-secondary/10', label: 'Nova Campanha Ativa', sub: 'Lançamento: ESG Essentials' },
            ].map((n, i) => (
              <div key={i} className="flex gap-3 p-3 bg-surface-container-low rounded-xl border-l-4" style={{ borderLeftColor: n.color.includes('error') ? '#ba1a1a' : n.color.includes('secondary') ? '#0051d5' : '#009485' }}>
                <div className={`p-2 rounded-lg h-fit ${n.color}`}>
                  <span className="material-symbols-outlined text-lg">{n.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">{n.label}</p>
                  <p className="text-xs text-on-surface-variant">{n.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-primary/5">
        <div className="px-5 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-surface/50 border-b border-primary/5">
          <div>
            <h3 className="font-headline-md text-lg text-primary font-bold">Matrículas Recentes</h3>
            <p className="text-xs text-on-surface-variant">Últimas matrículas na plataforma</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Aluno</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Curso</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Progresso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {recentEnrollments.map(enr => {
                const student = users.find(u => u.id === enr.userId);
                const course = courses.find(c => c.id === enr.courseId);
                return (
                  <tr key={enr.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs">{student?.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                        <div>
                          <p className="text-sm font-bold text-primary">{student?.name}</p>
                          <p className="text-[10px] text-on-surface-variant">{student?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm font-medium">{course?.title}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-black rounded-full uppercase ${enr.status === 'active' ? 'bg-on-tertiary-container/10 text-on-tertiary-container' : 'bg-surface-variant text-on-surface-variant'}`}>{enr.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full" style={{ width: `${enr.progress}%` }} />
                        </div>
                        <span className="text-[10px] font-bold">{enr.progress}%</span>
                      </div>
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
