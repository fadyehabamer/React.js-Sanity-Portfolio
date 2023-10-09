import { Routes } from 'react-router-dom';

import { Route } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';

import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Project from './components/Project.jsx';
import Post from './components/Post.jsx';
import SinglePost from './components/SinglePost.jsx';
import './App.css';

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/project" exact element={<Project />} />
          <Route path="/post" exact element={<Post />} />
          <Route path="/post/:slug" exact element={<SinglePost />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
