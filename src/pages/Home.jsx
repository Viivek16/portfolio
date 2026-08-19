import React from 'react'
import Hero from '../components/Hero'
import BrandStrip from '../components/BrandStrip'
import ScrollProgress from '../components/ScrollProgress'
import WorkStats from '../components/WorkStats'
import WorkAbout from '../components/WorkAbout'
import ThreePillars from '../components/ThreePillars'
import FunSection from '../components/FunSection'
import PodcastSection from '../components/PodcastSection'
import TestimonialSection from '../components/TestimonialSection'
import Footer from '../components/Footer'
import ToolsBuilt from '../components/ToolsBuilt'
import CaseStudies from '../components/CaseStudies'

const Home = () => {
  return (
    <main className="relative w-full bg-bg-primary">
      <ScrollProgress />
      <Hero />
      <BrandStrip />
      <WorkStats />
      <WorkAbout />
      <ThreePillars />
      <ToolsBuilt />
      <CaseStudies />
      <FunSection />
      <PodcastSection />
      <TestimonialSection />
      <Footer />
    </main>
  )
}

export default Home
