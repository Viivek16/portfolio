import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Info from './pages/Info'
import { Menu } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 flex justify-between items-center mix-blend-difference text-white">
      <Link to="/" className="font-display text-2xl tracking-tighter font-bold uppercase">
        VM.
      </Link>
      
      <div className="flex gap-8 items-center font-display uppercase tracking-widest text-sm">
        <Link 
          to="/" 
          className={`hover:opacity-100 transition-opacity ${location.pathname === '/' ? 'opacity-100 border-b border-white' : 'opacity-60'}`}
        >
          Work
        </Link>
        <Link 
          to="/info" 
          className={`hover:opacity-100 transition-opacity ${location.pathname === '/info' ? 'opacity-100 border-b border-white' : 'opacity-60'}`}
        >
          Info
        </Link>
        <button className="opacity-60 hover:opacity-100 transition-opacity">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  )
}

function App() {
  return (
    <div className="antialiased text-text-primary bg-bg-primary min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </div>
  )
}

export default App
