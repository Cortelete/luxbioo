
import React, { useState } from 'react';
import LinkButton from './components/LinkButton';
import LocationModal from './components/LocationModal';
import CatalogModal from './components/CatalogModal';
import ReviewModal from './components/ReviewModal';
import CoursesModal from './components/CoursesModal';
import Footer from './components/Footer';
import GoldenParticles from './components/GoldenParticles';

const App: React.FC = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
  const [logoFlip, setLogoFlip] = useState(0);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 relative overflow-hidden">
      
      <GoldenParticles />

      <div className="relative z-10 w-full max-w-[340px] mx-auto bg-zinc-950/80 backdrop-blur-xl border border-amber-300/20 shadow-2xl shadow-amber-900/20 rounded-3xl p-5 sm:p-6 flex flex-col items-center">
        <main className="w-full flex flex-col items-center justify-center flex-grow">
          <header className="relative text-center mb-6 mt-0">
            <div className="relative inline-block mb-3">
              {/* The '/logo.png' path correctly points to the 'public/logo.png' file in the project's root */}
              <img 
                src="/logo.png?v=3" 
                alt="Luxury Studio by Joyci Almeida Logo" 
                className="w-24 sm:w-32 h-auto mx-auto cursor-pointer touch-manipulation hover:scale-105" 
                style={{ 
                  transform: `perspective(1000px) rotateY(${logoFlip}deg)`, 
                  transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                }}
                onClick={() => setLogoFlip(prev => prev + 360)}
              />
              <a 
                href="https://www.instagram.com/luxury.joycialmeida" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute -right-2 bottom-0 bg-zinc-900 border border-amber-300/30 p-2.5 rounded-full text-amber-300 hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-lg shadow-black flex items-center justify-center hover:scale-110"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-300 tracking-widest whitespace-nowrap drop-shadow-md">
            Luxury Studio
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm tracking-[0.25em] uppercase mt-1 opacity-90">
            Joyci Almeida
            </p>
          </header>

          <div className="w-full max-w-sm">
            <div className="space-y-3 sm:space-y-4 flex flex-col items-center w-full">
              <LinkButton onClick={() => setIsCatalogModalOpen(true)}>
                <div className="absolute left-3 sm:left-5 flex items-center justify-center text-amber-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
                <span className="font-medium text-center">Catálogo e Agendamento</span>
              </LinkButton>

              <LinkButton onClick={() => setIsCoursesModalOpen(true)}>
                <div className="absolute left-3 sm:left-5 flex items-center justify-center text-amber-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <span className="font-medium text-center">Cursos</span>
              </LinkButton>
              
              <LinkButton onClick={() => setIsLocationModalOpen(true)}>
                <div className="absolute left-3 sm:left-5 flex items-center justify-center text-amber-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span className="font-medium text-center">Localização</span>
              </LinkButton>
              
              <LinkButton onClick={() => setIsReviewModalOpen(true)}>
                <div className="absolute left-3 sm:left-5 flex items-center justify-center text-amber-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <span className="font-medium text-center">Avalie sua Experiência</span>
              </LinkButton>
            </div>
          </div>
        </main>

        <div className="w-full mt-5 sm:mt-6">
          <Footer />
        </div>
      </div>
      
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      <CatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      <CoursesModal
        isOpen={isCoursesModalOpen}
        onClose={() => setIsCoursesModalOpen(false)}
      />
    </div>
  );
};

export default App;
