import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, Leaf, MessageCircle, X } from 'lucide-react';
import { LEAD_NUTRITIONIST, SPECIALTIES } from '../data/clinicData';

interface BookingDrawerProps {
  open: boolean;
  initialSpecialty?: string;
  onClose: () => void;
}

const MODALITIES = ['Presencial · Jardins (SP)', 'Teleconsulta Online'];

const PERIODS = [
  'Manhã (08h00 às 12h)',
  'Tarde (13h30 às 17h)',
  'Final de Tarde (17h às 19h30)',
];

export function BookingDrawer({
  open,
  initialSpecialty,
  onClose,
}: BookingDrawerProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState(
    initialSpecialty || SPECIALTIES[0].title
  );
  const [modality, setModality] = useState(MODALITIES[0]);
  const [period, setPeriod] = useState(PERIODS[0]);
  const [notes, setNotes] = useState('');
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  useEffect(() => {
    if (initialSpecialty) setSpecialty(initialSpecialty);
  }, [initialSpecialty]);

  const handleConfirmSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `HLP-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedCode(randomCode);
  };

  const handleWhatsApp = () => {
    const clinicNumber = import.meta.env.VITE_CLINIC_WHATSAPP || '5511999990000';
    const text = encodeURIComponent(
      `Olá, Dra. Helena Prado! Gostaria de agendar uma consulta.\n` +
        `Nome: ${name || 'Não informado'}\n` +
        `Área de interesse: ${specialty}\n` +
        `Modalidade: ${modality}\n` +
        `Turno preferencial: ${period}\n` +
        (notes ? `Observações: ${notes}` : '')
    );
    window.open(`https://wa.me/${clinicNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const resetAndClose = () => {
    setSubmittedCode(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 z-50 flex justify-end bg-[#133123]/60 backdrop-blur-sm"
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Agendamento de Consulta com a Dra. Helena Prado"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-full w-full max-w-lg overflow-y-auto bg-[#F6FAF7] p-6 sm:p-10 text-[#133123] shadow-verda-deep"
          >
            <div className="flex items-center justify-between border-b border-[#133123]/10 pb-5">
              <div>
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#1F7A53]">
                  {LEAD_NUTRITIONIST.name} · {LEAD_NUTRITIONIST.crn}
                </p>
                <h2 className="mt-1 font-display text-3xl font-semibold">
                  Agendar Consulta
                </h2>
              </div>
              <button
                type="button"
                aria-label="Fechar janela de agendamento"
                onClick={resetAndClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#133123]/15 bg-white text-[#133123] hover:bg-[#D5ECDD] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submittedCode ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 card-leaf border border-[#1F7A53]/25 bg-[#1A3F2E] p-8 text-[#F6FAF7] shadow-verda-deep"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2A9266] text-white">
                  <CalendarCheck className="h-6 w-6" />
                </div>
                <p className="mt-5 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#A7E8C3]">
                  Pré-Reserva Registrada · {submittedCode}
                </p>
                <h3 className="mt-2 font-display text-3xl font-medium">
                  Recebemos sua solicitação, {name || 'paciente'}.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#C2E2CF]">
                  Confirmaremos o melhor horário com a{' '}
                  <strong className="text-white">{LEAD_NUTRITIONIST.name}</strong> para{' '}
                  <strong className="text-white">{specialty}</strong> ({modality}, {period}).
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D5ECDD] px-6 py-3.5 text-sm font-semibold text-[#133123] hover:bg-white transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-[#1F7A53]" />
                    <span>Acelerar confirmação no WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="inline-flex w-full items-center justify-center rounded-full border border-[#A7E8C3]/35 px-6 py-3 text-xs font-medium text-[#EAF4EE] hover:border-[#A7E8C3] transition-colors"
                  >
                    Voltar ao site
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleConfirmSimulation} className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#466959]"
                  >
                    Nome Completo
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como prefere ser chamado(a)"
                    className="mt-2 w-full rounded-2xl border border-[#133123]/15 bg-white px-4 py-3.5 text-sm text-[#133123] outline-none focus:border-[#1F7A53] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#466959]"
                  >
                    WhatsApp para Contato
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-0000"
                    className="mt-2 w-full rounded-2xl border border-[#133123]/15 bg-white px-4 py-3.5 text-sm text-[#133123] outline-none focus:border-[#1F7A53] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-specialty"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#466959]"
                  >
                    Objetivo Principal
                  </label>
                  <select
                    id="booking-specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#133123]/15 bg-white px-4 py-3.5 text-sm text-[#133123] outline-none focus:border-[#1F7A53] transition-colors"
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Avaliação Nutricional & Check-up">
                      Avaliação Nutricional &amp; Check-up
                    </option>
                  </select>
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#466959]">
                    Modalidade de Atendimento
                  </span>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {MODALITIES.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setModality(m)}
                        className={`rounded-2xl border px-4 py-3 text-left text-xs font-medium transition-colors ${
                          modality === m
                            ? 'border-[#1F7A53] bg-[#D5ECDD] text-[#133123]'
                            : 'border-[#133123]/12 bg-white text-[#466959] hover:border-[#1F7A53]/40'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#466959]">
                    Turno Preferencial
                  </span>
                  <div className="mt-2 grid grid-cols-1 gap-2">
                    {PERIODS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPeriod(p)}
                        className={`rounded-2xl border px-4 py-3 text-left text-xs font-medium transition-colors ${
                          period === p
                            ? 'border-[#1F7A53] bg-[#D5ECDD] text-[#133123]'
                            : 'border-[#133123]/12 bg-white text-[#466959] hover:border-[#1F7A53]/40'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-notes"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#466959]"
                  >
                    Observações (Opcional)
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Preferências alimentares, exames recentes ou dúvidas"
                    className="mt-2 w-full rounded-2xl border border-[#133123]/15 bg-white px-4 py-3 text-sm text-[#133123] outline-none focus:border-[#1F7A53] transition-colors"
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1F7A53] px-6 py-4 text-sm font-semibold text-white shadow-verda hover:bg-[#175F40] transition-colors"
                  >
                    <Leaf className="h-4 w-4" />
                    <span>Confirmar Solicitação de Horário</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#133123]/20 bg-white px-6 py-3.5 text-xs font-semibold text-[#133123] hover:bg-[#EAF4EE] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-[#1F7A53]" />
                    <span>Enviar direto pelo WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
