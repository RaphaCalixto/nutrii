import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Leaf, X } from 'lucide-react';
import {
  SPECIALTIES,
  type SpecialtyCategory,
  type SpecialtyItem,
} from '../data/clinicData';
import { gsap, useGSAP, SplitText, Flip, ScrollTrigger } from '../lib/gsapSetup';

interface SpecialtiesSectionProps {
  onBookSpecialty: (specialtyTitle: string) => void;
}

const FILTERS: { id: SpecialtyCategory; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'comportamental', label: 'Comportamental' },
  { id: 'clinica', label: 'Clínica' },
  { id: 'esportiva', label: 'Esportiva' },
];

function LeafSpecularCard({
  item,
  onSelect,
}: {
  item: SpecialtyItem;
  onSelect: (item: SpecialtyItem) => void;
}) {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(circle 240px at ${x}% ${y}%, rgba(255, 255, 255, 0.55), transparent 75%)`
  );

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <article
      data-flip-id={item.id}
      onPointerMove={handleMove}
      onClick={() => onSelect(item)}
      className="flip-card card-leaf group relative cursor-pointer overflow-hidden border border-[#1F7A53]/25 bg-[#D5ECDD] p-7 sm:p-9 text-[#133123] shadow-verda transition-transform duration-300 hover:-translate-y-1.5"
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <CardBody item={item} tone="light" />
    </article>
  );
}

function CardBody({
  item,
  tone,
}: {
  item: SpecialtyItem;
  tone: 'light' | 'dark' | 'sage';
}) {
  const mutedText =
    tone === 'light'
      ? 'text-[#466959]'
      : tone === 'sage'
      ? 'text-[#EAF4EE]'
      : 'text-[#C2E2CF]';
  const badgeStyle =
    tone === 'light'
      ? 'bg-[#1A3F2E] text-[#F6FAF7]'
      : tone === 'sage'
      ? 'bg-[#133123]/75 text-[#EAF4EE]'
      : 'bg-[#2A9266]/35 text-[#A7E8C3] border border-[#A7E8C3]/30';

  return (
    <div className="relative z-10 flex h-full flex-col justify-between gap-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={`font-mono-tech text-[10px] uppercase tracking-[0.2em] ${
              tone === 'light' ? 'text-[#1F7A53]' : 'text-[#A7E8C3]'
            }`}
          >
            {item.code} · {item.categoryLabel}
          </span>
          <span className={`rounded-full px-3 py-1 font-mono-tech text-[10px] ${badgeStyle}`}>
            {item.precisionMetric}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-12 items-center">
          <div className="sm:col-span-7">
            <h3 className="font-display text-3xl sm:text-[2.1rem] font-semibold leading-[1.06]">
              {item.title}
            </h3>
            <p className={`mt-2 text-xs font-medium uppercase tracking-wider ${mutedText}`}>
              {item.subtitle}
            </p>
            <p className={`mt-4 text-sm leading-relaxed ${mutedText}`}>{item.summary}</p>
          </div>

          <div className="sm:col-span-5">
            <div
              className={`specialty-card-media overflow-hidden ${
                item.shape === 'arch'
                  ? 'rounded-t-full rounded-b-xl aspect-[3/4]'
                  : item.shape === 'chamfer'
                  ? 'card-chamfer aspect-square'
                  : item.shape === 'leaf'
                  ? 'rounded-[6px_40px_6px_40px] aspect-[4/3]'
                  : 'rounded-2xl aspect-[4/3]'
              }`}
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                width={640}
                height={640}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex items-center justify-between border-t pt-4 text-xs font-semibold ${
          tone === 'light'
            ? 'border-[#133123]/12 text-[#133123]'
            : 'border-[#A7E8C3]/20 text-[#EAF4EE]'
        }`}
      >
        <span>{item.duration}</span>
        <span className="inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-300">
          Ver plano nutricional
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

