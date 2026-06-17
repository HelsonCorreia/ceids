import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export default function Classroom() {
  const { courseId, lessonId } = useParams();
  const data = useData();
  const { user } = useAuth();
  const course = data.getById('courses', Number(courseId));
  const modules = data.modules().filter(m => m.courseId === Number(courseId));
  const enrollment = data.enrollments().find(e => e.userId === user?.id && e.courseId === Number(courseId));
  const discussions = data.discussions().filter(d => d.courseId === Number(courseId));

  const currentLesson = modules.flatMap(m => m.lessons || []).find(l => l.id === Number(lessonId));
  const [commentText, setCommentText] = useState('');

  if (!course) return <div className="p-6 text-center">Curso não encontrado</div>;

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black rounded-2xl aspect-video relative overflow-hidden group">
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <div className="text-center text-white/50">
                <span className="material-symbols-outlined text-7xl">play_circle</span>
                <p className="text-sm mt-2">{currentLesson?.title || 'Aula indisponível'}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center gap-4">
              <span className="material-symbols-outlined text-white cursor-pointer">play_arrow</span>
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-secondary rounded-full" />
              </div>
              <span className="text-white text-xs font-mono">12:45 / {currentLesson?.duration || '00:00'}</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <button className="bg-secondary-fixed text-on-secondary-fixed-variant px-4 py-1.5 rounded-full text-[10px] font-bold">DESCRIÇÃO</button>
              <button className="text-on-surface-variant hover:text-primary px-4 py-1.5 rounded-full text-[10px] font-bold transition-colors">ANOTAÇÕES</button>
              <button className="text-on-surface-variant hover:text-primary px-4 py-1.5 rounded-full text-[10px] font-bold transition-colors">DOWNLOADS</button>
            </div>
            <h3 className="font-headline-md text-lg text-primary font-bold mb-3">{currentLesson?.title || 'Sobre esta aula'}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              Nesta aula, exploraremos os fundamentos do {course.title}. Discutiremos como aplicar estes conceitos na prática.
            </p>
            <ul className="text-sm text-on-surface-variant list-disc pl-5 space-y-1">
              <li>Entender os conceitos fundamentais</li>
              <li>Analisar casos práticos de aplicação</li>
              <li>Ferramentas e recursos complementares</li>
            </ul>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-headline-md text-lg text-primary font-bold mb-4">Discussão da Aula <span className="text-on-surface-variant/40 font-normal">({discussions.length})</span></h3>
            <div className="flex gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs shrink-0">
                {user?.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1">
                <textarea value={commentText} onChange={e => setCommentText(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-secondary/20 min-h-[80px] resize-none"
                  placeholder="Escreva sua dúvida ou contribuição..." />
                <div className="flex justify-end mt-2">
                  <button className="bg-secondary text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:shadow-lg hover:shadow-secondary/20 transition-all active:scale-95">Publicar</button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {discussions.map(d => (
                <div key={d.id} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs shrink-0">
                    {data.users().find(u => u.id === d.userId)?.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold">{data.users().find(u => u.id === d.userId)?.name}</span>
                      <span className="text-[10px] text-on-surface-variant/60">• {new Date(d.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant">{d.message}</p>
                    <div className="flex gap-3 mt-1">
                      <button className="text-[10px] font-bold text-secondary hover:underline">Responder</button>
                      <button className="text-[10px] font-bold text-on-surface-variant/60 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">thumb_up</span> {d.likes}
                      </button>
                    </div>
                    {d.replies?.map(r => (
                      <div key={r.id} className="flex gap-3 mt-3 ml-6 p-3 bg-surface-container-low rounded-xl">
                        <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-[10px] shrink-0">
                          {data.users().find(u => u.id === r.userId)?.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold">{data.users().find(u => u.id === r.userId)?.name}</span>
                          </div>
                          <p className="text-xs text-on-surface-variant">{r.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">school</span>
              </div>
              <div>
                <p className="text-sm font-bold text-primary leading-tight">{course.title}</p>
                <p className="text-[10px] text-on-surface-variant">{enrollment ? `${enrollment.progress}% completo` : 'Não matriculado'}</p>
              </div>
            </div>
            {enrollment && (
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mb-4">
                <div className="h-full bg-tertiary-fixed-dim rounded-full" style={{ width: `${enrollment.progress}%` }} />
              </div>
            )}
          </div>

          <div className="glass-card p-5 rounded-2xl">
            <h4 className="font-bold text-primary text-sm mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">menu_book</span>
              Módulos
            </h4>
            <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
              {modules.map(mod => (
                <div key={mod.id} className="border border-primary/5 rounded-xl overflow-hidden">
                  <div className="p-3 bg-surface-container-low/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase">Módulo {mod.order}</span>
                      <span className="material-symbols-outlined text-sm text-on-surface-variant">expand_more</span>
                    </div>
                    <p className="text-xs font-bold text-primary truncate">{mod.title}</p>
                  </div>
                  <div className="px-3 pb-2 space-y-1">
                    {mod.lessons?.map(lesson => {
                      const isActive = lesson.id === Number(lessonId);
                      return (
                        <Link key={lesson.id}
                          to={`/student/classroom/${courseId}/${lesson.id}`}
                          className={`flex items-center gap-2 p-1.5 rounded-lg text-xs transition-colors ${
                            isActive ? 'bg-secondary/10 text-secondary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'
                          }`}>
                          <span className="material-symbols-outlined text-sm">{lesson.type === 'video' ? 'play_circle' : 'description'}</span>
                          <span className="flex-1 truncate">{lesson.title}</span>
                          <span className="text-[10px] opacity-60">{lesson.duration}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl">
            <h4 className="font-bold text-primary text-sm mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">attachment</span>
              Materiais de Apoio
            </h4>
            {[
              { name: 'Slides-A01.pdf', size: '2.4 MB', icon: 'picture_as_pdf', color: 'text-error bg-error-container/10' },
              { name: 'Assets-Lab.zip', size: '158 MB', icon: 'terminal', color: 'text-secondary bg-secondary/10' },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl border border-outline-variant/30 hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${f.color}`}>
                    <span className="material-symbols-outlined text-lg">{f.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold truncate max-w-[120px]">{f.name}</p>
                    <p className="text-[10px] text-on-surface-variant">{f.size}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-lg">download</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
