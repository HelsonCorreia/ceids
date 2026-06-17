import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PublicLayout from './components/layout/PublicLayout';
import SidebarLayout from './components/layout/SidebarLayout';

import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import CourseDetail from './pages/student/CourseDetail';
import Classroom from './pages/student/Classroom';
import StudentCertificates from './pages/student/Certificates';
import Library from './pages/student/Library';
import Profile from './pages/student/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/Students';
import AdminTeachers from './pages/admin/Teachers';
import AdminCompanies from './pages/admin/Companies';
import AdminCourses from './pages/admin/CoursesManage';
import AdminFinance from './pages/admin/Finance';
import AdminCertificates from './pages/admin/CertificatesManage';
import AdminReports from './pages/admin/Reports';

import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherCourses from './pages/teacher/TeacherCourses';
import TeacherAttendance from './pages/teacher/Attendance';

import CompanyDashboard from './pages/company/CompanyDashboard';
import CompanyEmployees from './pages/company/Employees';

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to={`/${user.role}/dashboard`} replace />;
  return children;
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Landing />} />
        <Route path="/login" element={user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Register />} />
      </Route>

      <Route element={<SidebarLayout />}>
        <Route path="/student/dashboard" element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/courses" element={<ProtectedRoute roles={['student']}><MyCourses /></ProtectedRoute>} />
        <Route path="/student/course/:id" element={<ProtectedRoute roles={['student']}><CourseDetail /></ProtectedRoute>} />
        <Route path="/student/classroom/:courseId/:lessonId" element={<ProtectedRoute roles={['student']}><Classroom /></ProtectedRoute>} />
        <Route path="/student/certificates" element={<ProtectedRoute roles={['student']}><StudentCertificates /></ProtectedRoute>} />
        <Route path="/student/library" element={<ProtectedRoute roles={['student']}><Library /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute roles={['student']}><Profile /></ProtectedRoute>} />

        <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute roles={['admin']}><AdminStudents /></ProtectedRoute>} />
        <Route path="/admin/teachers" element={<ProtectedRoute roles={['admin']}><AdminTeachers /></ProtectedRoute>} />
        <Route path="/admin/companies" element={<ProtectedRoute roles={['admin']}><AdminCompanies /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute roles={['admin']}><AdminCourses /></ProtectedRoute>} />
        <Route path="/admin/finance" element={<ProtectedRoute roles={['admin']}><AdminFinance /></ProtectedRoute>} />
        <Route path="/admin/certificates" element={<ProtectedRoute roles={['admin']}><AdminCertificates /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute roles={['admin']}><AdminReports /></ProtectedRoute>} />

        <Route path="/teacher/dashboard" element={<ProtectedRoute roles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/teacher/courses" element={<ProtectedRoute roles={['teacher']}><TeacherCourses /></ProtectedRoute>} />
        <Route path="/teacher/attendance" element={<ProtectedRoute roles={['teacher']}><TeacherAttendance /></ProtectedRoute>} />

        <Route path="/company/dashboard" element={<ProtectedRoute roles={['company']}><CompanyDashboard /></ProtectedRoute>} />
        <Route path="/company/employees" element={<ProtectedRoute roles={['company']}><CompanyEmployees /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
