import React from 'react';
import Header from './main/Header';
import Main from './main/Main';
import Login from './Login';
import Footer from './main/Footer';
import Resume1 from './resume/Resume1';
import Resume2 from './resume/Resume2';
import Resume3 from './resume/Resume3';
import Resume4 from './resume/Resume4';
import Resume5 from './resume/Resume5';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';


function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
    <Router>
        <div className='main-container'>
        <div className='landing-page'>
           <Header />
          <Routes>  
            <Route path="/" element={
              <>
                <Main />
              </>
            } />
            <Route path="/resume/Resume1" element={<Resume1 />} />
            <Route path="/resume/Resume2" element={<Resume2 />} />
            <Route path="/resume/Resume3" element={<Resume3 />} />
            <Route path="/resume/Resume4" element={<Resume4 />} />
            <Route path="/resume/Resume5" element={<Resume5 />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        <Footer />
        </div>
      </div>
    </Router>
    </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
