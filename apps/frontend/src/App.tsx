import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage } from './components/MainPage.js';
import { PromptPlaygroundPage } from './components/PromptPlaygroundPage.js';
import { TraceViewerPage } from './components/TraceViewerPage.js';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/trace/:traceId" element={<TraceViewerPage />} />
        <Route path="/playground" element={<PromptPlaygroundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
