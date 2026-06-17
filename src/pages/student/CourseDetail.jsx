import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export default function CourseDetail() {
  const { id } = useParams();
  const data = useData();
  const { user } = useAuth();
  const course = data.getById('courses', Number(id));
  const modules = data.modules().filter(m => m.courseId === Number(id));
  const instructor = data.users().find(u => u.id === course?.instructor);
  const enrollment = data.enrollments().find(e => e.userId === user?.id && e.courseId === Number(id));

  if (!course) return <div className="p-6 text-center text-on-surface-variant">Curso não encontrado</div>;

  const totalLessons = modules.reduce((s, m) => s + (m.lessons?.length || 0), 0);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div className="relative h-48 lg:h-64 rounded-2xl overflow-hidden">
        <img src={course.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider bg-secondary/80 px-3 py-1 rounded-full">{course.category}</span>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mt-3">{course.title}</h1>
          <p className="text-sm text-white/70 mt-1">Por {instructor?.name} • {course.duration} • {course.hours}h</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-bold text-primary text-lg mb-3">Sobre o Curso</h3>
            <p className="text-sm text-on-surface-variant mb-4">{course.description}</p>
            {course.prerequisites?.length > 0 && (
              <>
                <h4 className="font-bold text-primary text-sm mb-2">Pré-requisitos</h4>
                <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-1">
                  {course.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </>
            )}
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-bold text-primary text-lg mb-4">Conteúdo Programático</h3>
            <div className="space-y-3">
              {modules.map(mod => (
                <details key={mod.id} className="group border border-primary/5 rounded-xl overflow-hidden">
                  <summary className="flex justify-between items-center p-4 cursor-pointer list-none bg-surface-container-low/30">
                    <div>
                      <span className="text-xs text-on-surface-variant font-bold">Módulo {mod.order}</span>
                      <p className="text-sm font-bold text-primary">{mod.title}</p>
                    </div>
                    <span className="text-xs text-on-surface-variant">{mod.lessons?.length || 0} aulas</span>
                  </summary>
                  <div className="p-4 space-y-2">
                    {mod.lessons?.map(lesson => (
                      <Link key={lesson.id} to={enrollment ? `/student/classroom/${course.id}/${lesson.id}` : '#'}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low transition-colors text-sm">
                        <span className="material-symbols-outlined text-secondary text-lg">
                          {lesson.type === 'video' ? 'play_circle' : lesson.type === 'pdf' ? 'description' : 'quiz'}
                        </span>
                        <span className="flex-1 text-on-surface-variant">{lesson.title}</span>
                        <span className="text-xs text-on-surface-variant">{lesson.duration}</span>
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-6 rounded-2xl text-center">
            <p className="text-3xl font-black text-primary mb-2">{course.price.toLocaleString()} Kz</p>
            <p className="text-xs text-on-surface-variant mb-6">Pagamento único • Acesso vitalício</p>
            {enrollment ? (
              <Link to={`/student/classroom/${course.id}/${modules[0]?.lessons?.[0]?.id || ''}`}
                className="block w-full bg-secondary text-white font-bold py-3 rounded-xl text-sm hover:brightness-110 transition-all shadow-lg shadow-secondary/20">
                {enrollment.progress > 0 ? 'Continuar Curso' : 'Começar Curso'}
              </Link>
            ) : (
              <button className="w-full bg-secondary text-white font-bold py-3 rounded-xl text-sm hover:brightness-110 transition-all shadow-lg shadow-secondary/20">
                Matricular-se
              </button>
            )}
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-3">
            {[
              { icon: 'school', label: 'Total de Aulas', value: `${totalLessons} aulas` },
              { icon: 'schedule', label: 'Duração', value: course.duration },
              { icon: 'timer', label: 'Carga Horária', value: `${course.hours}h` },
              { icon: 'star', label: 'Avaliação', value: `${course.rating}/5` },
              { icon: 'group', label: 'Alunos', value: course.students },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-secondary text-lg">{s.icon}</span>
                <span className="flex-1 text-on-surface-variant">{s.label}</span>
                <span className="font-bold text-primary">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
