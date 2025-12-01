import { Routes, Route } from 'react-router-dom';

 import Header from './components/Header'; 
 import MainPage from './pages/MainPage'; 
 import LoginPage from './pages/LoginPage';
 import RegisterPage from './pages/RegisterPage'; 
 import AboutPage from './pages/AboutPage';

function App() {
  return (
    <>
      { <Header /> }
      
      <main>
        <Routes>
          { <Route path="/" element={<MainPage />} />  }
          { <Route path="/login" element={<LoginPage />} /> }
          { <Route path="/register" element={<RegisterPage />} /> }
          { <Route path="/about" element={<AboutPage />} /> }
          
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </main>
    </>
  );
}

export default App;