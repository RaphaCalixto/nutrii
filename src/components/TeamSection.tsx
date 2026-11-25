import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { LEAD_NUTRITIONIST } from '../data/clinicData';
import { gsap, useGSAP, SplitText } from '../lib/gsapSetup';

interface TeamSectionProps {
  onBookConsultation: () => void;
}

export function TeamSection({ onBookConsultation }: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
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
                trigger: sectionRef.current,
                start: 'top 78%',
                once: true,
              },
            });
          },
        });
      }

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.team-header-reveal', {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        });

        gsap.fromTo(
          '.team-curtain',
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: '.team-curtain',
              start: 'top 84%',
              once: true,
            },
          }
        );

        gsap.from('.team-bio-reveal > *', {
          y: 22,
          opacity: 0,
          stagger: 0.09,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.team-bio-reveal',
            start: 'top 84%',
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="equipe"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-[#EDF6F0] pt-28 pb-24 sm:pt-32 sm:pb-32 px-5 sm:px-10 text-[#133123]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="team-header-reveal font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#1F7A53]">
              Sobre a Nutricionista
            </p>
            <h2
              ref={headingRef}
              className="mt-3 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.02]"
            >
              Escuta atenta e ciência aplicada em cada consulta
            </h2>
          </div>
          <p className="team-header-reveal lg:col-span-5 text-sm sm:text-base leading-relaxed text-[#466959]">
            Todo o seu acompanhamento, da primeira avaliação aos ajustes entre retornos, é
            conduzido pessoalmente por mim.
          </p>
        </div>

        {/* Destaque Editorial para a Dra. Helena Prado */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="relative w-full max-w-[380px]">
              <div className="team-curtain card-arch overflow-hidden border border-[#1F7A53]/25 bg-[#D5ECDD] aspect-[3/4] shadow-verda">
                <img
                  src={LEAD_NUTRITIONIST.image}
                  alt={LEAD_NUTRITIONIST.name}
                  width={700}
                  height={920}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-2">
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#1F7A53]">
                  {LEAD_NUTRITIONIST.crn}
                </span>
                <span className="font-mono-tech text-[11px] text-[#466959]">
                  12 ANOS DE PRÁTICA CLÍNICA
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="team-bio-reveal card-leaf border border-[#1F7A53]/20 bg-[#F6FAF7] p-8 sm:p-12 shadow-verda">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#1F7A53]">
                {LEAD_NUTRITIONIST.title}
              </p>
              <h3 className="mt-2 font-display text-4xl sm:text-5xl font-semibold leading-tight text-[#133123]">
                {LEAD_NUTRITIONIST.name}
              </h3>

              <p className="mt-5 text-base leading-relaxed text-[#466959]">
                {LEAD_NUTRITIONIST.bio}
              </p>

              <ul className="mt-7 space-y-3 border-t border-[#133123]/10 pt-6">
                {LEAD_NUTRITIONIST.credentials.map((cred) => (
                  <li key={cred} className="flex items-start gap-3 text-sm text-[#133123]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1F7A53]" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-2">
                {LEAD_NUTRITIONIST.focus.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#1F7A53]/20 bg-[#EAF4EE] px-3.5 py-1.5 text-xs font-medium text-[#133123]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <motion.button
                  type="button"
                  onClick={onBookConsultation}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#1F7A53] px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-verda hover:bg-[#175F40] transition-colors"
                >
                  <span>Agendar Consulta com a Dra. Helena</span>
                  <ArrowUpRight className="h-4 w-4 text-[#A7E8C3]" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
