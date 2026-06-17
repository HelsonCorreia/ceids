const now = Date.now();
const day = 86400000;

export const users = [
  {
    id: 1, name: 'Dr. Ricardo Silva', email: 'admin@ceids.com', password: '123456',
    role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    phone: '+244 923 456 789', bio: 'Administrador Chefe do CEIDS', createdAt: now - 365 * day,
  },
  {
    id: 2, name: 'Lucas Oliveira', email: 'aluno@ceids.com', password: '123456',
    role: 'student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student1',
    phone: '+244 934 567 890', bio: 'Estudante de Tecnologia', createdAt: now - 180 * day,
    companyId: 1,
  },
  {
    id: 3, name: 'Prof. Ana Paula', email: 'prof@ceids.com', password: '123456',
    role: 'teacher', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
    phone: '+244 945 678 901', bio: 'Professora de Data Science', createdAt: now - 200 * day,
    specialization: 'Data Science & IA', rating: 4.8,
  },
  {
    id: 4, name: 'TechLog SA', email: 'empresa@ceids.com', password: '123456',
    role: 'company', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=company1',
    phone: '+244 956 789 012', bio: 'Empresa de Tecnologia e Logística',
    nif: '541237890', responsible: 'João Gaspar', createdAt: now - 90 * day,
  },
  {
    id: 5, name: 'Mariana Torres', email: 'mariana@test.com', password: '123456',
    role: 'student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student2',
    phone: '+244 967 890 123', bio: 'Estudante de Gestão', createdAt: now - 60 * day,
  },
  {
    id: 6, name: 'Prof. Miguel Santos', email: 'miguel@test.com', password: '123456',
    role: 'teacher', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher2',
    phone: '+244 978 901 234', bio: 'Professor de Programação', createdAt: now - 150 * day,
    specialization: 'Full Stack Development', rating: 4.6,
  },
  {
    id: 7, name: 'Construções Angolar Lda', email: 'angolar@test.com', password: '123456',
    role: 'company', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=company2',
    phone: '+244 989 012 345', bio: 'Empresa de Construção Civil',
    nif: '541098765', responsible: 'António Costa', createdAt: now - 30 * day,
  },
];

export const courses = [
  {
    id: 1, title: 'Full Stack Development', category: 'Tech', instructor: 3,
    duration: '12 semanas', hours: 120, price: 499000, rating: 4.8, students: 234,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    description: 'Domine o desenvolvimento web full stack com React, Node.js e bancos de dados modernos.',
    prerequisites: ['Conhecimentos básicos de HTML/CSS', 'Lógica de programação'],
    featured: true, status: 'active', categoryId: 'tech',
    createdAt: now - 120 * day,
  },
  {
    id: 2, title: 'Sustainable Business Leadership', category: 'Management', instructor: 3,
    duration: '8 semanas', hours: 80, price: 650000, rating: 5.0, students: 189,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    description: 'Liderança empresarial focada em sustentabilidade e inovação corporativa.',
    prerequisites: ['Experiência em gestão'], featured: true, status: 'active', categoryId: 'management',
    createdAt: now - 100 * day,
  },
  {
    id: 3, title: 'Data Science in Healthcare', category: 'Health', instructor: 3,
    duration: '10 semanas', hours: 100, price: 820000, rating: 4.7, students: 156,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    description: 'Aplicações de ciência de dados no setor de saúde com Python e machine learning.',
    prerequisites: ['Estatística básica', 'Python básico'], featured: true, status: 'active', categoryId: 'health',
    createdAt: now - 90 * day,
  },
  {
    id: 4, title: 'Financial Markets & Analysis', category: 'Finance', instructor: 3,
    duration: '6 semanas', hours: 60, price: 380000, rating: 4.5, students: 312,
    image: 'https://images.unsplash.com/photo-1553729459-afe8f2e1b10e?w=400&h=250&fit=crop',
    description: 'Análise de mercados financeiros, investimentos e gestão de risco.',
    prerequisites: ['Matemática financeira básica'], featured: false, status: 'active', categoryId: 'finance',
    createdAt: now - 80 * day,
  },
  {
    id: 5, title: 'Business English Advanced', category: 'Languages', instructor: 6,
    duration: '8 semanas', hours: 64, price: 290000, rating: 4.6, students: 445,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
    description: 'Inglês corporativo avançado para negociações e apresentações internacionais.',
    prerequisites: ['Inglês intermediário'], featured: false, status: 'active', categoryId: 'languages',
    createdAt: now - 70 * day,
  },
  {
    id: 6, title: 'Digital Marketing Strategy', category: 'Marketing', instructor: 6,
    duration: '6 semanas', hours: 48, price: 320000, rating: 4.4, students: 278,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    description: 'Estratégias completas de marketing digital para alavancar resultados.',
    prerequisites: ['Noções de marketing'], featured: false, status: 'active', categoryId: 'marketing',
    createdAt: now - 60 * day,
  },
  {
    id: 7, title: 'Design Systems Avançados', category: 'Tech', instructor: 6,
    duration: '8 semanas', hours: 72, price: 450000, rating: 4.9, students: 167,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    description: 'Criação e manutenção de design systems escaláveis com Figma e React.',
    prerequisites: ['UX/UI Design básico', 'Figma'], featured: false, status: 'active', categoryId: 'tech',
    createdAt: now - 50 * day,
  },
  {
    id: 8, title: 'Economia Circular 101', category: 'Management', instructor: 3,
    duration: '4 semanas', hours: 32, price: 220000, rating: 4.3, students: 98,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop',
    description: 'Fundamentos da economia circular e sustentabilidade empresarial.',
    prerequisites: [], featured: false, status: 'active', categoryId: 'management',
    createdAt: now - 40 * day,
  },
];

