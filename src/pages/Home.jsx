import React from 'react'
import Hero from '../components/Hero'
import ScrollProgress from '../components/ScrollProgress'
import WorkStats from '../components/WorkStats'
import WorkAbout from '../components/WorkAbout'
import ThreePillars from '../components/ThreePillars'
import FunSection from '../components/FunSection'
import PodcastSection from '../components/PodcastSection'
import TestimonialSection from '../components/TestimonialSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <main className="relative w-full bg-bg-primary">
      <ScrollProgress />
      <Hero />
      <WorkStats />
      <WorkAbout />
      <ThreePillars />
      <FunSection />
      <PodcastSection />
      <TestimonialSection />
      <Footer />
    </main>
  )
}

export default Home
