import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/helpers';

export default function Reports() {
  const data = useData();
  const courses = data.courses();
  const enrollments = data.enrollments();
  const transactions = data.transactions();

  const totalRevenue = transactions.filter(t => t.status === 'paid').reduce((s, t) => s + t.amount, 0);
  const totalStudents = new Set(enrollments.map(e => e.userId)).size;

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Relatórios</h2>
          <p className="text-sm text-on-surface-variant">Análise detalhada da plataforma</p>
        </div>
        <button className="bg-secondary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-secondary/20 hover:brightness-110 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">download</span> Exportar PDF
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-bold text-primary text-lg mb-4">Receita por Curso</h3>
          <div className="space-y-3">
            {courses.sort((a, b) => b.students - a.students).slice(0, 5).map(c => {
              const rev = c.price * c.students;
              const pct = (rev / totalRevenue * 100).toFixed(1);
              return (
                <div key={c.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-on-surface-variant truncate mr-2">{c.title}</span>
                    <span className="font-bold text-primary">{formatCurrency(rev)}</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-bold text-primary text-lg mb-4">Resumo Geral</h3>
          <div className="space-y-4">
            {[
              { label: 'Total de Alunos', value: totalStudents },
              { label: 'Total de Cursos', value: courses.length },
              { label: 'Matrículas Ativas', value: enrollments.filter(e => e.status === 'active').length },
              { label: 'Cursos Concluídos', value: enrollments.filter(e => e.status === 'completed').length },
              { label: 'Receita Total', value: formatCurrency(totalRevenue) },
              { label: 'Taxa de Conclusão', value: `${enrollments.length ? Math.round(enrollments.filter(e => e.status === 'completed').length / enrollments.length * 100) : 0}%` },
            ].map((r, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-primary/5 last:border-0">
                <span className="text-sm text-on-surface-variant">{r.label}</span>
                <span className="text-sm font-bold text-primary">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
