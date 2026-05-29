import React from 'react'
import Hero from '../components/Hero'
import WorkStats from '../components/WorkStats'
import WorkAbout from '../components/WorkAbout'
import ThreePillars from '../components/ThreePillars'
import AITools from '../components/AITools'

const Home = () => {
  return (
    <main className="relative w-full bg-bg-primary">
      <Hero />
      <WorkStats />
      <WorkAbout />
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative">
        <ThreePillars />
        <AITools />
      </section>
    </main>
  )
}

export default Home
