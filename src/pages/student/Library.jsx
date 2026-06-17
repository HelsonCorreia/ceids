import { useState } from 'react';
import { useData } from '../../context/DataContext';

export default function Library() {
  const data = useData();
  const items = data.library();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = items.filter(i => {
    if (filter !== 'all' && i.type !== filter) return false;
    if (search && !i.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Biblioteca Digital</h2>
        <p className="text-sm text-on-surface-variant">{items.length} recursos disponíveis</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-secondary/20"
            placeholder="Pesquisar na biblioteca..." />
        </div>
        <div className="flex gap-2">
          {['all', 'pdf', 'ebook', 'video'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === f ? 'bg-secondary text-white' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-variant'}`}>
              {f === 'all' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="glass-card p-5 rounded-2xl hover:shadow-xl transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                item.type === 'pdf' ? 'bg-error-container/10 text-error' :
                item.type === 'ebook' ? 'bg-secondary/10 text-secondary' : 'bg-on-tertiary-container/10 text-on-tertiary-container'
              }`}>
                <span className="material-symbols-outlined">{item.type === 'pdf' ? 'picture_as_pdf' : item.type === 'ebook' ? 'menu_book' : 'play_circle'}</span>
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">{item.type}</span>
            </div>
            <h3 className="text-sm font-bold text-primary mb-1 line-clamp-2">{item.title}</h3>
            <p className="text-xs text-on-surface-variant mb-3">{item.author} • {item.size}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-on-surface-variant">{item.downloads} downloads</span>
              <button className="text-secondary text-sm font-bold hover:underline">Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
