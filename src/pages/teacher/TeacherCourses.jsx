import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/helpers';

export default function TeacherCourses() {
  const data = useData();
  const courses = data.courses().filter(c => c.instructor === 3);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Meus Cursos</h2>
          <p className="text-sm text-on-surface-variant">{courses.length} cursos</p>
        </div>
        <button className="bg-secondary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-secondary/20 hover:brightness-110 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">add</span> Novo Curso
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {courses.map(c => (
          <div key={c.id} className="glass-card p-5 rounded-2xl hover:shadow-xl transition-all">
            <div className="flex gap-4">
              <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-variant">
                <img src={c.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-primary truncate">{c.title}</h3>
                <p className="text-xs text-on-surface-variant">{c.category} • {c.duration}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant">
                  <span>{c.students} alunos</span>
                  <span>{c.rating}/5</span>
                  <span className="font-bold text-secondary">{formatCurrency(c.price)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
