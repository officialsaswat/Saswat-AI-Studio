import { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { AnimatePresence } from 'framer-motion';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { About } from './components/About';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Chat } from './components/Chat';
import { Support } from './components/Support';
import { ImageGen } from './components/ImageGen';
import { Privacy } from './components/Privacy';
import { Terms } from './components/Terms';

import { CustomCursor } from './components/ui/CustomCursor';
import { IntroLoader } from './components/ui/IntroLoader';
import { GlobalScene } from './components/GlobalScene';
import { PageTransition } from './components/ui/PageTransition';
import { SmoothScroll } from './components/ui/SmoothScroll';
import { TacticalHUD } from './components/ui/TacticalHUD';
import { CompanionCore } from './components/ui/CompanionCore';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { NotFound } from './components/NotFound';

function LandingPage() {
  return (
    <PageTransition>
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </PageTransition>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/chat"
          element={
            <PageTransition>
              <SignedIn>
                <Chat />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </PageTransition>
          }
        />
        <Route
          path="/image"
          element={
            <PageTransition>
              <SignedIn>
                <ImageGen />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </PageTransition>
          }
        />
        <Route
          path="/support"
          element={
            <PageTransition>
              <SignedIn>
                <Support />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </PageTransition>
          }
        />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(false);  // DISABLED LOADER - bypass black screen

  return (
    <ErrorBoundary>
      <CustomCursor />
      {loading ? (
        <IntroLoader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <SmoothScroll />
          <GlobalScene />
          <TacticalHUD />
          <CompanionCore />
          <Router>
            <AnimatedRoutes />
          </Router>
        </>
      )}
    </ErrorBoundary>
  );
}

export default App;
