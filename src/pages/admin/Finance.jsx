import { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { formatCurrency, formatDate } from '../../utils/helpers';

export default function Finance() {
  const data = useData();
  const transactions = data.transactions();
  const users = data.users();

  const summary = useMemo(() => ({
    total: transactions.filter(t => t.status === 'paid').reduce((s, t) => s + t.amount, 0),
    pending: transactions.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0),
    count: transactions.length,
    paidCount: transactions.filter(t => t.status === 'paid').length,
  }), [transactions]);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Financeiro</h2>
        <p className="text-sm text-on-surface-variant">Gestão de pagamentos e transações</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Receita Total', value: formatCurrency(summary.total), icon: 'payments', color: 'bg-secondary/10 text-secondary' },
          { label: 'Pendente', value: formatCurrency(summary.pending), icon: 'hourglass_empty', color: 'bg-[#EAB308]/10 text-[#EAB308]' },
          { label: 'Transações', value: summary.count, icon: 'receipt_long', color: 'bg-surface-container-highest text-primary' },
          { label: 'Pagas', value: summary.paidCount, icon: 'check_circle', color: 'bg-on-tertiary-container/10 text-on-tertiary-container' },
        ].map((kpi, i) => (
          <div key={i} className="glass-card p-5 lg:p-6 rounded-2xl">
            <div className={`p-3 rounded-xl w-fit mb-4 ${kpi.color}`}>
              <span className="material-symbols-outlined">{kpi.icon}</span>
            </div>
            <p className="text-xs text-on-surface-variant mb-1">{kpi.label}</p>
            <p className="text-lg font-black text-primary">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-primary/5">
        <div className="px-5 py-4 border-b border-primary/5">
          <h3 className="font-bold text-primary text-sm">Histórico de Transações</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">ID</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Aluno</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Valor</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Método</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-5 py-3 text-sm font-mono text-on-surface-variant">#{t.id}</td>
                  <td className="px-5 py-3 text-sm">{users.find(u => u.id === t.userId)?.name || '-'}</td>
                  <td className="px-5 py-3 text-sm font-bold">{formatCurrency(t.amount)}</td>
                  <td className="px-5 py-3 text-sm capitalize">{t.method}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 text-[10px] font-black rounded-full uppercase ${t.status === 'paid' ? 'bg-on-tertiary-container/10 text-on-tertiary-container' : 'bg-[#EAB308]/10 text-[#EAB308]'}`}>{t.status}</span>
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
