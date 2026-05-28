import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Info from './pages/Info'
import { Menu } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 flex justify-between items-center text-ink">
      <Link to="/" className="font-display text-2xl tracking-tighter font-bold uppercase">
        VM.
      </Link>
      
      <div className="flex gap-8 items-center font-display uppercase tracking-widest text-sm">
        <Link 
          to="/" 
          className={`hover:text-ink transition-colors ${location.pathname === '/' ? 'text-ink border-b border-accent' : 'text-ink-soft'}`}
        >
          WORK
        </Link>
        <Link 
          to="/info" 
          className={`hover:text-ink transition-colors ${location.pathname === '/info' ? 'text-ink border-b border-accent' : 'text-ink-soft'}`}
        >
          INFO
        </Link>
        <button className="text-ink-soft hover:text-ink transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  )
}

function App() {
  const location = useLocation()
  const [sailingProgress, setSailingProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = (e) => {
      if (e.detail && typeof e.detail.p === 'number') {
        setSailingProgress(e.detail.p)
      }
    }
    
    window.addEventListener('work-scroll', handleScroll)
    return () => {
      window.removeEventListener('work-scroll', handleScroll)
    }
  }, [])

  return (
    <div className="antialiased text-text-primary bg-bg-primary min-h-screen relative">
      <Navigation />
      
      {location.pathname !== '/info' && (
        <div aria-hidden="true">
          <div className="static-horizon">
            <div className="static-horizon-fill" style={{ height: `${sailingProgress * 100}%` }} />
            <div className={`static-horizon-dot dot-1 ${sailingProgress >= 0.30 ? 'active' : ''}`} />
            <div className={`static-horizon-dot dot-2 ${sailingProgress >= 0.62 ? 'active' : ''}`} />
            <div className={`static-horizon-dot dot-3 ${sailingProgress >= 0.90 ? 'active' : ''}`} />
          </div>
          <div className="static-horizon-meta">— still sailing</div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </div>
  )
}

export default App
