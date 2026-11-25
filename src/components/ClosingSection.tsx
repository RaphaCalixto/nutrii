import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react';
import { gsap, useGSAP, SplitText } from '../lib/gsapSetup';

interface ClosingSectionProps {
  onOpenBooking: () => void;
}

export function ClosingSection({ onOpenBooking }: ClosingSectionProps) {
  const footerRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      if (headingRef.current) {
        SplitText.create(headingRef.current, {
          type: 'lines, words',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 100,
              opacity: 0,
              stagger: 0.035,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.closing-cta-card',
                start: 'top 82%',
                once: true,
              },
            });
          },
        });
      }

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.closing-cta-card', {
          y: 36,
          opacity: 0,
          scale: 0.98,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.closing-cta-card',
            start: 'top 86%',
            once: true,
          },
        });

        gsap.from('.closing-cta-reveal', {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.75,
          delay: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.closing-cta-card',
            start: 'top 84%',
            once: true,
          },
        });

        gsap.from('.footer-col-reveal', {
          y: 22,
          opacity: 0,
          stagger: 0.12,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.footer-grid',
            start: 'top 90%',
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[#D9ECE0] text-[#133123]">
      <div className="mx-auto max-w-7xl px-5 pt-24 pb-16 sm:px-10 sm:pt-32">
        <div className="closing-cta-card card-chamfer relative overflow-hidden border border-[#1F7A53]/20 bg-[#1A3F2E] p-8 sm:p-14 lg:p-20 text-[#F6FAF7] shadow-verda-deep">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-35"
            style={{
              background: 'radial-gradient(circle, #38B27A 0%, rgba(26, 63, 46, 0) 70%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="closing-cta-reveal font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#A7E8C3]">
                Primeira Consulta · Dra. Helena Prado
              </p>
              <h2
                ref={headingRef}
                className="mt-4 font-display text-[clamp(2.3rem,5vw,4.3rem)] font-medium leading-[1.01]"
              >
                Uma avaliação nutricional completa em 60 minutos leves.
              </h2>
              <p className="closing-cta-reveal mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-[#C2E2CF]">
                Receba leitura de exames, bioimpedância segmentar e seu plano alimentar vivo no
                mesmo dia, presencialmente comigo nos Jardins ou por teleconsulta.
              </p>
            </div>

            <div className="closing-cta-reveal lg:col-span-4 flex lg:justify-end">
              <motion.button
                type="button"
                onClick={onOpenBooking}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className="inline-flex items-center gap-3 rounded-full bg-[#D5ECDD] px-8 py-5 text-sm font-semibold text-[#133123] shadow-verda hover:bg-white transition-colors"
              >
                <span>Solicitar Horário</span>
                <ArrowUpRight className="h-4 w-4 text-[#1F7A53]" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Grade Arquitetônica de Contato */}
        <div className="footer-grid mt-16 grid grid-cols-1 gap-10 border-t border-[#1F7A53]/20 pt-12 md:grid-cols-12">
          <div className="footer-col-reveal md:col-span-5">
            <p className="font-display text-3xl font-semibold text-[#133123]">
              Dra. Helena Prado
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#466959]">
              Nutrição clínica, comportamental e esportiva baseada em evidências e acolhimento
              real para o seu cotidiano.
            </p>
          </div>

          <div className="footer-col-reveal md:col-span-3 space-y-3 text-sm text-[#385748]">
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#1F7A53]">
              Localização
            </p>
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1F7A53]" />
              <span>
                Al. Campinas, 840 · Conj. 12
                <br />
                Jardins · São Paulo, SP
              </span>
            </div>
          </div>

          <div className="footer-col-reveal md:col-span-4 space-y-3 text-sm text-[#385748]">
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#1F7A53]">
              Atendimento &amp; Horários
            </p>
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-[#1F7A53]" />
              <span>Segunda a Sexta, 08h00 às 19h30</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#1F7A53]" />
              <span>(11) 3054-7820 · Presencial &amp; Online</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#1F7A53]/15 pt-6 text-xs text-[#466959]">
          <span>© 2026 Dra. Helena Prado Nutrição. Todos os direitos reservados.</span>
          <span className="font-mono-tech text-[10px]">
            Dra. Helena Prado · CRN-3 52.940
          </span>
        </div>
      </div>
    </footer>
  );
}
