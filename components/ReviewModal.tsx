import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setRating(0);
    setHoverRating(0);
    setShowFeedbackForm(false);
    setIsSuccess(false);
    setName('');
    setEmail('');
    setFeedback('');
    onClose();
  };

  const handleRate = (star: number) => {
    setRating(star);
    if (star === 5) {
      window.open('https://search.google.com/local/writereview?placeid=ChIJvdYB-K8b6JQRJ71E-eR2wAk', '_blank');
      handleClose();
    } else {
      setShowFeedbackForm(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/luxuy.joycialmeida@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          rating: rating,
          message: feedback,
          _subject: `Nova avaliação de ${rating} estrelas de ${name}`
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Ocorreu um erro ao enviar seu feedback. Tente novamente.');
      }
    } catch (error) {
      alert('Ocorreu um erro ao enviar seu feedback. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-sm overflow-y-auto rounded-xl border border-amber-300/20 bg-[#111] p-5 text-white shadow-2xl shadow-amber-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10 p-1 bg-zinc-800/50 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!showFeedbackForm ? (
          <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200 py-4">
            <div className="bg-amber-400/10 p-3 rounded-full mb-3">
              <Star className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="font-cinzel text-xl text-amber-300 mb-2">Avalie nosso serviço</h2>
            <p className="text-gray-400 text-sm mb-6 px-2">Como foi sua experiência no Luxury Studio?</p>
            
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star 
                    className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                      star <= (hoverRating || rating) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-zinc-600'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>
        ) : isSuccess ? (
          <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200 py-6">
            <div className="bg-[#25D366]/20 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-cinzel text-xl text-stone-200 mb-2">Obrigado pelo feedback!</h2>
            <p className="text-gray-400 text-sm mb-6">Sua opinião é muito importante para nos ajudar a melhorar.</p>
            
            <button
              onClick={handleClose}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <div className="flex flex-col animate-in fade-in zoom-in-95 duration-200 mt-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-400/10 p-2 rounded-full">
                <MessageSquare className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="font-cinzel text-lg text-amber-300">Ajude-nos a melhorar</h2>
                <p className="text-gray-400 text-xs mt-0.5">O que houve e como podemos melhorar?</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-stone-300 mb-1">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-stone-300 mb-1">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="feedback" className="block text-xs font-medium text-stone-300 mb-1">Sua mensagem</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all resize-none"
                  placeholder="Conte-nos o que aconteceu..."
                />
              </div>

              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
