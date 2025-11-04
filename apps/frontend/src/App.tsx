import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { TraceViewerPage } from './components/TraceViewerPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/trace/:traceId" element={<TraceViewerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
