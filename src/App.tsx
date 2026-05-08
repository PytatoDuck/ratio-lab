import React from 'react';
import { motion } from 'motion/react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Canvas } from './components/visualizer/Canvas';
import { Toolbox } from './components/toolbox/Toolbox';
import { OverlayList } from './components/overlays/OverlayList';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative z-0">
      <Header />

      <main className="flex-1 w-full max-w-400 mx-auto px-4 py-8">
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* ROW 1: Toolbox + Canvas */}
          <section className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative z-20">
            <div className="w-full lg:w-95 xl:w-105 shrink-0 order-2 lg:order-1">
              <Toolbox />
            </div>

            <div className="flex-1 min-w-0 order-1 lg:order-2">
              <Canvas />
            </div>
          </section>

          {/* ROW 2: Overlays */}
          <section className="w-full order-3 relative z-10">
            <OverlayList />
          </section>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default App;