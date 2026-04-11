import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Home() {
  return <h1>Home Page - Working!</h1>;
}

function App() {
  return (
    <Router>
      <div>
        <h1>Navbar Placeholder</h1>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;