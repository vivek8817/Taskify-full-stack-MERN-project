import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import ProtectedRoute from './components/ProtectedRoutes';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      

    <Routes>
      <Route path='/' element={<Navigate to='/Dashboard' replace/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      
    </Routes>
    </div>
  )
}

export default App