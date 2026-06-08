import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';

interface CoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CoursesModal: React.FC<CoursesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm overflow-hidden rounded-xl border border-amber-300/20 bg-zinc-950 p-6 text-white shadow-2xl shadow-amber-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 p-1 bg-zinc-800/50 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-amber-400/10 p-3 rounded-full mb-4 ring-1 ring-amber-400/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <h2 className="font-cinzel text-2xl font-bold text-amber-300 tracking-wider mb-2">Cursos</h2>
          <p className="text-stone-400 text-sm mb-8 px-2 leading-relaxed">
            Especialize-se com os melhores conteúdos e torne-se uma profissional de destaque no mercado da beleza.
          </p>

          <div className="w-full space-y-4">
            <a
              href="http://luxacademy.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full flex items-center justify-between bg-zinc-900 border border-amber-900/40 hover:border-amber-400/50 p-4 rounded-xl transition-all duration-300"
            >
              <div className="flex flex-col text-left">
                <span className="font-semibold text-amber-200 group-hover:text-amber-100 transition-colors">Curso de Lash</span>
                <span className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                  Lux Academy <ExternalLink size={12} />
                </span>
              </div>
              <div className="bg-amber-400/10 p-2 rounded-lg group-hover:bg-amber-400 group-hover:text-black text-amber-500 transition-colors">
                <ExternalLink size={20} />
              </div>
            </a>

            <div className="w-full flex items-center justify-between bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl opacity-80 cursor-not-allowed">
              <div className="flex flex-col text-left">
                <span className="font-semibold text-stone-300">Sobrancelhas Perfeitas</span>
                <span className="text-xs text-amber-400/70 mt-1 flex items-center gap-1">
                  <Clock size={12} /> Em breve
                </span>
              </div>
              <div className="text-zinc-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesModal;
