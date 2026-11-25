import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap, useGSAP, SplitText, DrawSVGPlugin } from '../lib/gsapSetup';

const MANIFESTO_PILLARS = [
  {
    title: 'Contra a cultura da restrição extrema',
    body: 'Planos punitivos geram culpa e abandono em poucas semanas. Acredito em constância gentil e prazer à mesa.',
  },
  {
    title: 'Bioquímica individual acima de modismos',
    body: 'Cada metabolismo responde a ritmos próprios de sono, estresse e digestão. Leio seus exames antes de sugerir qualquer mudança.',
  },
  {
    title: 'Comida de verdade que cabe na sua rotina',
    body: 'Receitas descomplicadas, orientação de mercado e autonomia para escolher bem em qualquer restaurante ou viagem.',
  },
];

export function ManifestoSection() {
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
        gsap.set('.arch-draw', { drawSVG: '0%' });

        gsap.to('.arch-draw', {
          drawSVG: '0% 100%',
          stagger: 0.08,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: '.manifesto-svg-card',
            start: 'top 82%',
            end: 'bottom 45%',
            scrub: 0.2,
          },
        });

        gsap.from('.manifesto-pillar-item', {
          y: 24,
          opacity: 0,
          stagger: 0.14,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.manifesto-pillars-list',
            start: 'top 82%',
            once: true,
          },
        });

        gsap.from('.manifesto-visual-card', {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.manifesto-visual-strip',
            start: 'top 86%',
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  void DrawSVGPlugin;

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-[#F6FAF7] text-[#133123] bg-blueprint-grid"
    >
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-24 sm:px-10 sm:pt-32 sm:pb-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          {/* Coluna Editorial Esquerda */}
          <div className="lg:col-span-7">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#1F7A53]">
              Filosofia Nutricional
            </p>
            <h2
              ref={headingRef}
              className="mt-4 font-display text-[clamp(2.3rem,5vw,4.3rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#133123]"
            >
              A melhor nutrição é aquela que se integra em silêncio ao ritmo da sua vida.
            </h2>

            {/* Três afirmações com títulos em verde sálvia vibrante e subtextos uniformes */}
            <div className="manifesto-pillars-list mt-10 space-y-7 border-l-2 border-[#1F7A53]/35 pl-6">
              {MANIFESTO_PILLARS.map((pillar) => (
                <div key={pillar.title} className="manifesto-pillar-item">
                  <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold leading-snug text-[#1F7A53]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm sm:text-base text-[#466959] leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Direita: Diagrama Botânico & Metabólico Desenhado no Scroll */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="manifesto-svg-card card-leaf relative w-full max-w-[420px] border border-[#1F7A53]/20 bg-[#1A3F2E] p-8 sm:p-10 text-[#F6FAF7] shadow-verda">
              <div className="flex items-center justify-between border-b border-[#A7E8C3]/20 pb-4">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#A7E8C3]">
                  Tríade Vital
                </span>
                <span className="font-mono-tech text-[10px] text-[#C2E2CF]">360°</span>
              </div>

              <svg
                viewBox="0 0 320 260"
                className="my-6 w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Diagrama geométrico de equilíbrio metabólico, intestinal e comportamental"
              >
                <path
                  className="arch-draw"
                  d="M160 22 L160 238"
                  stroke="#A7E8C3"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.55"
                />
                <path
                  className="arch-draw"
                  d="M36 130 L284 130"
                  stroke="#A7E8C3"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <path
                  className="arch-draw"
                  d="M160 44 A86 86 0 1 1 159.9 44 Z"
                  stroke="#F6FAF7"
                  strokeWidth="1.6"
                />
                <path
                  className="arch-draw"
                  d="M160 72 A58 58 0 1 1 159.9 72 Z"
                  stroke="#8FE3B4"
                  strokeWidth="1.5"
                />
                <path
                  className="arch-draw"
                  d="M160 56 C198 84, 210 138, 160 202 C110 138, 122 84, 160 56 Z"
                  stroke="#A7E8C3"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className="arch-draw"
                  d="M160 92 L190 116 M160 124 L196 150 M160 92 L130 116 M160 124 L124 150"
                  stroke="#8FE3B4"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  className="arch-draw"
                  d="M112 222 L208 222 M112 214 L112 230 M208 214 L208 230"
                  stroke="#A7E8C3"
                  strokeWidth="1.5"
                />
              </svg>

              <div className="flex items-center justify-between text-xs text-[#C2E2CF]">
                <span>Metabolismo · Microbiota · Rotina</span>
                <span className="font-mono-tech text-[#A7E8C3]">EQUILÍBRIO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Faixa Visual Inferior: Cards Fotográficos em Formatos Distintos */}
        <div className="manifesto-visual-strip mt-16 grid grid-cols-1 gap-8 md:grid-cols-12 items-stretch">
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="manifesto-visual-card card-chamfer md:col-span-7 group relative overflow-hidden border border-[#1F7A53]/20 bg-[#1A3F2E] text-[#F6FAF7] shadow-verda"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
              <div className="sm:col-span-6 overflow-hidden aspect-[4/3] sm:aspect-auto">
                <img
                  src="/images/craft-nutrition.jpg"
                  alt="Ingredientes frescos verdes e culinária nutritiva cotidiana"
                  width={800}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="sm:col-span-6 flex flex-col justify-between p-7 sm:p-8">
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#A7E8C3]">
                    Gastronomia Funcional · Dia a Dia
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-medium leading-tight">
                    Nutrientes vivos com sabor real no prato
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#C2E2CF]">
                    Combino fibras, fitoquímicos e proteínas acessíveis para criar refeições que
                    saciam, nutrem e respeitam seu paladar.
                  </p>
                </div>
                <span className="mt-6 font-mono-tech text-[11px] text-[#A7E8C3]">
                  Receitas Práticas de 15 min
                </span>
              </div>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="manifesto-visual-card card-leaf md:col-span-5 group relative overflow-hidden border border-[#1F7A53]/20 bg-[#D5ECDD] text-[#133123] shadow-verda"
          >
            <div className="relative h-full min-h-[270px] flex flex-col justify-between p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#1F7A53]">
                    Espaço Acolhedor
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold leading-tight">
                    Meu consultório em verde sálvia
                  </h3>
                </div>
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-t-full rounded-b-xl border border-[#1F7A53]/25">
                  <img
                    src="/images/hero-studio.jpg"
                    alt="Consultório luminoso em verde claro da Dra. Helena Prado"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#385748]">
                Luz natural, chá de ervas frescas e consultas individuais de 60 minutos para
                ouvir sua história com atenção plena.
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-[#133123]/12 pt-4 text-xs font-semibold text-[#1F7A53]">
                <span>Jardins · São Paulo</span>
                <span className="font-mono-tech text-[10px]">ACOLHIMENTO REAL</span>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