export function SpecialtiesSection({ onBookSpecialty }: SpecialtiesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<SpecialtyCategory>('todas');
  const [selectedItem, setSelectedItem] = useState<SpecialtyItem | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);

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
        gsap.from('.specialties-header-reveal', {
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

        ScrollTrigger.batch('.flip-card', {
          start: 'top 86%',
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 36, opacity: 0, scale: 0.97 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.12,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }
            );
            batch.forEach((card, i) => {
              const media = card.querySelector('.specialty-card-media');
              if (media) {
                gsap.fromTo(
                  media,
                  { clipPath: 'inset(14% 0% 0% 0%)', scale: 1.07 },
                  {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    scale: 1,
                    duration: 0.95,
                    delay: i * 0.12,
                    ease: 'power3.out',
                    clearProps: 'transform,clipPath',
                  }
                );
              }
            });
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const visibleItems =
    activeFilter === 'todas'
      ? SPECIALTIES
      : SPECIALTIES.filter((s) => s.category === activeFilter);

  const handleFilterChange = (category: SpecialtyCategory) => {
    if (category === activeFilter) return;
    if (gridRef.current) {
      flipStateRef.current = Flip.getState(gridRef.current.querySelectorAll('.flip-card'));
    }
    setActiveFilter(category);
  };

  useLayoutEffect(() => {
    if (!flipStateRef.current || !gridRef.current) return;
    const state = flipStateRef.current;
    flipStateRef.current = null;

    Flip.from(state, {
      duration: 0.65,
      ease: 'power3.inOut',
      scale: true,
      absolute: true,
      stagger: 0.05,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
        ),
      onLeave: (elements) =>
        gsap.to(elements, { opacity: 0, scale: 0.92, duration: 0.3 }),
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });
  }, [activeFilter]);

  return (
    <section
      id="especialidades"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-[#F6FAF7] pt-28 pb-24 sm:pt-32 sm:pb-32 px-5 sm:px-10 text-[#133123]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho Assimétrico + Filtros FLIP */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="specialties-header-reveal font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#1F7A53]">
              Áreas de Atendimento
            </p>
            <h2
              ref={headingRef}
              className="mt-3 font-display text-[clamp(2.4rem,5vw,4.3rem)] font-medium leading-[1.02]"
            >
              Cuidado nutricional em formatos sob medida
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filtrar especialidades"
            className="specialties-header-reveal inline-flex flex-wrap sm:flex-nowrap shrink-0 gap-1.5 rounded-3xl sm:rounded-full border border-[#133123]/10 bg-[#EAF4EE] p-1.5"
          >
            {FILTERS.map((filter) => {
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => handleFilterChange(filter.id)}
                  className={`relative whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    active ? 'text-white' : 'text-[#466959] hover:text-[#133123]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="specialty-filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-[#1F7A53] -z-0"
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Assimétrico com 4 Formatos Arquitetônicos Distintos */}
        <div ref={gridRef} className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-12">
          {visibleItems.map((item) => {
            if (item.shape === 'arch') {
              return (
                <article
                  key={item.id}
                  data-flip-id={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="flip-card rounded-t-[84px] sm:rounded-t-[130px] rounded-b-[28px] md:col-span-7 group cursor-pointer border border-[#1F7A53]/15 bg-white px-8 pt-14 pb-9 sm:px-12 sm:pt-16 sm:pb-11 shadow-verda transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <CardBody item={item} tone="light" />
                </article>
              );
            }

            if (item.shape === 'chamfer') {
              return (
                <article
                  key={item.id}
                  data-flip-id={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="flip-card card-chamfer md:col-span-5 group cursor-pointer bg-[#1A3F2E] p-8 sm:p-10 text-[#F6FAF7] shadow-verda-deep transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <CardBody item={item} tone="dark" />
                </article>
              );
            }

            if (item.shape === 'leaf') {
              return (
                <div key={item.id} className="md:col-span-6">
                  <LeafSpecularCard item={item} onSelect={setSelectedItem} />
                </div>
              );
            }

            return (
              <article
                key={item.id}
                data-flip-id={item.id}
                onClick={() => setSelectedItem(item)}
                className="flip-card card-capsule-cut md:col-span-6 group cursor-pointer bg-[#276348] p-8 sm:p-10 text-[#F6FAF7] shadow-verda transition-transform duration-300 hover:-translate-y-1.5"
              >
                <CardBody item={item} tone="sage" />
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal de Detalhes do Protocolo Nutricional */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#133123]/65 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="card-chamfer relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#F6FAF7] p-7 sm:p-10 text-[#133123] shadow-verda-deep"
            >
              <button
                type="button"
                aria-label="Fechar detalhes"
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#133123]/15 bg-white text-[#133123] hover:bg-[#D5ECDD] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#1F7A53]">
                {selectedItem.code} · {selectedItem.categoryLabel}
              </span>
              <h3 className="mt-2 pr-10 font-display text-3xl sm:text-4xl font-semibold leading-tight">
                {selectedItem.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#466959]">
                {selectedItem.summary}
              </p>

              <div className="mt-6 rounded-2xl border border-[#1F7A53]/20 bg-[#EAF4EE] p-5">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#1F7A53]">
                  Indicação Ideal
                </p>
                <p className="mt-1.5 text-sm text-[#133123]">{selectedItem.idealFor}</p>
              </div>

              <div className="mt-6">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#466959]">
                  Como Conduzimos
                </p>
                <ul className="mt-3 space-y-3">
                  {selectedItem.clinicalProtocol.map((step) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-[#133123]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1F7A53]" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#133123]/10 pt-6">
                <div className="flex items-center gap-2 text-xs text-[#466959]">
                  <Leaf className="h-4 w-4 text-[#1F7A53]" />
                  <span>{selectedItem.duration}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedItem.title;
                    setSelectedItem(null);
                    onBookSpecialty(title);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1F7A53] px-6 py-3 text-xs font-semibold text-white hover:bg-[#175F40] transition-colors"
                >
                  <span>Agendar esta especialidade</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
