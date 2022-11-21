import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import React, {useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default function App() {
  const [progress,setProgress]=useState(10);
  const apiKey = process.env.REACT_APP_NEWS_API_KEY
  const updateProgress = (progress) => {
    setProgress(progress)
  }
  
  return (
    <BrowserRouter>
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={2}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<News key="general" apiKey={apiKey} category="general" updateProgress={updateProgress} />} />
        <Route path="/business" element={<News key="business" apiKey={apiKey} category="business" updateProgress={updateProgress} />} />
        <Route path="/entertainment" element={<News key="entertainment" apiKey={apiKey} category="entertainment" updateProgress={updateProgress} />} />
        <Route path="/health" element={<News key="health" apiKey={apiKey} category="health" updateProgress={updateProgress} />} />
        <Route path="/science" element={<News key="science" apiKey={apiKey} category="science" updateProgress={updateProgress} />} />
        <Route path="/sports" element={<News key="sports" apiKey={apiKey} category="sports" updateProgress={updateProgress} />} />
        <Route path="/technology" element={<News key="technology" apiKey={apiKey} category="technology" updateProgress={updateProgress} />} />
      </Routes>
    </BrowserRouter>
  )
}
