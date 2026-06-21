import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return <a href="https://wa.me/221777017004?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20mon%20projet." target="_blank" rel="noreferrer" aria-label="Ouvrir une conversation WhatsApp" className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 inline-flex items-center gap-3 bg-[#25D366] text-[#102718] border border-black/20 rounded-[8px] px-4 py-3 font-semibold text-sm transition-transform hover:-translate-y-1">
    <MessageCircle size={20}/><span className="hidden sm:inline">Discuter sur WhatsApp</span>
  </a>;
}
