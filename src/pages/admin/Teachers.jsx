import { useData } from '../../context/DataContext';

export default function Teachers() {
  const data = useData();
  const teachers = data.users().filter(u => u.role === 'teacher');
  const courses = data.courses();

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Gestão de Professores</h2>
          <p className="text-sm text-on-surface-variant">{teachers.length} professores</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map(t => {
          const teacherCourses = courses.filter(c => c.instructor === t.id);
          return (
            <div key={t.id} className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-lg">
                  {t.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <p className="font-bold text-primary">{t.name}</p>
                  <p className="text-xs text-on-surface-variant">{t.specialization || 'Professor'}</p>
                </div>
              </div>
              <div className="flex gap-4 text-sm text-on-surface-variant">
                <div><span className="font-bold text-primary">{teacherCourses.length}</span> cursos</div>
                <div><span className="font-bold text-primary">{t.rating || '-'}</span> avaliação</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
