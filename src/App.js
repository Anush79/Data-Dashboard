import logo from './logo.svg';
import './App.css';

import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import { useUser } from './context/UserContext';
import Loading from './components/Loading';
import ToastContain from './components/ToastContainer';

function App() {
  const { user ,loading} = useUser()
  return (
    <div className="App">
      <Header />
      {
        loading && <Loading/>
      }
      <Routes>
        <Route path="/" element={user.token ? <Dashboard /> : <Login />} />
        <Route path="/signup" element={user.token ? <Dashboard /> : <SignUp />} />
        <Route path="/dashboard/:gender/:age" element={user.token ? <Dashboard /> : <Login />} />

        <Route path="/dashboard/" element={user.token ? <Dashboard /> : <Login />} />
      <Route path='*' element={<h2>Something went wrong, route not found</h2>}/>
      </Routes>
      <ToastContain/>
    </div>
  );
}

export default App;
