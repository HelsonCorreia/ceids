import { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/helpers';

export default function TeacherDashboard() {
  const data = useData();
  const users = data.users();
  const courses = data.courses();
  const enrollments = data.enrollments();
  const discussions = data.discussions();

  const myCourses = courses.filter(c => c.instructor === 3);
  const myStudents = enrollments.filter(e => myCourses.find(mc => mc.id === e.courseId));
  const totalStudents = new Set(myStudents.map(e => e.userId)).size;

  const stats = [
    { label: 'Alunos Ativos', value: totalStudents, icon: 'group', color: 'bg-secondary/10 text-secondary' },
    { label: 'Cursos', value: myCourses.length, icon: 'school', color: 'bg-on-tertiary-container/10 text-on-tertiary-container' },
    { label: 'Avaliação Média', value: '4.7', icon: 'star', color: 'bg-[#EAB308]/10 text-[#EAB308]' },
    { label: 'Receita Gerada', value: formatCurrency(myCourses.reduce((s, c) => s + c.price * c.students, 0)), icon: 'payments', color: 'bg-surface-container-highest text-primary' },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Dashboard do Professor</h2>
        <p className="text-sm text-on-surface-variant">Bem-vindo, Prof. Ana Paula</p>
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
          <h3 className="font-bold text-primary text-lg mb-4">Meus Cursos</h3>
          <div className="space-y-4">
            {myCourses.map(c => (
              <div key={c.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-surface-variant">
                  <img src={c.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-primary truncate">{c.title}</p>
                  <p className="text-xs text-on-surface-variant">{c.students} alunos • {c.rating}/5</p>
                </div>
                <span className="text-xs font-bold text-on-surface-variant">{c.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-bold text-primary text-lg mb-4">Discussões Recentes</h3>
          <div className="space-y-3">
            {discussions.slice(0, 3).map(d => {
              const student = users.find(u => u.id === d.userId);
              return (
                <div key={d.id} className="p-3 rounded-xl bg-surface-container-low">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary">{student?.name}</span>
                    <span className="text-[10px] text-on-surface-variant">em Discussão</span>
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-2">{d.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
