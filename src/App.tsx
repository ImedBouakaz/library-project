import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookPage from './pages/BookPage';
import BookDetailsPage from './pages/BookDetailsPage';
import './App.css'
import Navbar from './components/navbar'

function App() {

  return (
      <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/book/:bookId" element={<BookDetailsPage />} />
      </Routes>
      </div>
  );
}

export default App
