import React from 'react'
import Hero from '../components/Hero'
import WorkStats from '../components/WorkStats'
import WorkAbout from '../components/WorkAbout'
import ThreePillars from '../components/ThreePillars'

const Home = () => {
  return (
    <main className="relative w-full bg-bg-primary">
      <Hero />
      <WorkStats />
      <WorkAbout />
      <ThreePillars />
    </main>
  )
}

export default Home
