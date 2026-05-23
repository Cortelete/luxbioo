import React from 'react';
import { MapPin, Map } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Utilize the universal google maps search URL which handles deep linking gracefully across devices
  // It opens the Google Maps app if installed, or falls back to the browser.
  // Alternatively, geo:URI can be used, but https link works universally.
  const handleOpenMap = () => {
    const address = "Av. General Carlos Cavalcanti, 3380 - Uvaranas, Ponta Grossa - PR, 84025-000";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-11/12 max-w-md rounded-xl border border-amber-300/20 bg-[#111] p-6 sm:p-8 text-white shadow-2xl shadow-amber-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-amber-400/10 p-4 rounded-full hidden sm:block">
            <MapPin className="w-8 h-8 text-amber-400" />
          </div>
          
          <h2 className="font-cinzel text-2xl text-amber-300">Nossa Localização</h2>
          
          <div className="text-gray-300 space-y-1 py-2">
            <p className="font-medium text-white mb-2">Luxury Studio de Beleza</p>
            <p className="text-sm">Av. General Carlos Cavalcanti, 3380</p>
            <p className="text-sm">Uvaranas</p>
            <p className="text-sm">Ponta Grossa - PR, 84025-000</p>
          </div>

          <div className="w-full rounded-lg overflow-hidden border border-zinc-800 my-2">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.272113885402!2d-50.12125982462153!3d-25.09264847777839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81baff801d6bd%3A0x9c076e4f944bd27!2sLuxury%20Studio%20de%20Beleza!5e0!3m2!1spt-BR!2sbr!4v1779563882443!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="200" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <button
            onClick={handleOpenMap}
            className="shine-hover flex items-center justify-center gap-2 w-full bg-amber-400 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-amber-300 hover:bg-amber-300 hover:scale-105"
          >
            <Map className="w-5 h-5" />
            Abrir no Mapa
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
