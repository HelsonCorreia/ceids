import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student', phone: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = register(form);
    if (result.error) setError(result.error);
    else navigate(`/${result.user.role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-surface-container-low to-surface-container">
      <Link to="/" className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-xl">school</span>
        </div>
        <span className="font-headline-md text-2xl font-black text-primary">CEIDS</span>
      </Link>

      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-primary/5">
        <h2 className="font-headline-md text-2xl font-bold text-primary mb-1">Criar Conta</h2>
        <p className="text-sm text-on-surface-variant mb-8">Junte-se ao CEIDS</p>

        {error && (
          <div className="p-3 mb-6 bg-error/5 text-error text-sm rounded-xl border border-error/10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 ? (
            <>
              <div>
                <label className="text-sm font-bold text-primary mb-1.5 block">Tipo de Conta</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'student', label: 'Aluno', icon: 'school' },
                    { value: 'teacher', label: 'Professor', icon: 'person' },
                    { value: 'company', label: 'Empresa', icon: 'business' },
                  ].map(opt => (
                    <button key={opt.value} type="button" onClick={() => setForm({ ...form, role: opt.value })}
                      className={`p-4 rounded-2xl border-2 text-center transition-all ${
                        form.role === opt.value ? 'border-secondary bg-secondary/5' : 'border-outline-variant bg-transparent'
                      }`}>
                      <span className="material-symbols-outlined text-2xl block mb-1 text-secondary">{opt.icon}</span>
                      <span className="text-xs font-bold">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)}
                className="w-full bg-secondary text-white font-bold py-3.5 rounded-xl text-sm hover:brightness-110 transition-all">
                Continuar
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-bold text-primary mb-1.5 block">{form.role === 'company' ? 'Nome da Empresa' : 'Nome Completo'}</label>
                <input name="name" value={form.name} onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20" required />
              </div>
              <div>
                <label className="text-sm font-bold text-primary mb-1.5 block">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20" required />
              </div>
              <div>
                <label className="text-sm font-bold text-primary mb-1.5 block">Telefone</label>
                <input name="phone" value={form.phone} onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20" />
              </div>
              <div>
                <label className="text-sm font-bold text-primary mb-1.5 block">Senha</label>
                <input name="password" type="password" value={form.password} onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20" minLength={4} required />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 py-3.5 rounded-xl text-sm font-bold border border-outline-variant text-primary hover:bg-surface-container-low transition-all">
                  Voltar
                </button>
                <button type="submit"
                  className="flex-1 bg-secondary text-white font-bold py-3.5 rounded-xl text-sm hover:brightness-110 transition-all shadow-lg shadow-secondary/20">
                  Criar Conta
                </button>
              </div>
            </>
          )}
        </form>

        <p className="text-sm text-on-surface-variant text-center mt-8">
          Já tem conta?{' '}
          <Link to="/login" className="text-secondary font-bold hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
