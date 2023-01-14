import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';

function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
    {loading ? (
      <Spinner />
    ) : null}
    <Routes>
        <Route path="/" 
          element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
          } 
        />
        <Route path="/apply-doctor" 
          element={
          <ProtectedRoute>
            <ApplyDoctor />
          </ProtectedRoute>
          } 
        />
        <Route path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
