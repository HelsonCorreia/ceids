import { createContext, useContext } from 'react';
import { getCollection, addToCollection, updateInCollection, removeFromCollection, getById, queryCollection } from '../data/store';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const value = {
    getCollection, addToCollection, updateInCollection,
    removeFromCollection, getById, queryCollection,
    users: () => getCollection('users'),
    courses: () => getCollection('courses'),
    modules: () => getCollection('modules'),
    enrollments: () => getCollection('enrollments'),
    certificates: () => getCollection('certificates'),
    transactions: () => getCollection('transactions'),
    notifications: () => getCollection('notifications'),
    companies: () => getCollection('companies'),
    library: () => getCollection('library'),
    discussions: () => getCollection('discussions'),
    categories: () => getCollection('categories'),
    assignments: () => getCollection('assignments'),
    attendance: () => getCollection('attendance'),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be inside DataProvider');
  return ctx;
}
