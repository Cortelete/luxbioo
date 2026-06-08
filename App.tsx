
import React, { useState } from 'react';
import LinkButton from './components/LinkButton';
import Modal from './components/Modal';
import LocationModal from './components/LocationModal';
import CatalogModal from './components/CatalogModal';
import ReviewModal from './components/ReviewModal';
import Footer from './components/Footer';
import GoldenParticles from './components/GoldenParticles';
import { FormData } from './types';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [logoRotation, setLogoRotation] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    isClient: false,
    preferredPeriods: [],
    preferredWeekDays: [],
    wantsSpecificDate: false,
    specificDate: '',
    procedure: [],
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, isClient, preferredPeriods, preferredWeekDays, wantsSpecificDate, specificDate, procedure } = formData;
    if (procedure.length === 0) return;

    const studioPhoneNumber = '5542999722042';
    const procedureText = procedure.join(', ');
    const clientStatusText = isClient ? "Já sou cliente." : "Sou um(a) novo(a) cliente.";

    let timeDetails = [];
    if (wantsSpecificDate && specificDate) {
        const [year, month, day] = specificDate.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        timeDetails.push(`Data específica: ${formattedDate}`);
    } else {
        if (preferredPeriods.length > 0) {
            timeDetails.push(`Período(s): ${preferredPeriods.join(', ')}`);
        }
        if (preferredWeekDays.length > 0) {
            timeDetails.push(`Dia(s) da semana: ${preferredWeekDays.join(', ')}`);
        }
    }
    
    const timePreferenceText = timeDetails.length > 0 ? timeDetails.join('\n') : "Nenhuma preferência de horário informada.";

    const message = `Olá! Vi o app Luxury Studio e gostaria de agendar um horário.\n\n` +
                  `Nome: ${name}\n` +
                  `${clientStatusText}\n\n` +
                  `Procedimento(s): ${procedureText}\n\n` +
                  `Preferências de Horário:\n${timePreferenceText}\n\n` +
                  `Aguardo contato, obrigado!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${studioPhoneNumber}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 relative overflow-hidden">
      
      <GoldenParticles />

      <div className="relative z-10 w-full max-w-[340px] mx-auto bg-zinc-950/80 backdrop-blur-xl border border-amber-300/20 shadow-2xl shadow-amber-900/20 rounded-3xl p-5 sm:p-6 flex flex-col items-center">
        <main className="w-full flex flex-col items-center justify-center flex-grow">
          <header className="relative text-center mb-4 mt-0">
            {/* The '/logo.png' path correctly points to the 'public/logo.png' file in the project's root */}
            <img 
              src="/logo.png?v=3" 
              alt="Luxury Studio by Joyci Almeida Logo" 
              className="w-20 sm:w-28 h-auto mx-auto mb-2 cursor-pointer touch-manipulation hover:scale-105" 
              style={{ 
                transform: `scale(1) rotate(${logoRotation}deg)`, 
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' 
              }}
              onClick={() => setLogoRotation(prev => prev + 360)}
            />
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-300 tracking-widest whitespace-nowrap">
            Luxury Studio
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm tracking-[0.2em] uppercase mt-0.5">
            Joyci Almeida
            </p>
          </header>

          <div className="w-full max-w-sm">
            <div className="space-y-2 sm:space-y-3 flex flex-col items-center">
              <LinkButton href="https://www.instagram.com/luxury.joycialmeida">
                Luxury no Instagram
              </LinkButton>
              <LinkButton href="http://luxacademy.vercel.app">
                Cursos de Lash
              </LinkButton>
              <LinkButton onClick={() => setIsLocationModalOpen(true)}>
                Nossa Localização
              </LinkButton>
              <LinkButton onClick={() => setIsModalOpen(true)}>
                Agendamentos via WhatsApp
              </LinkButton>
              <LinkButton onClick={() => setIsCatalogModalOpen(true)}>
                Nosso Catálogo
              </LinkButton>
              <LinkButton onClick={() => setIsReviewModalOpen(true)}>
                Avaliação do Google
              </LinkButton>
            </div>
          </div>
        </main>

        <div className="w-full mt-3 sm:mt-4">
          <Footer />
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleWhatsAppSubmit}
      />
      
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
    </div>
  );
};

export default App;
