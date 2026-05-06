import React from 'react'
import Hero from '../components/Hero'
import ImpactSection from '../components/ImpactSection'
import TravelGrid from '../components/TravelGrid'
import ZenZone from '../components/ZenZone'
import LogoCloud from '../components/LogoCloud'

const Home = () => {
  return (
    <main className="w-full bg-bg-primary">
      <Hero />
      <ImpactSection />
      <TravelGrid />
      <ZenZone />
      <LogoCloud />
    </main>
  )
}

export default Home
