import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export default function Landing() {
  const data = useData();
  const courses = data.courses().filter(c => c.featured);
  const cats = data.categories();

  return (
    <div>
      <header className="flex justify-between items-center h-16 px-4 lg:px-10 sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-primary/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">school</span>
          </div>
          <span className="font-headline-md text-lg font-black text-primary">CEIDS</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-bold text-primary hover:text-secondary transition-colors">Entrar</Link>
          <Link to="/register" className="bg-secondary text-white px-5 py-2 rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-secondary/20">Começar</Link>
        </div>
      </header>

      <section className="relative min-h-[600px] lg:min-h-[819px] flex items-center overflow-hidden pt-16 pb-24 px-4 lg:px-10"
        style={{ background: 'radial-gradient(circle at top right, rgba(113, 248, 228, 0.1), transparent), radial-gradient(circle at bottom left, rgba(0, 81, 213, 0.05), transparent)' }}>
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-xs mb-6 uppercase tracking-wider font-bold">A Nova Era da Educação</span>
            <h1 className="font-display-xl text-4xl lg:text-5xl xl:text-6xl text-primary mb-6 leading-tight font-black">
              Aprender <br className="hidden lg:block" /><span className="text-secondary">sem limites.</span>
            </h1>
            <p className="text-base lg:text-lg text-on-surface-variant mb-10 max-w-lg mx-auto lg:mx-0">
              A plataforma definitiva de ensino a distância com foco em inovação, tecnologia e desenvolvimento sustentável para acelerar sua carreira.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register" className="h-12 px-8 bg-secondary text-white rounded-xl text-sm font-bold shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center">Começar Agora</Link>
              <Link to="/login" className="h-12 px-8 bg-white text-primary border border-outline-variant rounded-xl text-sm font-bold hover:bg-surface-container-low transition-all flex items-center justify-center">Explorar Cursos</Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-lg aspect-square glass-card rounded-[40px] overflow-hidden relative">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop" alt="Team" />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent" />
              <div className="absolute -bottom-4 -left-4 glass-card p-4 lg:p-6 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-tertiary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
                <div>
                  <p className="font-headline-md text-sm lg:text-base text-primary font-bold">Certificado MEC</p>
                  <p className="text-xs text-on-surface-variant">Válido em todo território</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-outline-variant py-10">
            <div className="text-center md:border-r border-outline-variant">
              <p className="text-3xl lg:text-[42px] text-secondary font-black mb-2">50,000+</p>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Alunos Ativos</p>
            </div>
            <div className="text-center md:border-r border-outline-variant">
              <p className="text-3xl lg:text-[42px] text-primary font-black mb-2">500+</p>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Cursos Disponíveis</p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-[42px] text-on-tertiary-container font-black mb-2">95%</p>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Taxa de Conclusão</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-2xl lg:text-3xl text-primary mb-4 font-bold">Escolha sua trilha de sucesso</h2>
            <p className="text-sm lg:text-base text-on-surface-variant max-w-xl mx-auto">Categorias pensadas para o mercado de trabalho atual, focadas em competências reais.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cats.map(cat => (
              <Link key={cat.id} to="/login"
                className="glass-card p-6 lg:p-8 rounded-2xl text-center hover:bg-secondary hover:text-white transition-all duration-300 group">
                <span className="material-symbols-outlined text-3xl lg:text-[40px] mb-3 text-secondary group-hover:text-white block">{cat.icon}</span>
                <p className="text-sm font-bold">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <h2 className="font-headline-lg text-2xl lg:text-3xl text-primary mb-2 font-bold">Cursos em Destaque</h2>
              <p className="text-sm lg:text-base text-on-surface-variant">Os mais procurados pela nossa comunidade este mês.</p>
            </div>
            <Link to="/login" className="text-secondary font-bold text-sm flex items-center gap-1 hover:underline whitespace-nowrap">
              Ver tudo <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="glass-card rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className="h-44 lg:h-48 relative overflow-hidden">
                  <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src={course.image} alt={course.title} />
                  <div className="absolute top-3 right-3 bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-bold">NOVO</div>
                </div>
                <div className="p-5 lg:p-6 flex flex-col flex-1">
                  <h3 className="font-headline-md text-base lg:text-lg text-primary mb-1 font-bold">{course.title}</h3>
                  <p className="text-xs text-on-surface-variant mb-3">Instrutor: {data.users().find(u => u.id === course.instructor)?.name}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-secondary-container">
                      {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
                      <span className="material-symbols-outlined text-sm">star_half</span>
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant">({course.rating}/5)</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-headline-md text-base lg:text-lg text-primary font-bold">{course.price.toLocaleString()} Kz</span>
                    <Link to="/register" className="px-5 h-9 bg-secondary text-white rounded-lg font-bold text-xs flex items-center hover:brightness-110 transition-all">Matricular</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div>
              <h2 className="font-headline-lg text-2xl lg:text-3xl text-primary mb-4 font-bold">O que nossos alunos dizem</h2>
              <p className="text-sm lg:text-base text-on-surface-variant mb-8">Histórias reais de pessoas que transformaram suas carreiras através do CEIDS.</p>
            </div>
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
              <div className="glass-card p-6 lg:p-8 rounded-2xl">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{fontVariationSettings: "'FILL' 1"}}>format_quote</span>
                <p className="text-sm italic mb-6 text-on-surface-variant">"A metodologia do CEIDS é impecável. Consegui transitar de carreira para tecnologia em apenas 6 meses com o suporte dos mentores."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm">JM</div>
                  <div>
                    <p className="text-sm font-bold text-primary">Júlia Mendes</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Desenvolvedora Front-end</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6 lg:p-8 rounded-2xl">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{fontVariationSettings: "'FILL' 1"}}>format_quote</span>
                <p className="text-sm italic mb-6 text-on-surface-variant">"A flexibilidade do EAD permitiu que eu concluísse minha pós-graduação enquanto gerenciava minha empresa. Simplesmente incrível."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm">RS</div>
                  <div>
                    <p className="text-sm font-bold text-primary">Roberto Silva</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">CEO TechLog</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-headline-lg text-2xl lg:text-3xl text-primary mb-10 text-center font-bold">Dúvidas Frequentes</h2>
          <div className="space-y-3">
            {[
              { q: 'Como funcionam os certificados?', a: 'Nossos certificados são digitais e emitidos automaticamente após a conclusão de 100% das aulas e aprovação nas avaliações finais. São válidos em todo o território nacional.' },
              { q: 'Posso acessar as aulas offline?', a: 'Sim, através do nosso aplicativo mobile você pode fazer download das aulas para assistir sem conexão com a internet.' },
              { q: 'Quais as formas de pagamento?', a: 'Aceitamos cartões de crédito em até 12x sem juros, boleto bancário e PIX com 10% de desconto.' },
            ].map((faq, i) => (
              <details key={i} className="group glass-card rounded-xl overflow-hidden transition-all">
                <summary className="flex justify-between items-center p-4 lg:p-6 cursor-pointer list-none">
                  <span className="font-bold text-primary text-sm">{faq.q}</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-on-surface-variant">expand_more</span>
                </summary>
                <div className="px-4 lg:px-6 pb-4 lg:pb-6 text-sm text-on-surface-variant">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-outline-variant py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-lg">school</span>
              </div>
              <span className="font-headline-md text-lg font-black text-primary">CEIDS</span>
            </div>
            <p className="text-sm text-on-surface-variant">Líder em educação inovadora e desenvolvimento sustentável na América Latina. Transformando o futuro através do conhecimento.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <p className="font-bold text-primary text-sm mb-3">Plataforma</p>
              <ul className="space-y-1.5 text-sm text-on-surface-variant">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-primary text-sm mb-3">Suporte</p>
              <ul className="space-y-1.5 text-sm text-on-surface-variant">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-primary text-sm mb-3">Comunidade</p>
              <ul className="space-y-1.5 text-sm text-on-surface-variant">
                <li><a href="#" className="hover:text-primary">About CEIDS</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-10 mt-10 pt-6 border-t border-outline-variant text-center">
          <p className="text-sm text-on-surface-variant opacity-80">© 2024 CEIDS - Centro de Educação, Inovação e Desenvolvimento Sustentável</p>
        </div>
      </footer>
    </div>
  );
}
