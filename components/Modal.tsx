
import React, { useState } from 'react';
import { FormData, ProcedureCategory } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
}

const procedures = {
  [ProcedureCategory.LASH]: ['Lash Lifting', 'Extensão de Cílios'],
  [ProcedureCategory.BROWS]: ['Henna', 'Tintura', 'Brown Lamination', 'Design Feminino', 'Design Masculino'],
  [ProcedureCategory.SKIN]: ['Radiofrequência', 'Limpeza Profunda', 'Limpeza Relaxante'],
  [ProcedureCategory.BOTOX]: ['Botox Day'],
  [ProcedureCategory.NANO]: ['Nanopigmentação (em breve)'],
};

const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, formData, setFormData, onSubmit }) => {
  const [selectedCategories, setSelectedCategories] = useState<ProcedureCategory[]>([]);
  
  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePeriodsChange = (period: string) => {
    setFormData(prev => {
      const newPeriods = prev.preferredPeriods.includes(period)
        ? prev.preferredPeriods.filter((p) => p !== period)
        : [...prev.preferredPeriods, period];
      return { ...prev, preferredPeriods: newPeriods };
    });
  };
  
  const handleWeekDayChange = (day: string) => {
    setFormData(prev => {
      const newWeekDays = prev.preferredWeekDays.includes(day)
        ? prev.preferredWeekDays.filter(d => d !== day)
        : [...prev.preferredWeekDays, day];
      return { ...prev, preferredWeekDays: newWeekDays };
    });
  };

  const handleWantsSpecificDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData(prev => ({
      ...prev,
      wantsSpecificDate: checked,
      preferredPeriods: checked ? [] : prev.preferredPeriods,
      preferredWeekDays: checked ? [] : prev.preferredWeekDays,
    }));
  }

  const handleCategoryChange = (category: ProcedureCategory) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);

    if (!newSelectedCategories.includes(category)) {
      const proceduresToUncheck = procedures[category];
      setFormData((prev) => ({
        ...prev,
        procedure: prev.procedure.filter(
          (p) => !proceduresToUncheck.includes(p)
        ),
      }));
    }
  };

  const handleProcedureChange = (procedureName: string) => {
    if (procedureName.includes('(em breve)')) return;
    setFormData((prev) => {
      const newProcedures = prev.procedure.includes(procedureName)
        ? prev.procedure.filter((p) => p !== procedureName)
        : [...prev.procedure, procedureName];
      return { ...prev, procedure: newProcedures };
    });
  };

  const isTimePreferenceValid = (formData.wantsSpecificDate && formData.specificDate.trim() !== '') || (!formData.wantsSpecificDate && formData.preferredPeriods.length > 0 && formData.preferredWeekDays.length > 0);
  const isFormValid = formData.name.trim() !== '' && formData.procedure.length > 0 && isTimePreferenceValid;

  // --- Progressive Disclosure Logic ---
  const showServices = formData.name.trim() !== '';
  const showTimeAndDate = showServices && formData.procedure.length > 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-11/12 max-w-lg rounded-xl border border-amber-300/20 bg-[#111] p-6 sm:p-8 text-white shadow-2xl shadow-amber-900/20 max-h-[90vh] overflow-y-auto"
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

        <h2 className="font-cinzel text-2xl text-center text-amber-300 mb-2">Agendamento via WhatsApp</h2>
        <p className="text-center text-gray-400 mb-6 text-sm">Preencha os dados para iniciar a conversa.</p>

        <form onSubmit={onSubmit} className="space-y-5">
            {/* Step 1: Always visible */}
            <div className="rounded-lg border border-gray-700 p-3">
              <label htmlFor="isClient" className="flex items-center space-x-3 group cursor-pointer">
                <input id="isClient" name="isClient" type="checkbox" checked={formData.isClient} onChange={handleCheckboxChange} className="sr-only" />
                 <div className={`w-5 h-5 border-2 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-200 ${formData.isClient ? 'bg-amber-400 border-amber-400' : 'border-gray-500 group-hover:border-amber-400'}`}>
                    {formData.isClient && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                 </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">Já sou cliente</span>
              </label>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Seu Nome</label>
              <input
                type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required
                className="w-full bg-black/30 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                placeholder="Ex: Maria da Silva"
              />
            </div>
            
            {/* Step 2: Show services when name is filled */}
            {showServices && (
                <div className="fade-in space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Qual serviço?</label>
                        <div className="space-y-2 rounded-lg border border-gray-700 p-3">
                            {Object.values(ProcedureCategory).map((cat) => (
                            <label key={cat} className="flex items-center space-x-3 group cursor-pointer">
                                <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => handleCategoryChange(cat)} className="sr-only"/>
                                <div className={`w-5 h-5 border-2 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-200 ${selectedCategories.includes(cat) ? 'bg-amber-400 border-amber-400' : 'border-gray-500 group-hover:border-amber-400'}`}>
                                {selectedCategories.includes(cat) && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors">{cat}</span>
                            </label>
                            ))}
                        </div>
                    </div>

                    {selectedCategories.length > 0 && (
                        <div className="fade-in space-y-4">
                            <label className="block text-sm font-medium text-gray-300">Qual procedimento?</label>
                            <div className="space-y-3 rounded-lg border border-gray-700 p-3 max-h-48 overflow-y-auto">
                            {selectedCategories.map(category => (
                                <div key={category}>
                                <p className="font-semibold text-amber-300/90 text-sm mb-2">{category}</p>
                                <div className="space-y-2 pl-2 border-l-2 border-gray-700/50">
                                    {procedures[category].map((item) => (
                                    <label key={item} className={`flex items-center space-x-3 group ${item.includes('(em breve)') ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
                                        <input type="checkbox" checked={formData.procedure.includes(item)} onChange={() => handleProcedureChange(item)} disabled={item.includes('(em breve)')} className="sr-only"/>
                                        <div className={`w-5 h-5 border-2 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-200 ${formData.procedure.includes(item) ? 'bg-amber-400 border-amber-400' : 'border-gray-500 group-hover:border-amber-400'}`}>
                                        {formData.procedure.includes(item) && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                        </div>
                                        <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                    </label>
                                    ))}
                                </div>
                                </div>
                            ))}
                            </div>
                             {formData.procedure.length === 0 && <p className="text-xs text-red-400/80 pt-1">Por favor, selecione ao menos um procedimento.</p>}
                        </div>
                    )}
                </div>
            )}
            
            {/* Step 3: Show time preferences when a procedure is selected */}
            {showTimeAndDate && (
                <div className="fade-in space-y-5">
                    <fieldset className="rounded-lg border border-gray-700 p-3">
                        <legend className="text-sm font-medium text-gray-300 px-1">Período de Preferência</legend>
                        <div className={`flex flex-wrap gap-4 pt-2 transition-opacity duration-300 ${formData.wantsSpecificDate ? 'opacity-50' : ''}`}>
                        {['Manhã', 'Tarde', 'Noite'].map(period => (
                            <label key={period} className={`flex items-center space-x-3 group ${formData.wantsSpecificDate ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                            <input type="checkbox" checked={formData.preferredPeriods.includes(period)} onChange={() => handlePeriodsChange(period)} disabled={formData.wantsSpecificDate} className="sr-only"/>
                            <div className={`w-5 h-5 border-2 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-200 ${formData.preferredPeriods.includes(period) ? 'bg-amber-400 border-amber-400' : 'border-gray-500 group-hover:border-amber-400'}`}>
                                {formData.preferredPeriods.includes(period) && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            </div>
                            <span className="text-gray-300 group-hover:text-white transition-colors">{period}</span>
                            </label>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="rounded-lg border border-gray-700 p-3">
                        <legend className="text-sm font-medium text-gray-300 px-1">Dia da Semana</legend>
                        <div className={`flex flex-wrap gap-x-6 gap-y-3 pt-2 transition-opacity duration-300 ${formData.wantsSpecificDate ? 'opacity-50' : ''}`}>
                        {weekDays.map(day => (
                            <label key={day} className={`flex items-center space-x-3 group ${formData.wantsSpecificDate ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                            <input type="checkbox" checked={formData.preferredWeekDays.includes(day)} onChange={() => handleWeekDayChange(day)} disabled={formData.wantsSpecificDate} className="sr-only"/>
                            <div className={`w-5 h-5 border-2 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-200 ${formData.preferredWeekDays.includes(day) ? 'bg-amber-400 border-amber-400' : 'border-gray-500 group-hover:border-amber-400'}`}>
                                {formData.preferredWeekDays.includes(day) && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            </div>
                            <span className="text-gray-300 group-hover:text-white transition-colors">{day}</span>
                            </label>
                        ))}
                        </div>
                    </fieldset>

                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-xs">OU</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>
                    
                    <div className="space-y-4">
                        <label htmlFor="wantsSpecificDate" className="flex items-center space-x-3 group cursor-pointer">
                        <input id="wantsSpecificDate" name="wantsSpecificDate" type="checkbox" checked={formData.wantsSpecificDate} onChange={handleWantsSpecificDateChange} className="sr-only"/>
                            <div className={`w-5 h-5 border-2 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-200 ${formData.wantsSpecificDate ? 'bg-amber-400 border-amber-400' : 'border-gray-500 group-hover:border-amber-400'}`}>
                            {formData.wantsSpecificDate && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">Reservar um dia específico</span>
                        </label>

                        {formData.wantsSpecificDate && (
                            <div className="fade-in">
                                <label htmlFor="specificDate" className="sr-only">Data específica</label>
                                <input
                                type="date" id="specificDate" name="specificDate" value={formData.specificDate} onChange={handleInputChange} required={formData.wantsSpecificDate}
                                className="w-full bg-black/30 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                                />
                            </div>
                        )}
                    </div>
                    {showTimeAndDate && !isTimePreferenceValid && (formData.preferredPeriods.length > 0 || formData.preferredWeekDays.length > 0 || (formData.wantsSpecificDate && formData.specificDate === '')) &&
                        <p className="text-xs text-red-400/80 pt-1 -mt-4">Por favor, complete sua preferência de horário ou selecione uma data.</p>
                    }
                </div>
            )}

            <button
                type="submit"
                disabled={!isFormValid}
                className="shine-hover w-full bg-amber-400 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 hover:enabled:bg-amber-300 hover:enabled:scale-105"
            >
                Enviar via WhatsApp
            </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;