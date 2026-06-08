import React, { useState } from 'react';
import { BookOpen, ExternalLink, Construction, User, MessageCircle, ChevronLeft } from 'lucide-react';
import Modal from './Modal';
import { FormData } from '../types';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const catalogs = [
  {
    name: 'Joyci Almeida',
    photo: '/joy.png',
    link: 'https://catalogolux.vercel.app/',
    status: 'active',
    role: 'Especialista em Cílios e Sobrancelhas',
    instagram: 'https://www.instagram.com/_jooycii',
    whatsapp: '42999722042'
  },
  {
    name: 'Lorraine Miranda',
    photo: '/lola.png',
    link: '#',
    status: 'construction',
    role: 'Lash Designer',
    instagram: 'https://www.instagram.com/lash_lohainemiranda',
    whatsapp: '42998568443'
  },
  {
    name: 'Ingrid Bley',
    photo: '/ingrid.png',
    link: '#',
    status: 'construction',
    role: 'Lash Designer',
    instagram: 'https://www.instagram.com/ingridbley.lash',
    whatsapp: '42999018270'
  }
];

const CatalogModal: React.FC<CatalogModalProps> = ({ isOpen, onClose }) => {
  const [selectedPro, setSelectedPro] = useState<typeof catalogs[0] | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    isClient: false,
    preferredPeriods: [],
    preferredWeekDays: [],
    wantsSpecificDate: false,
    specificDate: '',
    procedure: [],
  });

  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedPro(null);
        setIsWhatsAppModalOpen(false);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setSelectedPro(null);
    setIsWhatsAppModalOpen(false);
    onClose();
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPro) return;
    
    const { name, isClient, preferredPeriods, preferredWeekDays, wantsSpecificDate, specificDate, procedure } = formData;
    if (procedure.length === 0) return;

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

    const message = `Olá ${selectedPro.name.split(' ')[0]}! Vi seu perfil no app Luxury Studio e gostaria de agendar um horário.\n\n` +
                  `Nome: ${name}\n` +
                  `${clientStatusText}\n\n` +
                  `Procedimento(s): ${procedureText}\n\n` +
                  `Preferências de Horário:\n${timePreferenceText}\n\n` +
                  `Aguardo contato, obrigado!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=55${selectedPro.whatsapp}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsWhatsAppModalOpen(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-xl border border-amber-300/20 bg-[#111] p-4 sm:p-5 text-white shadow-2xl shadow-amber-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!selectedPro ? (
          <>
            <div className="flex flex-col items-center text-center mb-4">
              <div className="bg-amber-400/10 p-2 sm:p-2.5 rounded-full mb-2 mt-1 sm:mt-0">
                <BookOpen className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="font-cinzel text-lg sm:text-xl text-amber-300">Nossos Catálogos</h2>
              <p className="text-gray-400 text-[11px] sm:text-xs mt-0.5">Selecione a profissional</p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {catalogs.map((catalog, index) => (
                <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-2.5 sm:p-3 flex flex-row items-center gap-3 transition-all hover:border-amber-300/30">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-800 border-[1.5px] border-amber-300/20 overflow-hidden flex items-center justify-center shrink-0">
                    <User className="absolute w-6 h-6 text-amber-300/20" />
                    <img 
                      src={catalog.photo} 
                      alt={catalog.name}
                      className="w-full h-full object-cover relative z-10"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0 items-start text-left gap-1">
                    <h3 className="font-medium text-sm sm:text-base text-stone-200 truncate w-full">{catalog.name}</h3>
                    
                    <div className="flex items-center gap-2 w-full">
                      <button
                        onClick={() => setSelectedPro(catalog)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 py-1 px-2 rounded-md transition-all font-medium text-[10px] sm:text-[11px]"
                      >
                        <User className="w-3 h-3" />
                        Perfil
                      </button>

                      {catalog.status === 'active' ? (
                        <a
                          href={catalog.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 bg-amber-400/10 hover:bg-amber-400 hover:text-black text-amber-300 border border-amber-400/50 py-1 px-2 rounded-md transition-all font-semibold text-[10px] sm:text-[11px]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Catálogo
                        </a>
                      ) : (
                        <button
                          disabled
                          className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800/30 text-zinc-600 border border-zinc-800/50 py-1 px-2 rounded-md cursor-not-allowed font-medium text-[10px] sm:text-[11px]"
                        >
                          <Construction className="w-3 h-3" />
                          Em breve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedPro(null)}
              className="absolute top-3 left-3 text-gray-400 hover:text-white transition-colors z-10 p-1 bg-zinc-800/50 rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-800 border-2 border-amber-300/40 overflow-hidden flex items-center justify-center mt-4 mb-3 shadow-lg shadow-amber-900/20">
              <User className="absolute w-12 h-12 text-amber-300/20" />
              <img 
                src={selectedPro.photo} 
                alt={selectedPro.name}
                className="w-full h-full object-cover relative z-10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            <h2 className="font-cinzel text-xl sm:text-2xl text-amber-300 mb-1">{selectedPro.name}</h2>
            <p className="text-gray-400 text-xs sm:text-sm mb-6 text-center">{selectedPro.role}</p>

            <div className="w-full space-y-3">
              <button
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/50 py-2.5 px-4 rounded-lg transition-all duration-300 font-semibold text-xs sm:text-sm shadow-lg shadow-[#25D366]/10"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Agendar via WhatsApp
              </button>

              <a
                href={selectedPro.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] text-stone-200 hover:text-white border border-[#fd1d1d]/30 py-2.5 px-4 rounded-lg transition-all duration-300 font-semibold text-xs sm:text-sm shadow-lg shadow-[#fd1d1d]/10"
              >
                <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Ver Instagram
              </a>

              {selectedPro.status === 'active' && (
                <a
                  href={selectedPro.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-amber-400/10 hover:bg-amber-400 hover:text-black text-amber-300 border border-amber-400/50 py-2.5 px-4 rounded-lg transition-all duration-300 font-semibold text-xs sm:text-sm mt-2"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  Abrir Catálogo Completo
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleWhatsAppSubmit}
        professionalName={selectedPro?.name}
      />
    </div>
  );
};

export default CatalogModal;
