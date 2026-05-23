
import React from 'react';

const Footer: React.FC = () => {
  const developerWhatsApp = '5541988710303';
  const developerMessage = encodeURIComponent('Olá! Gostaria de saber mais sobre como ter um link personalizado para o meu negócio.');
  const developerUrl = `https://api.whatsapp.com/send?phone=${developerWhatsApp}&text=${developerMessage}`;

  return (
    <footer className="w-full text-center text-stone-400 pb-1 sm:pb-2 px-2">
      <p className="mb-1 text-[9px] sm:text-[10px]">
        Quer um site como este para você?{' '}
        <a href={developerUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-stone-300 hover:text-amber-300 underline underline-offset-2 transition-colors">
          Fale conosco!
        </a>
      </p>
      <p className="text-[9px] sm:text-[10px]">
        Desenvolvido por{' '}
        <a href="https://www.instagram.com/inteligenciarte.ia" target="_blank" rel="noopener noreferrer" className="font-semibold text-stone-300 hover:text-amber-300 transition-colors">
          @inteligenciarte.ia
        </a>
      </p>
    </footer>
  );
};

export default Footer;
