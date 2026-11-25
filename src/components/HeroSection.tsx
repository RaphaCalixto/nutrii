import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Activity, ArrowUpRight, Layers, Leaf, Sparkles } from 'lucide-react';
import { gsap, useGSAP, SplitText } from '../lib/gsapSetup';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreSpecialties: () => void;
}

const HERO_PILLARS = [
  {
    icon: Activity,
    badge: 'DIAGNÓSTICO METABÓLICO',
    title: 'Exames & Bioimpedância 3D',
    desc: 'Cruzo mais de 35 biomarcadores laboratoriais com a sua composição corporal real.',
  },
  {
    icon: Leaf,
    badge: 'CARDÁPIO VIVO E LEVE',
    title: 'Trocas Inteligentes no Dia a Dia',
    desc: 'Planos adaptáveis à sua rotina social, viagens e preferências, sem listas rígidas.',
  },
  {
    icon: Sparkles,
    badge: 'SAÚDE INTESTINAL & ENERGIA',
    title: 'Longevidade com Comida de Verdade',
    desc: 'Modulação gentil da microbiota para reduzir fadiga, estufamento e oscilações de foco.',
  },
];

export function HeroSection({ onOpenBooking, onExploreSpecialties }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const bgPlaneRef = useRef<HTMLDivElement | null>(null);
  const archPlaneRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const beatOneRef = useRef<HTMLDivElement | null>(null);
  const beatTwoRef = useRef<HTMLDivElement | null>(null);
  const archBadgeRef = useRef<HTMLDivElement | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 130, damping: 24, mass: 0.65 });
  const smoothY = useSpring(pointerY, { stiffness: 130, damping: 24, mass: 0.65 });

  const bgMoveX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const bgMoveY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const archMoveX = useTransform(smoothX, [-1, 1], [14, -14]);
  const archMoveY = useTransform(smoothY, [-1, 1], [10, -10]);
  const glassMoveX = useTransform(smoothX, [-1, 1], [-28, 28]);
  const glassMoveY = useTransform(smoothY, [-1, 1], [-20, 20]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(nx);
    pointerY.set(ny);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      if (headlineRef.current) {
        SplitText.create(headlineRef.current, {
          type: 'lines, words',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 105,
              opacity: 0,
              duration: 0.95,
              stagger: 0.04,
              ease: 'power4.out',
              delay: 0.08,
            });
          },
        });
      }

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(beatTwoRef.current, { opacity: 0, y: 32, pointerEvents: 'none' });
        gsap.set(archBadgeRef.current, { opacity: 0, y: 18 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=85%',
            scrub: 0.2,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(
          bgPlaneRef.current,
          {
            scale: 1.09,
            yPercent: -4,
            ease: 'none',
          },
          0
        )
          .to(
            archPlaneRef.current,
            {
              y: -18,
              scale: 1.03,
              ease: 'none',
            },
            0
          )
          .to(
            beatOneRef.current,
            {
              y: -38,
              opacity: 0,
              pointerEvents: 'none',
              duration: 0.35,
              ease: 'power2.inOut',
            },
            0.08
          )
          .to(
            beatTwoRef.current,
            {
              y: 0,
              opacity: 1,
              pointerEvents: 'auto',
              duration: 0.42,
              ease: 'power2.out',
            },
            0.38
          )
          .fromTo(
            '.hero-pillar-card',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.3, ease: 'power2.out' },
            0.42
          )
          .to(
            archBadgeRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
              ease: 'power2.out',
            },
            0.45
          );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#E5F2EA] text-[#133123]"
    >
      {/* PLANO 0: Arquitetura do Consultório em Verde Sálvia Claro */}
      <motion.div
        ref={bgPlaneRef}
        style={{ x: bgMoveX, y: bgMoveY }}
        className="pointer-events-none absolute -inset-6 will-change-transform"
      >
        <img
          src="/images/hero-studio.jpg"
          alt="Consultório da Dra. Helena Prado em verde sálvia claro e madeira natural"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAF4EE]/85 via-[#EAF4EE]/60 to-[#DFF0E5]" />
        <div className="scrim-lead-corner absolute inset-0" />
      </motion.div>

      {/* Atmosfera Radial Verde Menta Suave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-85"
        style={{
          background:
            'radial-gradient(circle at 72% 28%, rgba(143, 227, 178, 0.32) 0%, rgba(229, 242, 234, 0) 56%)',
        }}
      />

      {/* PLANO 3: Prismas translúcidos em verde claro */}
      <motion.div
        aria-hidden="true"
        style={{ x: glassMoveX, y: glassMoveY }}
        className="pointer-events-none hidden lg:block absolute top-[14%] right-[4%] z-10 h-40 w-40 rounded-[36px] border border-[#1F7A53]/20 bg-[#A7E8C3]/25 backdrop-blur-[4px] rotate-12 will-change-transform"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: glassMoveX, y: glassMoveY }}
        className="pointer-events-none hidden lg:block absolute bottom-[12%] right-[36%] z-10 h-20 w-20 rounded-full border border-[#1F7A53]/20 bg-[#CFEAD9]/45 backdrop-blur-[6px] will-change-transform"
      />

      {/* Composição Principal */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-5 pt-28 pb-10 sm:px-10 md:pt-32 md:pb-12">
        {/* Linha Editorial Superior */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1F7A53]/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#1F7A53]" />
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#466959]">
              Jardins · São Paulo · Dra. Helena Prado · CRN-3 52.940
            </span>
          </div>
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#1F7A53]">
            Atendimento Individual &amp; Personalizado
          </span>
        </div>

        {/* Grid Assimétrico Multi-Plano */}
        <div className="my-auto grid grid-cols-1 items-center gap-10 py-6 lg:grid-cols-12 lg:gap-10">
          {/* COLUNA ESQUERDA: Palco com Beat 1 e Beat 2 */}
          <div className="lg:col-span-7 relative z-20 lg:min-h-[520px] lg:flex lg:items-center">
            {/* BEAT 1 */}
            <div ref={beatOneRef} className="w-full">
              <h1
                ref={headlineRef}
                className="font-display text-[clamp(2.7rem,6.6vw,5.8rem)] font-medium leading-[0.95] tracking-[-0.02em] text-[#133123]"
              >
                Nutrição pensada para uma{' '}
                <em className="italic font-normal text-[#1F7A53]">
                  vida leve e vital
                </em>
                .
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#385748]">
                Acompanho você com leitura aprofundada de exames, comportamento alimentar gentil e
                gastronomia prática para transformar sua energia sem dietas restritivas.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.button
                  type="button"
                  onClick={onOpenBooking}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  className="inline-flex items-center gap-3 rounded-full bg-[#1F7A53] px-7 py-4 text-sm font-semibold text-white shadow-verda hover:bg-[#175F40] transition-colors"
                >
                  <span>Agendar Consulta</span>
                  <ArrowUpRight className="h-4 w-4 text-[#A7E8C3]" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={onExploreSpecialties}
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1F7A53]/30 bg-[#F6FAF7]/80 px-6 py-4 text-sm font-medium text-[#133123] backdrop-blur-md hover:border-[#1F7A53] transition-colors"
                >
                  <span>Explorar Áreas</span>
                </motion.button>
              </div>
            </div>

            {/* BEAT 2: Revelado suavemente ao rolar */}
            <div
              ref={beatTwoRef}
              className="mt-10 lg:mt-0 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="h-4 w-4 text-[#1F7A53]" />
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#1F7A53]">
                  Meu Método em Cada Consulta
                </span>
              </div>

              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-medium leading-[1.06] text-[#133123]">
                Plano alimentar moldado à sua biologia e à sua mesa.
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-3.5">
                {HERO_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="hero-pillar-card card-leaf flex items-start gap-4 border border-[#1F7A53]/20 bg-[#F6FAF7]/90 px-5 py-4 backdrop-blur-xl shadow-verda"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D5ECDD] text-[#1F7A53]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#1F7A53]">
                          {pillar.badge}
                        </p>
                        <h3 className="mt-0.5 font-display text-xl font-semibold text-[#133123]">
                          {pillar.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#466959]">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#1F7A53] px-6 py-3.5 text-xs font-semibold text-white hover:bg-[#175F40] transition-colors"
                >
                  <span>Agendar Consulta</span>
                  <ArrowUpRight className="h-4 w-4 text-[#A7E8C3]" />
                </button>
                <button
                  type="button"
                  onClick={onExploreSpecialties}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1F7A53] hover:text-[#133123] transition-colors"
                >
                  <span>Ver Especialidades</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* PLANO 2: Sujeito Focal em Portal Arco */}
          <motion.div
            ref={archPlaneRef}
            style={{ x: archMoveX, y: archMoveY }}
            className="lg:col-span-5 relative z-20 flex flex-col items-center lg:items-end will-change-transform"
          >
            <div className="relative w-full max-w-[350px] sm:max-w-[390px]">
              {/* Moldura Arquitetônica Arco */}
              <div className="card-arch relative overflow-hidden border border-[#1F7A53]/25 bg-[#F6FAF7] p-2.5 shadow-verda">
                <div className="card-arch relative overflow-hidden aspect-[3/4]">
                  <img
                    src="/images/hero-portrait.jpg"
                    alt="Retrato editorial de bem-estar e vitalidade em luz natural"
                    width={900}
                    height={1200}
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="scrim-bottom-band absolute inset-x-0 bottom-0 h-28" />
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-[#F6FAF7]">
                    <div>
                      <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#A7E8C3]">
                        Nutrição Integrativa
                      </p>
                      <p className="font-display text-xl font-medium">
                        Energia &amp; Equilíbrio
                      </p>
                    </div>
                    <Leaf className="h-4 w-4 text-[#A7E8C3]" />
                  </div>
                </div>
              </div>

              {/* Cartão Chanfrado ancorado abaixo do arco */}
              <div
                ref={archBadgeRef}
                className="mt-4 card-chamfer border border-[#1F7A53]/20 bg-[#F6FAF7]/95 px-6 py-4 backdrop-blur-xl shadow-verda"
              >
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#1F7A53]">
                  Cardápio Vivo Personalizado
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-[#133123]">
                  Plano interativo com trocas práticas entregue por mim no dia da consulta.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Rodapé do Hero */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[#1F7A53]/18 pt-4 text-xs text-[#466959]">
          <div className="flex flex-wrap gap-6">
            <span>Dra. Helena Prado · CRN-3 52.940</span>
            <span>Bioimpedância InBody &amp; Exames Integrados</span>
          </div>
          <span className="font-mono-tech text-[11px] text-[#1F7A53]">
            Alameda Campinas · Jardins
          </span>
        </div>
      </div>
    </section>
  );
}
