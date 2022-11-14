import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';


export class App extends Component {
  state={
    progress:40
  }
  apiKey = process.env.REACT_APP_NEWS_API_KEY
  updateProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <BrowserRouter>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
          height={2}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<News key="general" apiKey={this.apiKey} category="general" updateProgress={this.updateProgress}/>} />
          <Route path="/business" element={<News key="business" apiKey={this.apiKey} category="business" updateProgress={this.updateProgress}/>} />
          <Route path="/entertainment" element={<News key="entertainment" apiKey={this.apiKey} category="entertainment" updateProgress={this.updateProgress}/>} />
          <Route path="/health" element={<News key="health" apiKey={this.apiKey} category="health" updateProgress={this.updateProgress}/>} />
          <Route path="/science" element={<News key="science" apiKey={this.apiKey} category="science" updateProgress={this.updateProgress}/>} />
          <Route path="/sports" element={<News key="sports" apiKey={this.apiKey} category="sports" updateProgress={this.updateProgress}/>} />
          <Route path="/technology" element={<News key="technology" apiKey={this.apiKey} category="technology" updateProgress={this.updateProgress}/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App

