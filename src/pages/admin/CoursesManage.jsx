import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/helpers';

export default function CoursesManage() {
  const data = useData();
  const courses = data.courses();
  const users = data.users();

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Gestão de Cursos</h2>
          <p className="text-sm text-on-surface-variant">{courses.length} cursos ativos</p>
        </div>
        <button className="bg-secondary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-secondary/20 hover:brightness-110 transition-all">
          <span className="material-symbols-outlined text-lg">add</span> Novo Curso
        </button>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden border border-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Curso</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Categoria</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Professor</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Preço</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Alunos</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {courses.map(course => (
                <tr key={course.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded-lg overflow-hidden bg-surface-variant shrink-0">
                        <img src={course.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-bold text-primary">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm">{course.category}</td>
                  <td className="px-5 py-3 text-sm">{users.find(u => u.id === course.instructor)?.name || '-'}</td>
                  <td className="px-5 py-3 text-sm font-bold">{formatCurrency(course.price)}</td>
                  <td className="px-5 py-3 text-sm font-bold">{course.students}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-on-tertiary-container/10 text-on-tertiary-container text-[10px] font-black rounded-full uppercase">{course.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
