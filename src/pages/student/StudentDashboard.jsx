import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const data = useData();
  const enrollments = data.enrollments().filter(e => e.userId === user?.id);
  const courses = data.courses();
  const certs = data.certificates().filter(c => c.userId === user?.id);
  const allNotifications = data.notifications().filter(n => n.userId === user?.id);
  const modules = data.modules();

  const activeEnrollments = enrollments.filter(e => e.status === 'active');
  const completedCount = enrollments.filter(e => e.status === 'completed').length;
  const totalProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length)
    : 0;

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <section className="mb-2">
        <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold tracking-tight">
          Olá, {user?.name?.split(' ')[0]}! 👋
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">Você já completou {totalProgress}% dos seus cursos. Mantenha o foco!</p>
      </section>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-headline-md text-lg text-primary font-bold">Continuar Aprendendo</h3>
          <Link to="/student/courses" className="text-secondary text-sm font-bold hover:underline">Ver todos</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {activeEnrollments.slice(0, 2).map(enr => {
            const course = courses.find(c => c.id === enr.courseId);
            return (
              <Link key={enr.id} to={`/student/classroom/${enr.courseId}/${modules.find(m => m.courseId === enr.courseId)?.lessons?.[0]?.id || ''}`}
                className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.01] transition-transform">
                <div className="relative h-28 overflow-hidden">
                  <img src={course?.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 px-3 py-1 bg-secondary text-white text-[10px] font-bold uppercase rounded-full">{course?.category}</span>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-sm text-primary truncate">{course?.title}</h4>
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Progresso</span>
                    <span className="font-bold text-on-tertiary-container">{enr.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary-fixed-dim rounded-full progress-glow transition-all" style={{ width: `${enr.progress}%`, boxShadow: '0 0 12px rgba(79, 219, 200, 0.4)' }} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <section className="space-y-3">
            <h3 className="font-headline-md text-lg text-primary font-bold">Cursos Ativos</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeEnrollments.map(enr => {
                const course = courses.find(c => c.id === enr.courseId);
                return (
                  <Link key={enr.id} to={`/student/course/${enr.courseId}`}
                    className="glass-card p-4 rounded-2xl hover:border-secondary/20 transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary text-lg">{course?.category === 'Tech' ? 'data_object' : 'school'}</span>
                      </div>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase">{enr.progress}%</span>
                    </div>
                    <h5 className="text-sm font-bold text-primary">{course?.title}</h5>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${enr.progress}%` }} />
                    </div>
                  </Link>
                );
              })}
              <Link to="/student/courses"
                className="glass-card p-4 rounded-2xl border-2 border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-secondary hover:border-secondary/30 transition-all min-h-[100px]">
                <div className="text-center">
                  <span className="material-symbols-outlined text-2xl block">add_circle</span>
                  <span className="text-xs font-bold mt-1">Ver Catálogo</span>
                </div>
              </Link>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
              <h3 className="font-headline-md text-lg text-primary font-bold">Recomendados para você</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {courses.filter(c => c.featured).slice(0, 2).map(course => (
                <div key={course.id} className="glass-card p-5 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-7xl">verified_user</span>
                  </div>
                  <div className="relative z-10 space-y-3">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Baseado no seu perfil</span>
                    <h4 className="font-headline-md text-base text-primary font-bold">{course.title}</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2">{course.description}</p>
                    <Link to={`/student/course/${course.id}`}
                      className="inline-block px-5 py-2.5 bg-secondary text-white rounded-full text-xs font-bold hover:shadow-lg hover:shadow-secondary/20 transition-all active:scale-95">
                      Explorar Curso
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card p-5 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-primary">Próximas Aulas</h3>
              <span className="material-symbols-outlined text-on-surface-variant text-lg">calendar_today</span>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Workshop de Typography', time: 'Hoje • 19:30 - 21:00', icon: 'videocam', active: true },
                { title: 'Mentoria Individual', time: 'Amanhã • 10:00 - 11:00', icon: 'person', active: false },
              ].map((a, i) => (
                <div key={i} className={`flex gap-3 items-start border-l-2 pl-3 py-1 ${a.active ? 'border-secondary' : 'border-outline-variant'}`}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-primary truncate">{a.title}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{a.time}</p>
                  </div>
                  <button className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${a.active ? 'bg-secondary text-white' : 'bg-surface-container text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-sm">{a.icon}</span>
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full py-2.5 text-sm font-bold text-secondary bg-secondary/5 rounded-xl hover:bg-secondary/10 transition-colors">Ver calendário completo</button>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-primary">Tarefas Pendentes</h3>
            {[
              { label: 'Enviar Protótipo Final', time: 'Expira em 4h', urgent: true },
              { label: 'Quiz: Princípios de Gestalt', time: 'Vence amanhã', urgent: false },
              { label: 'Artigo para Review', time: 'Sexta-feira', urgent: false },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 hover:bg-surface-container-low rounded-xl transition-colors cursor-pointer">
                <div className="w-4 h-4 border-2 border-outline rounded flex items-center justify-center hover:border-secondary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-primary truncate">{t.label}</p>
                  <p className={`text-[10px] font-medium ${t.urgent ? 'text-error' : 'text-on-surface-variant'}`}>{t.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-3 overflow-hidden relative">
            <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
            <h3 className="text-sm font-bold text-primary">Certificados ({certs.length})</h3>
            <div className="flex -space-x-3">
              {certs.slice(0, 3).map(c => (
                <div key={c.id} className="w-12 h-12 rounded-full border-4 border-surface bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-secondary">workspace_premium</span>
                </div>
              ))}
              {certs.length > 3 && (
                <div className="w-12 h-12 rounded-full border-4 border-surface bg-surface-container flex items-center justify-center text-on-surface-variant text-xs font-bold">+{certs.length - 3}</div>
              )}
            </div>
            <Link to="/student/certificates" className="w-full flex items-center justify-center gap-1 py-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
              Ver Galeria <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
