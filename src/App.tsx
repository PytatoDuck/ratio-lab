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

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <motion.div
          className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* LEFT COLUMN: Editing Toolbox */}
          <div className="order-2 lg:order-none lg:col-span-4 flex flex-col gap-6">
            <Toolbox />
          </div>

          {/* RIGHT COLUMN: Canvas & Active List */}
          <div className="contents lg:flex lg:flex-col lg:col-span-8 lg:gap-6">
            <div className="order-1 lg:order-none w-full">
              <Canvas />
            </div>

            <div className="order-3 lg:order-none w-full">
              <OverlayList />
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default App;