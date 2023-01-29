import './App.css';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
const App = ()=>{
  const apikey= process.env.REACT_APP_NEWS_API
  const[progress,setProgress]= useState(0)
    return (
      <div>
        {/* keys dene se system samajh jaayega ki isse remount karna hai. | alag alag keys dene se aap force rebound kar sakte hai */}
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={6} category="general"/>} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={6} category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={6} category="health" />} />
            <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={6} category="business" />} />
            <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={6} category="science" />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={6} category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" pageSize={6} category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
// Hooks - are functions in react which allows function based components to do everything which we do in class based components
export default App;