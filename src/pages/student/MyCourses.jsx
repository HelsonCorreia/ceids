import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function MyCourses() {
  const { user } = useAuth();
  const data = useData();
  const enrollments = data.enrollments().filter(e => e.userId === user?.id);
  const courses = data.courses();

  const myCourses = useMemo(() =>
    enrollments.map(enr => ({
      ...enr,
      course: courses.find(c => c.id === enr.courseId),
    })), [enrollments, courses]);

  const available = courses.filter(c => !enrollments.find(e => e.courseId === c.id));

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Meus Cursos</h2>
        <p className="text-sm text-on-surface-variant">{myCourses.length} cursos em andamento</p>
      </div>

      {myCourses.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myCourses.map(({ course, progress, status, id }) => (
            <Link key={id} to={`/student/course/${course?.id}`}
              className="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="h-36 relative overflow-hidden">
                <img src={course?.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${status === 'active' ? 'bg-secondary text-white' : 'bg-on-tertiary-container/90 text-white'}`}>{status}</span>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-sm text-primary">{course?.title}</h3>
                <div>
                  <div className="flex justify-between text-xs text-on-surface-variant mb-1">
                    <span>Progresso</span>
                    <span className="font-bold text-on-tertiary-container">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary-fixed-dim rounded-full" style={{ width: `${progress}%`, boxShadow: '0 0 12px rgba(79, 219, 200, 0.4)' }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div>
        <h3 className="font-headline-md text-lg text-primary font-bold mb-4">Catálogo de Cursos</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {available.map(course => (
            <Link key={course.id} to={`/student/course/${course.id}`}
              className="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="h-36 relative overflow-hidden">
                <img src={course.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-primary">{course.title}</h3>
                <p className="text-xs text-on-surface-variant line-clamp-1">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">{course.category} • {course.duration}</span>
                  <span className="text-sm font-bold text-secondary">{course.price.toLocaleString()} Kz</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
