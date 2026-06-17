import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        navigate(`/${result.user.role}/dashboard`);
      }
    }, 500);
  };

  const quickUsers = [
    { label: 'Admin', email: 'admin@ceids.com', color: 'bg-secondary/10 text-secondary' },
    { label: 'Aluno', email: 'aluno@ceids.com', color: 'bg-on-tertiary-container/10 text-on-tertiary-container' },
    { label: 'Prof', email: 'prof@ceids.com', color: 'bg-[#22C55E]/10 text-[#22C55E]' },
    { label: 'Empresa', email: 'empresa@ceids.com', color: 'bg-[#EAB308]/10 text-[#EAB308]' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-surface-container-low to-surface-container">
      <Link to="/" className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-xl">school</span>
        </div>
        <span className="font-headline-md text-2xl font-black text-primary">CEIDS</span>
      </Link>

      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-primary/5">
        <h2 className="font-headline-md text-2xl font-bold text-primary mb-1">Entrar</h2>
        <p className="text-sm text-on-surface-variant mb-8">Acesse sua conta CEIDS</p>

        {error && (
          <div className="flex items-center gap-2 p-3 mb-6 bg-error/5 text-error text-sm rounded-xl border border-error/10">
            <span className="material-symbols-outlined text-lg">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-primary mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20"
              placeholder="seu@email.com" required />
          </div>
          <div>
            <label className="text-sm font-bold text-primary mb-1.5 block">Senha</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 pr-10 text-sm focus:ring-2 focus:ring-secondary/20"
                placeholder="••••••" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-secondary text-white font-bold py-3.5 rounded-xl text-sm hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-secondary/20">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-xs text-on-surface-variant text-center mb-3">Testar como:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickUsers.map(u => (
              <button key={u.email} onClick={() => { setEmail(u.email); setPassword('123456'); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 ${u.color}`}>
                {u.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-on-surface-variant/60 text-center mt-3">Senha: <strong>123456</strong> para todos</p>
        </div>

        <p className="text-sm text-on-surface-variant text-center mt-8">
          Ainda não tem conta?{' '}
          <Link to="/register" className="text-secondary font-bold hover:underline">Registrar</Link>
        </p>
      </div>
    </div>
  );
}
