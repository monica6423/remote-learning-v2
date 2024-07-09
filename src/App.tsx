import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import Profiles from './views/Profile';

import './App.css'

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profiles" element={<Profiles />} />
      </Route>
    </Routes>
  </Router>
  )
}

export default App
