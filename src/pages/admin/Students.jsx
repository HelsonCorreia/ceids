import { useState } from 'react';
import { useData } from '../../context/DataContext';

export default function Students() {
  const data = useData();
  const users = data.users().filter(u => u.role === 'student');
  const enrollments = data.enrollments();
  const courses = data.courses();

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-md text-xl lg:text-2xl text-primary font-bold">Gestão de Alunos</h2>
          <p className="text-sm text-on-surface-variant">{users.length} alunos registados</p>
        </div>
        <button className="bg-secondary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-secondary/20 hover:brightness-110 transition-all">
          <span className="material-symbols-outlined text-lg">add</span> Novo Aluno
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Aluno</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Email</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Cursos</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Status</th>
                <th className="px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {users.map(student => {
                const studentEnrollments = enrollments.filter(e => e.userId === student.id);
                return (
                  <tr key={student.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs">
                          {student.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary">{student.name}</p>
                          <p className="text-[10px] text-on-surface-variant">ID: #{student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-on-surface-variant">{student.email}</td>
                    <td className="px-5 py-3 text-sm font-medium">{studentEnrollments.length}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 bg-on-tertiary-container/10 text-on-tertiary-container text-[10px] font-black rounded-full uppercase">Ativo</span>
                    </td>
                    <td className="px-5 py-3">
                      <button className="text-on-surface-variant hover:text-secondary"><span className="material-symbols-outlined">more_horiz</span></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