export const modules = [
  { id: 1, courseId: 1, title: 'Introdução ao Desenvolvimento Web', order: 1, lessons: [
    { id: 101, title: 'Bem-vindo ao CEIDS', duration: '15:00', videoUrl: '#', type: 'video', free: true },
    { id: 102, title: 'Fundamentos Teóricos', duration: '25:00', videoUrl: '#', type: 'video' },
    { id: 103, title: 'Material de Apoio (PDF)', duration: '10:00', videoUrl: '#', type: 'pdf' },
  ]},
  { id: 2, courseId: 1, title: 'HTML & CSS Moderno', order: 2, lessons: [
    { id: 201, title: 'HTML Semântico', duration: '30:00', videoUrl: '#', type: 'video' },
    { id: 202, title: 'CSS Grid & Flexbox', duration: '45:00', videoUrl: '#', type: 'video' },
    { id: 203, title: 'Projeto Prático', duration: '60:00', videoUrl: '#', type: 'video' },
  ]},
  { id: 3, courseId: 1, title: 'JavaScript Avançado', order: 3, lessons: [
    { id: 301, title: 'ES6+ Features', duration: '40:00', videoUrl: '#', type: 'video' },
    { id: 302, title: 'Async/Await e Promises', duration: '35:00', videoUrl: '#', type: 'video' },
  ]},
  { id: 4, courseId: 2, title: 'Fundamentos da Liderança', order: 1, lessons: [
    { id: 401, title: 'O que é Liderança Sustentável', duration: '20:00', videoUrl: '#', type: 'video' },
    { id: 402, title: 'Casos de Sucesso', duration: '30:00', videoUrl: '#', type: 'video' },
  ]},
];

export const enrollments = [
  { id: 1, userId: 2, courseId: 1, progress: 78, status: 'active', enrolledAt: now - 45 * day, grade: null },
  { id: 2, userId: 2, courseId: 7, progress: 42, status: 'active', enrolledAt: now - 20 * day, grade: null },
  { id: 3, userId: 2, courseId: 4, progress: 100, status: 'completed', enrolledAt: now - 90 * day, grade: 18 },
  { id: 4, userId: 5, courseId: 2, progress: 85, status: 'active', enrolledAt: now - 30 * day, grade: null },
  { id: 5, userId: 5, courseId: 6, progress: 12, status: 'active', enrolledAt: now - 10 * day, grade: null },
  { id: 6, userId: 5, courseId: 3, progress: 100, status: 'completed', enrolledAt: now - 60 * day, grade: 17 },
  { id: 7, userId: 2, courseId: 8, progress: 100, status: 'completed', enrolledAt: now - 120 * day, grade: 19 },
];

export const certificates = [
  { id: 1, userId: 2, courseId: 4, issuedAt: now - 60 * day, code: 'CEIDS-2024-0001', hours: 60, grade: 18 },
  { id: 2, userId: 5, courseId: 3, issuedAt: now - 30 * day, code: 'CEIDS-2024-0002', hours: 100, grade: 17 },
  { id: 3, userId: 2, courseId: 8, issuedAt: now - 10 * day, code: 'CEIDS-2024-0003', hours: 32, grade: 19 },
  { id: 4, userId: 2, courseId: 2, issuedAt: now - 5 * day, code: 'CEIDS-2024-0004', hours: 80, grade: null },
];

export const transactions = [
  { id: 1, userId: 2, courseId: 1, amount: 499000, status: 'paid', method: 'multicaixa', dueDate: now - 30 * day, paidAt: now - 45 * day },
  { id: 2, userId: 2, courseId: 7, amount: 450000, status: 'paid', method: 'transferencia', dueDate: now - 10 * day, paidAt: now - 20 * day },
  { id: 3, userId: 5, courseId: 6, amount: 320000, status: 'pending', method: 'boleto', dueDate: now + 5 * day },
  { id: 4, userId: 2, courseId: 4, amount: 380000, status: 'paid', method: 'pix', dueDate: now - 90 * day, paidAt: now - 95 * day },
  { id: 5, userId: 5, courseId: 3, amount: 820000, status: 'paid', method: 'multicaixa', dueDate: now - 60 * day, paidAt: now - 62 * day },
  { id: 6, userId: 7, courseId: 2, amount: 650000, status: 'paid', method: 'transferencia', dueDate: now - 5 * day, paidAt: now - 8 * day },
];

