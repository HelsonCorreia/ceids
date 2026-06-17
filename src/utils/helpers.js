export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA', maximumFractionDigits: 0 }).format(value);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));
}

export function formatDateFull(date) {
  return new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date));
}

export function formatTime(date) {
  return new Intl.DateTimeFormat('pt-PT', { hour: '2-digit', minute: '2-digit' }).format(new Date(date));
}

export function formatDateTime(date) {
  return `${formatDate(date)} às ${formatTime(date)}`;
}

export function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'agora';
  if (mins < 60) return `${mins} min atrás`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h atrás`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d atrás`;
  return formatDate(date);
}

export function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

export function truncate(str, len = 50) {
  return str.length > len ? str.slice(0, len) + '...' : str;
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function getStatusColor(status) {
  const map = {
    active: 'bg-[#22C55E]/10 text-[#22C55E]',
    inactive: 'bg-surface-variant text-on-surface-variant',
    pending: 'bg-[#EAB308]/10 text-[#EAB308]',
    completed: 'bg-on-tertiary-container/10 text-on-tertiary-container',
    overdue: 'bg-error/10 text-error',
    cancelled: 'bg-surface-variant text-on-surface-variant',
    ativo: 'bg-on-tertiary-container/10 text-on-tertiary-container',
    pendente: 'bg-[#EAB308]/10 text-[#EAB308]',
    concluído: 'bg-on-tertiary-container/10 text-on-tertiary-container',
    pago: 'bg-on-tertiary-container/10 text-on-tertiary-container',
    atrasado: 'bg-error/10 text-error',
  };
  return map[status?.toLowerCase()] || 'bg-surface-variant text-on-surface-variant';
}

export function getProgressColor(pct) {
  if (pct >= 80) return 'bg-[#22C55E]';
  if (pct >= 40) return 'bg-[#EAB308]';
  return 'bg-error';
}
