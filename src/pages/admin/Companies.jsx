import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/helpers';

export default function Companies() {
  const data = useData();
  const companies = data.companies();

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Gestão de Empresas</h2>
          <p className="text-sm text-on-surface-variant">{companies.length} empresas parceiras</p>
        </div>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden border border-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Empresa</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">NIF</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Funcionários</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Total Gasto</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {companies.map(c => (
                <tr key={c.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs">{c.name[0]}</div>
                      <div>
                        <p className="text-sm font-bold text-primary">{c.name}</p>
                        <p className="text-[10px] text-on-surface-variant">{c.responsible}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm">{c.nif}</td>
                  <td className="px-5 py-3 text-sm font-bold">{c.employees}</td>
                  <td className="px-5 py-3 text-sm font-bold text-on-tertiary-container">{formatCurrency(c.totalSpent)}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-on-tertiary-container/10 text-on-tertiary-container text-[10px] font-black rounded-full uppercase">{c.status}</span>
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