export const attendance = [
  { id: 1, userId: 2, enrollmentId: 1, lessonId: 101, date: now - 40 * day, timeWatched: '2:00:00', completed: true },
  { id: 2, userId: 2, enrollmentId: 1, lessonId: 102, date: now - 38 * day, timeWatched: '1:45:00', completed: true },
  { id: 3, userId: 2, enrollmentId: 1, lessonId: 103, date: now - 35 * day, timeWatched: '0:30:00', completed: true },
  { id: 4, userId: 2, enrollmentId: 1, lessonId: 201, date: now - 30 * day, timeWatched: '2:00:00', completed: true },
  { id: 5, userId: 2, enrollmentId: 1, lessonId: 202, date: now - 25 * day, timeWatched: '1:30:00', completed: true },
];

export const assignments = [
  { id: 1, courseId: 1, lessonId: 203, title: 'Projeto: Landing Page', description: 'Criar uma landing page responsiva', dueDate: now + 5 * day, maxGrade: 20 },
  { id: 2, courseId: 7, lessonId: null, title: 'Sistema de Design no Figma', description: 'Criar um design system completo', dueDate: now + 10 * day, maxGrade: 20 },
];

export const submissions = [
  { id: 1, assignmentId: 1, userId: 2, submittedAt: now - 2 * day, grade: null, fileUrl: '#' },
  { id: 2, assignmentId: 2, userId: 2, submittedAt: now - 1 * day, grade: 16, fileUrl: '#' },
];

export const companies = [
  { id: 1, name: 'TechLog SA', nif: '541237890', phone: '+244 956 789 012', email: 'info@techlog.co.ao',
    responsible: 'João Gaspar', employees: 45, activeStudents: 3, totalHours: 320, totalSpent: 1250000,
    createdAt: now - 180 * day, status: 'active' },
  { id: 2, name: 'Construções Angolar Lda', nif: '541098765', phone: '+244 989 012 345', email: 'info@angolar.co.ao',
    responsible: 'António Costa', employees: 120, activeStudents: 8, totalHours: 540, totalSpent: 2100000,
    createdAt: now - 90 * day, status: 'active' },
];

export const notifications = [
  { id: 1, userId: 2, title: 'Certificado Disponível', message: 'Seu certificado de Economia Circular já está disponível.', type: 'certificate', read: false, createdAt: now - 1 * day },
  { id: 2, userId: 2, title: 'Nova Aula Disponível', message: 'Módulo 2 de Full Stack Development foi aberto.', type: 'course', read: false, createdAt: now - 2 * day },
  { id: 3, userId: 2, title: 'Lembrete de Prova', message: 'Você tem uma prova marcada para amanhã.', type: 'exam', read: true, createdAt: now - 3 * day },
  { id: 4, userId: 3, title: 'Nova Matrícula', message: 'Um aluno se matriculou no seu curso.', type: 'enrollment', read: false, createdAt: now - 1 * day },
];

export const discussions = [
  { id: 1, courseId: 1, userId: 2, message: 'Excelente abordagem sobre o Green IT. Professor, teria indicações de frameworks para arquitetura serverless sustentável?',
    createdAt: now - 2 * day, likes: 14, replies: [
      { id: 11, userId: 3, message: 'Ótima pergunta! Recomendo AWS Lambda + Serverless Framework. Vou preparar um material complementar.', createdAt: now - 1 * day, likes: 8 },
    ]},
  { id: 2, courseId: 1, userId: 5, message: 'Muito bom o conteúdo do módulo 1! Estou ansioso para o próximo.', createdAt: now - 3 * day, likes: 5, replies: [] },
];

export const library = [
  { id: 1, title: 'Introdução à Programação', type: 'pdf', author: 'Prof. Miguel Santos', size: '2.4 MB', downloads: 345, url: '#' },
  { id: 2, title: 'Gestão Sustentável - Manual', type: 'pdf', author: 'Dr. Helena Rios', size: '5.1 MB', downloads: 234, url: '#' },
  { id: 3, title: 'Data Science na Prática', type: 'ebook', author: 'Dra. Ana Paula', size: '8.2 MB', downloads: 156, url: '#' },
  { id: 4, title: 'HTML & CSS Quick Guide', type: 'pdf', author: 'Prof. Miguel Santos', size: '1.8 MB', downloads: 523, url: '#' },
  { id: 5, title: 'Workshop de Typography', type: 'video', author: 'Prof. Ana Paula', size: '245 MB', downloads: 89, url: '#' },
];

export const categories = [
  { id: 'tech', name: 'Tech', icon: 'code', color: '#316bf3' },
  { id: 'management', name: 'Management', icon: 'leaderboard', color: '#009485' },
  { id: 'health', name: 'Health', icon: 'medical_services', color: '#22C55E' },
  { id: 'finance', name: 'Finance', icon: 'payments', color: '#EAB308' },
  { id: 'languages', name: 'Languages', icon: 'translate', color: '#0051d5' },
  { id: 'marketing', name: 'Marketing', icon: 'campaign', color: '#ba1a1a' },
];

export default { users, courses, modules, enrollments, certificates, transactions, attendance, assignments, submissions, companies, notifications, discussions, library, categories };
