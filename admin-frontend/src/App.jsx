import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/sidebar';
import MainContent from './components/layout/maincontent';
import PostsManager from './components/layout/megepost';
import CountryForm from './components/layout/form';
import CountryTable from './components/layout/countrylist';
import Country from './components/layout/country';
import Footer from './components/layout/footer';
import Header from './components/layout/header';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Sidebar />
        <Header/>
        
        <main className="app-main">
          <Routes>
            {/* Dashboard */}
            <Route path="/dashboard" element={<MainContent />} />
            
            {/* Posts */}
            <Route path="/posts" element={<PostsManager />} />
            
            {/* Country Routes */}
            <Route path="/country" element={<Country />} />
            {/* <Route path="/country/form" element={<CountryForm />} />
            <Route path="/country/list" element={<CountryTable />} /> */}
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
