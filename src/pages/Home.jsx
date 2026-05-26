import React from 'react'
import Hero from '../components/Hero'
import WorkStats from '../components/WorkStats'
import WorkAbout from '../components/WorkAbout'

const Home = () => {
  return (
    <main className="relative w-full bg-bg-primary overflow-x-hidden">
      <Hero />
      <WorkStats />
      <WorkAbout />
    </main>
  )
}

export default Home
