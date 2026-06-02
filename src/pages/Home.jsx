import React from 'react'
import Hero from '../components/Hero'
import WorkStats from '../components/WorkStats'
import WorkAbout from '../components/WorkAbout'
import ThreePillars from '../components/ThreePillars'
import FunSection from '../components/FunSection'
import PodcastSection from '../components/PodcastSection'
import TestimonialSection from '../components/TestimonialSection'

const Home = () => {
  return (
    <main className="relative w-full bg-bg-primary">
      <Hero />
      <WorkStats />
      <WorkAbout />
      <ThreePillars />
      <FunSection />
      <PodcastSection />
      <TestimonialSection />
    </main>
  )
}

export default Home
